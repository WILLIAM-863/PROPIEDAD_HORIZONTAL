# 13 Diccionario Tecnico por Atributo (version entrega)

## 1. torre
- torre_id: SERIAL, PK, NOT NULL, identificador interno.
- nombre: VARCHAR(20), UNIQUE, NOT NULL, nombre de la torre.

## 2. piso
- piso_id: SERIAL, PK, NOT NULL.
- torre_id: INT, FK->torre.torre_id, NOT NULL.
- numero: INT, NOT NULL, CHECK(numero>0).

## 3. tipo_unidad
- tipo_unidad_id: SERIAL, PK, NOT NULL.
- nombre: VARCHAR(30), UNIQUE, NOT NULL.

## 4. estado_ocupacion
- estado_ocupacion_id: SERIAL, PK, NOT NULL.
- nombre: VARCHAR(30), UNIQUE, NOT NULL.

## 5. unidad
- unidad_id: SERIAL, PK, NOT NULL.
- piso_id: INT, FK->piso.piso_id, NOT NULL.
- tipo_unidad_id: INT, FK->tipo_unidad.tipo_unidad_id, NOT NULL.
- estado_ocupacion_id: INT, FK->estado_ocupacion.estado_ocupacion_id, NOT NULL.
- numero: VARCHAR(20), NOT NULL.
- area_m2: NUMERIC(8,2), NULL, CHECK(area_m2>0).
- Restriccion: UNIQUE(piso_id, numero).

## 6. persona
- persona_id: SERIAL, PK, NOT NULL.
- tipo_documento: VARCHAR(10), NOT NULL.
- documento: VARCHAR(30), UNIQUE, NOT NULL.
- nombre_completo: VARCHAR(120), NOT NULL.
- telefono: VARCHAR(30), NULL.
- email: VARCHAR(120), NULL.

## 7. residente
- residente_id: INT, PK/FK->persona.persona_id, NOT NULL.
- activo: BOOLEAN, NOT NULL DEFAULT true.

## 8. propietario
- propietario_id: INT, PK/FK->persona.persona_id, NOT NULL.
- activo: BOOLEAN, NOT NULL DEFAULT true.

## 9. unidad_residente
- unidad_residente_id: SERIAL, PK, NOT NULL.
- unidad_id: INT, FK->unidad.unidad_id, NOT NULL.
- residente_id: INT, FK->residente.residente_id, NOT NULL.
- rol_tenencia: VARCHAR(30), NOT NULL.
- fecha_inicio: DATE, NOT NULL.
- fecha_fin: DATE, NULL, CHECK(fecha_fin IS NULL OR fecha_fin>=fecha_inicio).

## 10. espacio_comun
- espacio_id: SERIAL, PK, NOT NULL.
- nombre: VARCHAR(80), UNIQUE, NOT NULL.
- tipo: VARCHAR(30), NOT NULL.
- aforo_maximo: INT, NOT NULL, CHECK(aforo_maximo>0).
- activo: BOOLEAN, NOT NULL DEFAULT true.

## 11. horario_espacio
- horario_id: SERIAL, PK, NOT NULL.
- espacio_id: INT, FK->espacio_comun.espacio_id, NOT NULL.
- dia_semana: SMALLINT, NOT NULL, CHECK(dia_semana BETWEEN 1 AND 7).
- hora_inicio: TIME, NOT NULL.
- hora_fin: TIME, NOT NULL, CHECK(hora_fin>hora_inicio).

## 12. reserva_espacio
- reserva_id: SERIAL, PK, NOT NULL.
- espacio_id: INT, FK->espacio_comun.espacio_id, NOT NULL.
- unidad_id: INT, FK->unidad.unidad_id, NOT NULL.
- residente_id: INT, FK->residente.residente_id, NOT NULL.
- fecha_inicio: TIMESTAMP, NOT NULL.
- fecha_fin: TIMESTAMP, NOT NULL, CHECK(fecha_fin>fecha_inicio).
- estado: VARCHAR(20), NOT NULL.
- creado_en: TIMESTAMP, NOT NULL DEFAULT now().
- Regla: no traslape para mismo espacio en estado ACTIVA/APROBADA.

