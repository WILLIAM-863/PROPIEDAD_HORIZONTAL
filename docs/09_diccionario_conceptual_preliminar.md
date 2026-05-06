# 09 Diccionario de Datos Conceptual (resumen por modulos)

## Nota
Este es diccionario conceptual preliminar orientado a sustentacion. En la siguiente iteracion se extiende con dominios exactos y obligatoriedad por atributo.

## Habitat y ocupacion
- torre: identifica cada torre o bloque.
- piso: nivel dentro de una torre.
- unidad: inmueble privado.
- parqueadero: cupo asociado a unidad o comun.
- deposito: bodega asociada a unidad.
- unidad_residente: relacion historica de ocupacion.

## Personas y relaciones
- persona: entidad base de datos personales.
- residente: persona que habita.
- propietario: titular legal.
- arrendatario: ocupante por contrato.
- grupo_familiar/integrante_familiar: composicion familiar por unidad.
- responsable_pago: define obligado economico principal.

## Convivencia
- incidente_convivencia: hecho reportado.
- evidencia_incidente: soporte (foto/video/acta).
- descargo: respuesta del implicado.
- sancion: medida correctiva aplicada.
- seguimiento_sancion: trazabilidad de cumplimiento.

## Finanzas
- concepto_cobro: catalogo de conceptos.
- cuota_ordinaria/cuota_extraordinaria: obligaciones periodicas/eventuales.
- factura/detalle_factura: documento de cobro y lineas.
- pago/medio_pago: registro de recaudo.
- interes_mora: calculo por atraso.
- acuerdo_pago/cuota_acuerdo: refinanciacion.
- cartera: estado agregado de deuda.

## Operaciones
- espacio_comun: recurso reservable.
- horario_espacio: ventanas de disponibilidad.
- reserva_espacio: transaccion de reserva.
- cancelacion_reserva/penalizacion_reserva: control de incumplimientos.

## Infraestructura
- activo_infraestructura: bienes mantenibles (ascensor, planta, etc.).
- plan_mantenimiento: programacion preventiva.
- orden_trabajo: solicitud operativa.
- ejecucion_mantenimiento: evidencia de ejecucion.

## Seguridad
- vigilante/turno_vigilancia/puesto_control: esquema operativo.
- visitante/autorizacion_visitante/bitacora_acceso: control de ingresos.
- vehiculo/ingreso_vehiculo: trazabilidad vehicular.
- incidente_seguridad: eventos criticos.

## Administrativo
- correspondencia: gestion de paquetes/cartas.
- pqrs/estado_pqrs/respuesta_pqrs: ciclo de atencion.
- asamblea/votacion/opcion_voto/voto: gobierno y decisiones.
- circular: comunicacion oficial.
