# 06 Reglas de Negocio Verificables

## Reglas de ocupacion y vinculacion
1. Una unidad debe existir antes de asociar residentes.
2. Un residente activo puede estar vinculado a una o varias unidades segun rol de tenencia.

## Reglas de reservas
3. Toda reserva debe asociarse a un espacio comun, una unidad y un residente validos.
4. `fecha_fin` debe ser mayor que `fecha_inicio`.
5. No puede existir traslape horario entre reservas en estado ACTIVA/APROBADA para el mismo espacio.
6. Solo espacios activos pueden reservarse.
7. Solo residentes activos pueden crear reservas.

## Reglas de integridad y seguridad
8. El documento de residente debe ser unico.
9. La combinacion torre-numero de unidad debe ser unica.
10. El rol `rol_consulta_ph` solo debe tener permisos de lectura.
11. El rol `rol_admin_ph` puede operar CRUD sobre tablas del esquema publico.

## Reglas de trazabilidad
12. Toda reserva registra `creado_en` automaticamente.
13. La vista `vw_reservas_detalle` debe reflejar uniones consistentes entre reserva, espacio, unidad y residente.

## Evidencia tecnica implementada
- Reglas 3,4,5: `app/src/server.js` y `db/01_schema.sql`.
- Reglas 8,9: restricciones `UNIQUE` en `db/01_schema.sql`.
- Reglas 10,11: `db/03_views_roles.sql`.
- Reglas 12,13: `db/01_schema.sql` y `db/03_views_roles.sql`.