## 13. factura
- factura_id: SERIAL, PK, NOT NULL.
- unidad_id: INT, FK->unidad.unidad_id, NOT NULL.
- fecha_emision: DATE, NOT NULL.
- fecha_vencimiento: DATE, NOT NULL, CHECK(fecha_vencimiento>=fecha_emision).
- estado: VARCHAR(20), NOT NULL.

## 14. concepto_cobro
- concepto_id: SERIAL, PK, NOT NULL.
- nombre: VARCHAR(80), UNIQUE, NOT NULL.
- tipo: VARCHAR(20), NOT NULL.

## 15. detalle_factura
- detalle_id: SERIAL, PK, NOT NULL.
- factura_id: INT, FK->factura.factura_id, NOT NULL.
- concepto_id: INT, FK->concepto_cobro.concepto_id, NOT NULL.
- valor: NUMERIC(12,2), NOT NULL, CHECK(valor>=0).

## 16. medio_pago
- medio_pago_id: SERIAL, PK, NOT NULL.
- nombre: VARCHAR(30), UNIQUE, NOT NULL.

## 17. pago
- pago_id: SERIAL, PK, NOT NULL.
- factura_id: INT, FK->factura.factura_id, NOT NULL.
- medio_pago_id: INT, FK->medio_pago.medio_pago_id, NOT NULL.
- fecha_pago: TIMESTAMP, NOT NULL.
- valor: NUMERIC(12,2), NOT NULL, CHECK(valor>0).

## 18. visitante
- visitante_id: SERIAL, PK, NOT NULL.
- persona_id: INT, FK->persona.persona_id, NOT NULL.

## 19. autorizacion_visitante
- autorizacion_id: SERIAL, PK, NOT NULL.
- visitante_id: INT, FK->visitante.visitante_id, NOT NULL.
- unidad_id: INT, FK->unidad.unidad_id, NOT NULL.
- fecha_inicio: TIMESTAMP, NOT NULL.
- fecha_fin: TIMESTAMP, NOT NULL, CHECK(fecha_fin>fecha_inicio).

## 20. bitacora_acceso
- bitacora_id: SERIAL, PK, NOT NULL.
- autorizacion_id: INT, FK->autorizacion_visitante.autorizacion_id, NOT NULL.
- fecha_hora_ingreso: TIMESTAMP, NOT NULL.
- fecha_hora_salida: TIMESTAMP, NULL, CHECK(fecha_hora_salida IS NULL OR fecha_hora_salida>=fecha_hora_ingreso).

## 21. estado_pqrs
- estado_pqrs_id: SERIAL, PK, NOT NULL.
- nombre: VARCHAR(30), UNIQUE, NOT NULL.

## 22. pqrs
- pqrs_id: SERIAL, PK, NOT NULL.
- unidad_id: INT, FK->unidad.unidad_id, NOT NULL.
- estado_pqrs_id: INT, FK->estado_pqrs.estado_pqrs_id, NOT NULL.
- asunto: VARCHAR(120), NOT NULL.
- descripcion: TEXT, NOT NULL.
- fecha_registro: TIMESTAMP, NOT NULL DEFAULT now().

## 23. respuesta_pqrs
- respuesta_id: SERIAL, PK, NOT NULL.
- pqrs_id: INT, FK->pqrs.pqrs_id, NOT NULL.
- fecha_respuesta: TIMESTAMP, NOT NULL DEFAULT now().
- detalle: TEXT, NOT NULL.

## 24. roles de BD (seguridad)
- rol_admin_ph: CRUD sobre tablas y uso de secuencias.
- rol_consulta_ph: SELECT sobre tablas y vistas.

## 25. vista operativa
- vw_reservas_detalle: vista para trazabilidad de reservas (reserva+espacio+unidad+residente).
