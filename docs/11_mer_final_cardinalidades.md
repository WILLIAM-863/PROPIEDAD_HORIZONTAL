# 11 MER Final (cardinalidades y relaciones)

## Convencion
- (1,1): obligatorio y unico
- (0,1): opcional unico
- (1,N): obligatorio multiple
- (0,N): opcional multiple

## Relaciones estructurales principales
1. torre (1,1) -> (1,N) piso
2. piso (1,1) -> (1,N) unidad
3. tipo_unidad (1,1) -> (1,N) unidad
4. estado_ocupacion (1,1) -> (1,N) unidad
5. unidad (1,1) -> (0,N) parqueadero
6. unidad (1,1) -> (0,N) deposito

## Ocupacion y personas
7. unidad (1,1) -> (0,N) unidad_residente
8. residente (1,1) -> (0,N) unidad_residente
9. persona (1,1) -> (0,1) residente
10. persona (1,1) -> (0,1) propietario
11. persona (1,1) -> (0,1) arrendatario
12. grupo_familiar (1,1) -> (1,N) integrante_familiar
13. unidad (1,1) -> (0,N) grupo_familiar
14. persona (1,1) -> (0,N) apoderado
15. unidad (1,1) -> (0,N) responsable_pago

## Convivencia
16. manual_convivencia (1,1) -> (1,N) capitulo_manual
17. capitulo_manual (1,1) -> (1,N) articulo_manual
18. unidad (1,1) -> (0,N) incidente_convivencia
19. incidente_convivencia (1,1) -> (0,N) evidencia_incidente
20. incidente_convivencia (1,1) -> (0,N) descargo
21. incidente_convivencia (1,1) -> (0,1) sancion
22. sancion (1,1) -> (0,N) seguimiento_sancion
23. comite_convivencia (1,1) -> (0,N) sesion_comite

## Finanzas
24. concepto_cobro (1,1) -> (0,N) cuota_ordinaria
25. concepto_cobro (1,1) -> (0,N) cuota_extraordinaria
26. unidad (1,1) -> (0,N) factura
27. factura (1,1) -> (1,N) detalle_factura
28. factura (1,1) -> (0,N) pago
29. medio_pago (1,1) -> (0,N) pago
30. factura (1,1) -> (0,1) interes_mora
31. unidad (1,1) -> (0,N) acuerdo_pago
32. acuerdo_pago (1,1) -> (1,N) cuota_acuerdo
33. unidad (1,1) -> (0,N) cartera
34. pago (1,1) -> (0,1) recaudo

## Operaciones
35. espacio_comun (1,1) -> (1,N) horario_espacio
36. espacio_comun (1,1) -> (0,N) reserva_espacio
37. unidad (1,1) -> (0,N) reserva_espacio
38. residente (1,1) -> (0,N) reserva_espacio
39. reserva_espacio (1,1) -> (0,1) cancelacion_reserva
40. reserva_espacio (1,1) -> (0,1) penalizacion_reserva
41. reserva_espacio (1,1) -> (0,N) prestamo_implemento
42. implemento (1,1) -> (0,N) prestamo_implemento
43. espacio_comun (1,1) -> (0,N) evento_comunitario

## Infraestructura
44. tipo_activo (1,1) -> (1,N) activo_infraestructura
45. activo_infraestructura (1,1) -> (0,N) plan_mantenimiento
46. plan_mantenimiento (1,1) -> (0,N) orden_trabajo
47. orden_trabajo (1,1) -> (0,N) ejecucion_mantenimiento
48. proveedor (1,1) -> (0,N) contrato_proveedor
49. proveedor (1,1) -> (0,N) orden_trabajo

## Seguridad
50. vigilante (1,1) -> (0,N) turno_vigilancia
51. puesto_control (1,1) -> (0,N) turno_vigilancia
52. vigilante (1,1) -> (0,N) ronda_seguridad
53. visitante (1,1) -> (0,N) bitacora_acceso
54. autorizacion_visitante (1,1) -> (0,N) bitacora_acceso
55. vehiculo (1,1) -> (0,N) ingreso_vehiculo
56. visitante (1,1) -> (0,N) autorizacion_visitante
57. unidad (1,1) -> (0,N) autorizacion_visitante
58. incidente_seguridad (1,1) -> (0,1) bitacora_acceso

## Administrativo
59. unidad (1,1) -> (0,N) correspondencia
60. unidad (1,1) -> (0,N) pqrs
61. estado_pqrs (1,1) -> (0,N) pqrs
62. pqrs (1,1) -> (0,N) respuesta_pqrs
63. asamblea (1,1) -> (0,N) votacion
64. votacion (1,1) -> (1,N) opcion_voto
65. opcion_voto (1,1) -> (0,N) voto
66. residente (1,1) -> (0,N) voto
67. asamblea (1,1) -> (0,N) circular

## Validaciones semanticas globales
- Integridad referencial obligatoria por FK en relaciones (1,N).
- Restricciones de unicidad en documentos de persona, unidad(torre+numero), codigos de espacios y facturas.
- Fechas consistentes en reservas, acuerdos y mantenimiento (`fin > inicio`).
