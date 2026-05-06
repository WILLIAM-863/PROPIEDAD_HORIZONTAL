const express = require("express");
const pool = require("./db");

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

function fmtDate(value) {
  return new Date(value).toLocaleString();
}

function renderPage({ espacios, unidades, residentes, reservas, pqrs, estadosPqrs, error, ok }) {
  const optionsEspacios = espacios
    .map((e) => `<option value="${e.espacio_id}">${e.nombre} (aforo ${e.aforo_maximo})</option>`)
    .join("");

  const optionsUnidades = unidades
    .map((u) => `<option value="${u.unidad_id}">${u.torre}-${u.numero}</option>`)
    .join("");

  const optionsResidentes = residentes
    .map((r) => `<option value="${r.residente_id}">${r.nombre_completo}</option>`)
    .join("");

  const optionsEstadosPqrs = estadosPqrs
    .map((e) => `<option value="${e.estado_pqrs_id}">${e.nombre}</option>`)
    .join("");

  const rowsReservas = reservas
    .map(
      (r) => `
      <tr>
        <td>${r.reserva_id}</td>
        <td>${r.espacio}</td>
        <td>${r.unidad}</td>
        <td>${r.residente}</td>
        <td>${fmtDate(r.fecha_inicio)}</td>
        <td>${fmtDate(r.fecha_fin)}</td>
        <td>${r.estado}</td>
        <td>${r.estado === "ACTIVA" ? `<form method="post" action="/reservas/${r.reserva_id}/cancelar"><button type="submit">Cancelar</button></form>` : "-"}</td>
      </tr>`
    )
    .join("");

  const rowsPqrs = pqrs
    .map(
      (p) => `
      <tr>
        <td>${p.pqrs_id}</td>
        <td>${p.unidad}</td>
        <td>${p.residente}</td>
        <td>${p.estado}</td>
        <td>${p.asunto}</td>
        <td>${fmtDate(p.fecha_registro)}</td>
      </tr>`
    )
    .join("");

  return `<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1"/>
  <title>PH Operativa</title>
  <style>
    :root { --bg:#f5f0e8; --card:#fffdf8; --ink:#1f1f1f; --acc:#0e7c86; --accent2:#d06f2e; --muted:#6b6b6b; }
    * { box-sizing: border-box; }
    body { margin:0; font-family: "Trebuchet MS", "Segoe UI", sans-serif; background: radial-gradient(circle at 20% 20%, #fbf2de, #e7f3f5); color: var(--ink); }
    .wrap { max-width: 1100px; margin: 24px auto; padding: 16px; }
    .card { background: var(--card); border-radius: 14px; padding: 20px; box-shadow: 0 8px 25px rgba(0,0,0,.08); margin-bottom: 18px; }
    h1,h2 { margin:0 0 14px; }
    p { color: var(--muted); }
    .grid { display:grid; grid-template-columns: repeat(auto-fit,minmax(190px,1fr)); gap: 10px; }
    label { font-size: .9rem; display:block; margin-bottom: 6px; }
    input, select, textarea, button { width:100%; padding: 10px; border-radius: 8px; border:1px solid #d3d3d3; }
    button { background: var(--acc); color:#fff; border:none; cursor:pointer; font-weight:700; }
    .alt-btn { background: var(--accent2); }
    table { width:100%; border-collapse: collapse; font-size: .92rem; }
    th,td { border-bottom:1px solid #e9e9e9; padding:8px; text-align:left; vertical-align: top; }
    .error { background:#ffe8e8; color:#8f1a1a; padding:10px; border-radius:8px; margin-bottom:10px; }
    .ok { background:#e7f9ed; color:#176439; padding:10px; border-radius:8px; margin-bottom:10px; }
    .two { display:grid; grid-template-columns: 1fr 1fr; gap:18px; }
    @media (max-width: 920px) { .two { grid-template-columns: 1fr; } }
  </style>
</head>
<body>
  <div class="wrap">
    <div class="card">
      <h1>Panel Operativo de Propiedad Horizontal</h1>
      <p>MVP ampliado: reservas + PQRS con persistencia y reglas de negocio.</p>
      ${error ? `<div class="error">${error}</div>` : ""}
      ${ok ? `<div class="ok">${ok}</div>` : ""}
    </div>

    <div class="two">
      <div class="card">
        <h2>Nueva Reserva</h2>
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
        <h2>Nueva PQRS</h2>
        <form method="post" action="/pqrs">
          <div class="grid">
            <div><label>Unidad</label><select name="unidad_id" required>${optionsUnidades}</select></div>
            <div><label>Residente</label><select name="residente_id" required>${optionsResidentes}</select></div>
            <div><label>Estado inicial</label><select name="estado_pqrs_id" required>${optionsEstadosPqrs}</select></div>
            <div style="grid-column: 1 / -1"><label>Asunto</label><input type="text" name="asunto" maxlength="120" required/></div>
            <div style="grid-column: 1 / -1"><label>Descripcion</label><textarea name="descripcion" rows="4" required></textarea></div>
            <div><button class="alt-btn" type="submit">Registrar PQRS</button></div>
          </div>
        </form>
      </div>
    </div>

    <div class="card">
      <h2>Reservas recientes</h2>
      <table>
        <thead><tr><th>ID</th><th>Espacio</th><th>Unidad</th><th>Residente</th><th>Inicio</th><th>Fin</th><th>Estado</th><th>Accion</th></tr></thead>
        <tbody>${rowsReservas}</tbody>
      </table>
    </div>

    <div class="card">
      <h2>PQRS recientes</h2>
      <table>
        <thead><tr><th>ID</th><th>Unidad</th><th>Residente</th><th>Estado</th><th>Asunto</th><th>Fecha</th></tr></thead>
        <tbody>${rowsPqrs}</tbody>
      </table>
    </div>
  </div>
</body>
</html>`;
}

