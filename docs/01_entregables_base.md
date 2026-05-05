# Entregables Base (alineados al PDF)

## 1) Contexto y delimitacion
Copropiedad objetivo: conjunto residencial de 2 torres y 120 unidades.
Dentro del alcance: residentes, unidades, reservas de espacios, control de pagos y novedades.
Fuera de alcance MVP: asambleas complejas, CCTV avanzado, integracion bancaria.

## 2) Pregunta guia del equipo
Como diseñar un modelo de datos robusto para soportar la operacion administrativa y de convivencia de una propiedad horizontal con trazabilidad y consistencia, demostrando su viabilidad con una miniaplicacion de reservas?

## 3) Mapa de actores
- Administrador
- Residente
- Propietario
- Vigilante
- Personal de mantenimiento
- Proveedor

## 4) Matriz minima de requerimientos
- RF-01 Registrar unidades y residentes.
- RF-02 Crear y consultar reservas de espacios.
- RF-03 Impedir traslape de reservas del mismo espacio.
- RF-04 Consultar historial de reservas por unidad.
- RNF-01 Dockerizado para despliegue local en dos maquinas.
- RNF-02 Persistencia relacional con PostgreSQL y SQL crudo.
- RNF-03 Interfaz web usable en desktop y movil.

## 5) Reglas de negocio iniciales
1. Una reserva debe tener fecha_fin mayor que fecha_inicio.
2. Un espacio no puede tener dos reservas activas/aprobadas en horarios traslapados.
3. Solo residentes activos pueden reservar.
4. Toda reserva debe estar asociada a una unidad valida.

## 6) Diccionario conceptual resumido
- unidad(unidad_id PK, torre, numero, area_m2, estado_ocupacion)
- residente(residente_id PK, nombre_completo, documento, telefono, email, activo)
- espacio_comun(espacio_id PK, nombre, tipo, aforo_maximo, activo)
- reserva_espacio(reserva_id PK, espacio_id FK, unidad_id FK, residente_id FK, fecha_inicio, fecha_fin, estado, creado_en)

## 7) Script SQL exigido
Ver `db/01_schema.sql`, `db/02_seed.sql`, `db/03_views_roles.sql`.

## 8) Descripcion tecnica de miniaplicacion
Flujo: seleccionar espacio, unidad y residente; definir rango horario; validar traslape; persistir reserva y listar reservas recientes.

## 9) Evidencia de funcionamiento
- Endpoint de salud: `/health`
- Interfaz principal: `/`
- Insercion en tabla `reserva_espacio` al enviar formulario.

## 10) Justificacion de decisiones
- Stack minimalista para cumplir tiempo y requerimientos.
- SQL crudo para control explicito de reglas y consultas.
- Docker para portabilidad y trabajo colaborativo.
