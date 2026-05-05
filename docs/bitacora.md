# Bitacora de iteraciones

## 2026-05-04
- Se creo base dockerizada con PostgreSQL + Node.
- Se implemento miniapp de reservas con validacion de traslape.
- Se generaron scripts SQL (schema, seed, vistas, roles).
- Se crearon entregables base y plan acelerado.
- Riesgo: falta expandir MER a >30 entidades para nota maxima.
- Siguiente accion: modelar modulo financiero + seguridad para ampliar MER.

## 2026-05-05
- Se configuro git con credenciales del equipo.
- Se enlazo remote y se publico rama `master` en GitHub.
- Se intento instalacion automatica de Docker Desktop via winget.
- La instalacion se bloqueo por elevacion administrativa (UAC), se documento procedimiento manual.
- Siguiente accion: instalar Docker como admin y validar `docker compose up --build`.
