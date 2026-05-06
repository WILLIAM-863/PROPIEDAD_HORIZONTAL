# 12 Esquema Logico Inicial (mapeo relacional)

Este documento traduce el MER final a estructura de tablas por modulo. Es base para SQL completo en iteraciones.

## Ejemplo de conversion por patron
- Relacion 1:N: FK en tabla hija.
- Relacion N:M: tabla asociativa con PK compuesta o surrogate key.
- Jerarquia (persona->roles): tablas por subtipo con PK=FK a persona.

## Modulo Habitat
- torre(torre_id PK, nombre)
- piso(piso_id PK, torre_id FK, numero)
- tipo_unidad(tipo_unidad_id PK, nombre)
- estado_ocupacion(estado_ocupacion_id PK, nombre)
- unidad(unidad_id PK, piso_id FK, tipo_unidad_id FK, estado_ocupacion_id FK, numero, area_m2)
- parqueadero(parqueadero_id PK, unidad_id FK NULL, codigo, tipo)
- deposito(deposito_id PK, unidad_id FK, codigo)
- unidad_residente(unidad_residente_id PK, unidad_id FK, residente_id FK, rol_tenencia, fecha_inicio, fecha_fin)

## Modulo Personas
- persona(persona_id PK, tipo_documento, documento UNIQUE, nombre_completo, telefono, email)
- residente(residente_id PK/FK persona_id, activo)
- propietario(propietario_id PK/FK persona_id, activo)
- arrendatario(arrendatario_id PK/FK persona_id, activo)

## Modulo Operaciones (MVP implementado)
- espacio_comun(espacio_id PK, nombre UNIQUE, tipo, aforo_maximo, activo)
- horario_espacio(horario_id PK, espacio_id FK, dia_semana, hora_inicio, hora_fin)
- reserva_espacio(reserva_id PK, espacio_id FK, unidad_id FK, residente_id FK, fecha_inicio, fecha_fin, estado, creado_en)
- cancelacion_reserva(cancelacion_id PK, reserva_id FK UNIQUE, motivo, fecha_cancelacion)
- penalizacion_reserva(penalizacion_id PK, reserva_id FK UNIQUE, valor, motivo)

## Modulo Finanzas (base)
- concepto_cobro(concepto_id PK, nombre, tipo)
- factura(factura_id PK, unidad_id FK, fecha_emision, fecha_vencimiento, estado)
- detalle_factura(detalle_id PK, factura_id FK, concepto_id FK, valor)
- pago(pago_id PK, factura_id FK, medio_pago_id FK, fecha_pago, valor)
- medio_pago(medio_pago_id PK, nombre)

## Modulo Seguridad (base)
- vigilante(vigilante_id PK, persona_id FK)
- visitante(visitante_id PK, persona_id FK)
- autorizacion_visitante(autorizacion_id PK, visitante_id FK, unidad_id FK, fecha_inicio, fecha_fin)
- bitacora_acceso(bitacora_id PK, autorizacion_id FK, fecha_hora_ingreso, fecha_hora_salida)

## Modulo Administrativo (base)
- pqrs(pqrs_id PK, unidad_id FK, estado_pqrs_id FK, asunto, descripcion, fecha_registro)
- estado_pqrs(estado_pqrs_id PK, nombre)
- respuesta_pqrs(respuesta_id PK, pqrs_id FK, fecha_respuesta, detalle)

## Observacion
El SQL actual de la miniapp implementa el subconjunto operacional minimo. El resto se incorpora por fases sin romper la app actual.