async function loadDashboardData() {
  const [espacios, unidades, residentes, reservas, pqrs, estadosPqrs] = await Promise.all([
    pool.query("SELECT espacio_id, nombre, aforo_maximo FROM espacio_comun WHERE activo = true ORDER BY nombre"),
    pool.query("SELECT unidad_id, torre, numero FROM unidad ORDER BY torre, numero"),
    pool.query("SELECT residente_id, nombre_completo FROM residente WHERE activo = true ORDER BY nombre_completo"),
    pool.query(`SELECT r.reserva_id, e.nombre AS espacio, u.torre || '-' || u.numero AS unidad,
      rs.nombre_completo AS residente, r.fecha_inicio, r.fecha_fin, r.estado
      FROM reserva_espacio r
      JOIN espacio_comun e ON e.espacio_id = r.espacio_id
      JOIN unidad u ON u.unidad_id = r.unidad_id
      JOIN residente rs ON rs.residente_id = r.residente_id
      ORDER BY r.reserva_id DESC LIMIT 20`),
    pool.query(`SELECT p.pqrs_id, u.torre || '-' || u.numero AS unidad,
      r.nombre_completo AS residente, ep.nombre AS estado, p.asunto, p.fecha_registro
      FROM pqrs p
      JOIN unidad u ON u.unidad_id = p.unidad_id
      JOIN residente r ON r.residente_id = p.residente_id
      JOIN estado_pqrs ep ON ep.estado_pqrs_id = p.estado_pqrs_id
      ORDER BY p.pqrs_id DESC LIMIT 20`),
    pool.query("SELECT estado_pqrs_id, nombre FROM estado_pqrs ORDER BY estado_pqrs_id")
  ]);

  return {
    espacios: espacios.rows,
    unidades: unidades.rows,
    residentes: residentes.rows,
    reservas: reservas.rows,
    pqrs: pqrs.rows,
    estadosPqrs: estadosPqrs.rows
  };
}

app.get("/health", (_, res) => res.json({ ok: true }));

app.get("/", async (req, res) => {
  try {
    const data = await loadDashboardData();
    res.send(renderPage({ ...data, error: "", ok: req.query.ok || "" }));
  } catch (err) {
    res.status(500).send(`Error de carga de dashboard: ${err.message}`);
  }
});

app.post("/reservas", async (req, res) => {
  try {
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

    res.redirect("/?ok=Reserva creada correctamente");
  } catch (err) {
    res.status(500).send(`Error al crear reserva: ${err.message}`);
  }
});

app.post("/reservas/:id/cancelar", async (req, res) => {
  try {
    await pool.query(
      `UPDATE reserva_espacio SET estado='CANCELADA'
       WHERE reserva_id = $1 AND estado IN ('ACTIVA','APROBADA')`,
      [req.params.id]
    );
    res.redirect("/?ok=Reserva cancelada");
  } catch (err) {
    res.status(500).send(`Error al cancelar reserva: ${err.message}`);
  }
});

app.post("/pqrs", async (req, res) => {
  try {
    const { unidad_id, residente_id, estado_pqrs_id, asunto, descripcion } = req.body;

    if (!unidad_id || !residente_id || !estado_pqrs_id || !asunto || !descripcion) {
      return res.status(400).send("Datos incompletos para PQRS");
    }

    await pool.query(
      `INSERT INTO pqrs (unidad_id, residente_id, estado_pqrs_id, asunto, descripcion)
       VALUES ($1, $2, $3, $4, $5)`,
      [unidad_id, residente_id, estado_pqrs_id, asunto.trim(), descripcion.trim()]
    );

    res.redirect("/?ok=PQRS registrada correctamente");
  } catch (err) {
    res.status(500).send(`Error al registrar PQRS: ${err.message}`);
  }
});

const port = Number(process.env.PORT || 3000);
app.listen(port, () => {
  console.log(`Miniapp ejecutandose en puerto ${port}`);
});
