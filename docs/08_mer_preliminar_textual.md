# 08 MER Preliminar (version textual)

Este documento traduce el MER preliminar a texto para acelerar revision en equipo antes del diagrama grafico.

## Modulo Habitat y Ocupacion
1. torre
2. piso
3. unidad
4. tipo_unidad
5. estado_ocupacion
6. parqueadero
7. deposito
8. unidad_residente
9. mudanza
10. autorizacion_mudanza

## Modulo Personas y Relaciones
11. persona
12. residente
13. propietario
14. arrendatario
15. grupo_familiar
16. integrante_familiar
17. apoderado
18. responsable_pago

## Modulo Convivencia
19. manual_convivencia
20. capitulo_manual
21. articulo_manual
22. incidente_convivencia
23. evidencia_incidente
24. descargo
25. sancion
26. seguimiento_sancion
27. comite_convivencia
28. sesion_comite

## Modulo Finanzas
29. concepto_cobro
30. cuota_ordinaria
31. cuota_extraordinaria
32. factura
33. detalle_factura
34. pago
35. medio_pago
36. interes_mora
37. acuerdo_pago
38. cuota_acuerdo
39. cartera
40. recaudo

## Modulo Operaciones y Espacios
41. espacio_comun
42. horario_espacio
43. reserva_espacio
44. cancelacion_reserva
45. penalizacion_reserva
46. prestamo_implemento
47. implemento
48. evento_comunitario

## Modulo Infraestructura y Mantenimiento
49. activo_infraestructura
50. tipo_activo
51. plan_mantenimiento
52. orden_trabajo
53. ejecucion_mantenimiento
54. proveedor
55. contrato_proveedor

## Modulo Seguridad
56. vigilante
57. turno_vigilancia
58. puesto_control
59. ronda_seguridad
60. bitacora_acceso
61. visitante
62. autorizacion_visitante
63. vehiculo
64. ingreso_vehiculo
65. incidente_seguridad

## Modulo Administrativo
66. correspondencia
67. pqrs
68. estado_pqrs
69. respuesta_pqrs
70. asamblea
71. votacion
72. opcion_voto
73. voto
74. circular

Total entidades preliminares: 74

## Relaciones criticas (extracto)
- torre 1:N piso
- piso 1:N unidad
- unidad N:M residente (via unidad_residente)
- unidad 1:N factura
- factura 1:N detalle_factura
- factura 1:N pago
- espacio_comun 1:N reserva_espacio
- reserva_espacio 1:N cancelacion_reserva
- incidente_convivencia 1:N evidencia_incidente
- sancion 1:N seguimiento_sancion
- plan_mantenimiento 1:N orden_trabajo
- vigilante 1:N ronda_seguridad
- visitante 1:N bitacora_acceso
- asamblea 1:N votacion
- votacion 1:N opcion_voto y opcion_voto 1:N voto

## Justificacion de complejidad
Se cubren los frentes exigidos por el PDF: habitat, personas, convivencia, finanzas, operaciones, infraestructura, seguridad y servicios administrativos, con trazabilidad transversal entre modulos.
