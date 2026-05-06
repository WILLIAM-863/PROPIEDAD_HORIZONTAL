# 04 Matriz de Requerimientos

## Requerimientos funcionales (RF)
- RF-01: Registrar torres, unidades y su estado de ocupacion.
- RF-02: Registrar residentes y vincularlos con unidades.
- RF-03: Registrar espacios comunes con tipo y aforo maximo.
- RF-04: Crear reservas de espacios comunes por rango horario.
- RF-05: Evitar traslapes de reservas activas/aprobadas en el mismo espacio.
- RF-06: Consultar historial de reservas por unidad y por espacio.
- RF-07: Visualizar reservas recientes para control operativo.

## Requerimientos no funcionales (RNF)
- RNF-01: Despliegue dockerizado para ejecucion local en diferentes maquinas.
- RNF-02: Uso exclusivo de SQL crudo para consultas y operaciones CRUD.
- RNF-03: Base de datos PostgreSQL con scripts de creacion, poblacion, vistas y roles.
- RNF-04: Interfaz web simple, legible y responsive en escritorio/movil.
- RNF-05: Tiempo de respuesta aceptable para consultas de reservas (<2 segundos en entorno local).

## Trazabilidad requerimiento -> evidencia
- RF-04, RF-05 -> `app/src/server.js` (ruta `POST /reservas`).
- RF-06, RF-07 -> `app/src/server.js` (consulta principal `GET /`).
- RNF-03 -> `db/01_schema.sql`, `db/02_seed.sql`, `db/03_views_roles.sql`.
- RNF-01 -> `docker-compose.yml`, `app/Dockerfile`.
