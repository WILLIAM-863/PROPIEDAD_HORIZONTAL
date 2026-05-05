const express = require("express");
const pool = require("./db");

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

function renderPage({ espacios, unidades, residentes, reservas, error }) {
  const optionsEspacios = espacios
    .map((e) => `<option value="${e.espacio_id}">${e.nombre} (aforo ${e.aforo_maximo})</option>`)
    .join("");

  const optionsUnidades = unidades
    .map((u) => `<option value="${u.unidad_id}">${u.torre}-${u.numero}</option>`)
    .join("");

  const optionsResidentes = residentes
    .map((r) => `<option value="${r.residente_id}">${r.nombre_completo}</option>`)
    .join("");

  const rows = reservas
    .map(
      (r) => `
      <tr>
        <td>${r.reserva_id}</td>
        <td>${r.espacio}</td>
        <td>${r.unidad}</td>
        <td>${r.residente}</td>
        <td>${new Date(r.fecha_inicio).toLocaleString()}</td>
        <td>${new Date(r.fecha_fin).toLocaleString()}</td>
        <td>${r.estado}</td>
      </tr>`
    )
    .join("");

  return `<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1"/>
  <title>Reservas PH</title>
  <style>
    :root { --bg:#f4efe6; --card:#fffdf8; --ink:#1f1f1f; --acc:#0e7c86; --muted:#6b6b6b; }
    * { box-sizing: border-box; }
    body { margin:0; font-family: "Trebuchet MS", "Segoe UI", sans-serif; background: linear-gradient(130deg, #f4efe6, #e6f3f4); color: var(--ink); }
    .wrap { max-width: 980px; margin: 28px auto; padding: 16px; }
    .card { background: var(--card); border-radius: 14px; padding: 20px; box-shadow: 0 8px 25px rgba(0,0,0,.08); margin-bottom: 18px; }
    h1,h2 { margin:0 0 14px; }
    p { color: var(--muted); }
    .grid { display:grid; grid-template-columns: repeat(auto-fit,minmax(190px,1fr)); gap: 10px; }
    label { font-size: .9rem; display:block; margin-bottom: 6px; }
    input, select, button { width:100%; padding: 10px; border-radius: 8px; border:1px solid #d3d3d3; }
    button { background: var(--acc); color:#fff; border:none; cursor:pointer; font-weight:700; }
    table { width:100%; border-collapse: collapse; font-size: .92rem; }
    th,td { border-bottom:1px solid #e9e9e9; padding:8px; text-align:left; }
    .error { background:#ffe8e8; color:#8f1a1a; padding:10px; border-radius:8px; margin-bottom:10px; }
  </style>
</head>
<body>
  <div class="wrap">
    <div class="card">
      <h1>Miniapp de Reserva de Espacios</h1>
      <p>Proceso implementado con SQL crudo y validacion de traslape de horarios.</p>
      ${error ? `<div class="error">${error}</div>` : ""}
      <form method="post" action="/reservas">
        <div class="grid">
          <div><label>Espacio</label><select name="espacio_id" required>${optionsEspacios}</select></div>
          <div><label>Unidad</label><select name="unidad_id" required>${optionsUnidades}</select></div>
          <div><label>Residente</label><select name="residente_id" required>${optionsResidentes}</select></div>
          <div><label>Inicio</label><input type="datetime-local" name="fecha_inicio" required/></div>
          <div><label>Fin</label><input type="datetime-local" name="fecha_fin" required/></div>
          <div><label>&nbsp;</label><button type="submit">Crear Reserva</button></div>
        </div>
      </form>
    </div>

    <div class="card">
      <h2>Reservas recientes</h2>
      <table>
        <thead><tr><th>ID</th><th>Espacio</th><th>Unidad</th><th>Residente</th><th>Inicio</th><th>Fin</th><th>Estado</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
  </div>
</body>
</html>`;
}

app.get("/health", (_, res) => res.json({ ok: true }));

app.get("/", async (_, res) => {
  const [espacios, unidades, residentes, reservas] = await Promise.all([
    pool.query("SELECT espacio_id, nombre, aforo_maximo FROM espacio_comun WHERE activo = true ORDER BY nombre"),
    pool.query("SELECT unidad_id, torre, numero FROM unidad ORDER BY torre, numero"),
    pool.query("SELECT residente_id, nombre_completo FROM residente WHERE activo = true ORDER BY nombre_completo"),
    pool.query(`SELECT r.reserva_id, e.nombre AS espacio, u.torre || '-' || u.numero AS unidad,
      rs.nombre_completo AS residente, r.fecha_inicio, r.fecha_fin, r.estado
      FROM reserva_espacio r
      JOIN espacio_comun e ON e.espacio_id = r.espacio_id
      JOIN unidad u ON u.unidad_id = r.unidad_id
      JOIN residente rs ON rs.residente_id = r.residente_id
      ORDER BY r.reserva_id DESC LIMIT 20`)
  ]);

  res.send(renderPage({
    espacios: espacios.rows,
    unidades: unidades.rows,
    residentes: residentes.rows,
    reservas: reservas.rows,
    error: ""
  }));
});

app.post("/reservas", async (req, res) => {
  const { espacio_id, unidad_id, residente_id, fecha_inicio, fecha_fin } = req.body;

  if (!espacio_id || !unidad_id || !residente_id || !fecha_inicio || !fecha_fin) {
    return res.status(400).send("Datos incompletos");
  }

  if (new Date(fecha_fin) <= new Date(fecha_inicio)) {
    return res.status(400).send("La fecha fin debe ser mayor que fecha inicio");
  }

  const overlap = await pool.query(
    `SELECT 1 FROM reserva_espacio
     WHERE espacio_id = $1
       AND estado IN ('ACTIVA','APROBADA')
       AND tsrange(fecha_inicio, fecha_fin, '[)') && tsrange($2::timestamp, $3::timestamp, '[)')
     LIMIT 1`,
    [espacio_id, fecha_inicio, fecha_fin]
  );

  if (overlap.rowCount > 0) {
    return res.status(409).send("Horario no disponible para ese espacio");
  }

  await pool.query(
    `INSERT INTO reserva_espacio (espacio_id, unidad_id, residente_id, fecha_inicio, fecha_fin, estado)
     VALUES ($1, $2, $3, $4, $5, 'ACTIVA')`,
    [espacio_id, unidad_id, residente_id, fecha_inicio, fecha_fin]
  );

  res.redirect("/");
});

const port = Number(process.env.PORT || 3000);
app.listen(port, () => {
  console.log(`Miniapp ejecutandose en puerto ${port}`);
});
