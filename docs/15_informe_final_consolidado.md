# 15 Informe Final Consolidado

## 1. Portada
- Universidad Tecnologica de Pereira
- Ingenieria en Sistemas y Computacion
- Asignatura: Base de Datos (IS644 gr 101)
- Proyecto: Administracion de Propiedad Horizontal
- Integrantes: William Sanchez, [Nombre companera]
- Periodo: 2026-1

## 2. Resumen ejecutivo
Se desarrollo una propuesta de modelado de datos de alta complejidad para una copropiedad residencial, cubriendo modulos de habitat, personas, convivencia, finanzas, operaciones, seguridad, infraestructura y gestion administrativa. Como validacion aplicada, se implemento una miniaplicacion funcional de reservas de espacios comunes con persistencia real en PostgreSQL, consultas SQL crudas y despliegue en contenedores Docker.

## 3. Contexto y delimitacion
Ver `docs/02_contexto_delimitacion.md`.

## 4. Pregunta guia y objetivos
Ver `docs/03_pregunta_actores.md`.

## 5. Analisis del problema y actores
La copropiedad requiere unificar informacion operativa y administrativa para mejorar trazabilidad, coherencia y capacidad de control. El sistema se diseña para soportar decisiones sobre ocupacion, recaudo, convivencia, seguridad y uso de espacios.

Actores principales:
- Administrador
- Auxiliar administrativo
- Propietario
- Residente
- Vigilante
- Personal de mantenimiento
- Proveedor/Contratista

## 6. Matriz de requerimientos
Ver `docs/04_matriz_requerimientos.md`.

## 7. Glosario y reglas de negocio
Ver `docs/05_glosario.md` y `docs/06_reglas_negocio.md`.

## 8. Modelo entidad-relacion
- MER preliminar: `docs/08_mer_preliminar_textual.md`
- MER final (texto + cardinalidades): `docs/11_mer_final_cardinalidades.md`

Resumen de complejidad:
- Total entidades preliminares: 74.
- Cobertura de todos los frentes exigidos por el enunciado.

## 9. Diccionario de datos
- Conceptual preliminar: `docs/09_diccionario_conceptual_preliminar.md`
- Tecnico por atributos: `docs/14_diccionario_tecnico_atributos.md`

## 10. Esquema logico inicial
Ver `docs/12_esquema_logico_inicial.md`.

## 11. Scripts de base de datos
- Creacion: `db/01_schema.sql`
- Poblacion: `db/02_seed.sql`
- Vistas y roles: `db/03_views_roles.sql`

## 12. Justificacion de decisiones de modelado
1. Se eligio modelado modular para mantener escalabilidad semantica y trazabilidad entre procesos.
2. Se uso SQL crudo para cumplir restriccion academica y mantener control explicito de validaciones.
3. Se priorizo miniaplicacion de reservas por su valor demostrativo en reglas temporales y consistencia.
4. Se definieron roles de BD para evidenciar nociones de seguridad y segregacion de funciones.

## 13. Miniaplicacion funcional
Proceso implementado: reserva de espacios comunes.

Entidades involucradas (MVP):
- unidad
- residente
- espacio_comun
- reserva_espacio

Reglas implementadas:
- fecha_fin > fecha_inicio
- sin traslape de reservas activas/aprobadas en el mismo espacio

Codigo clave:
- `app/src/server.js`
- `app/src/db.js`

## 14. Evidencias de funcionamiento
- Endpoint de salud: `/health` retorna `{"ok":true}`.
- Interfaz principal: `/` con formulario y tabla de reservas.
- Persistencia: inserciones reales sobre PostgreSQL en contenedor.

## 15. Validacion del modelo
Fortalezas:
- Cobertura amplia del dominio.
- Trazabilidad entre requerimientos, reglas y estructuras.
- Implementacion demostrable del proceso critico elegido.

Riesgos/ajustes pendientes:
- Llevar MER final a diagrama visual formal para anexos.
- Completar SQL de modulos no implementados en MVP.
- Afinar catalogos de dominio para estados y tipos.

## 16. Trabajo colaborativo
Distribucion sugerida/ejecutada:
- Integrante A: modelado, reglas, diccionarios, informe.
- Integrante B: miniaplicacion, Docker, scripts SQL, pruebas.

## 17. Conclusiones
1. El modelo propuesto cumple el criterio de complejidad alta del proyecto.
2. La miniaplicacion confirma viabilidad tecnica del diseno conceptual.
3. La arquitectura dockerizada facilita reproducibilidad y trabajo colaborativo.
4. El uso de SQL crudo permitio evidenciar con claridad reglas e integridad de datos.

## 18. Anexos
- `docs/07_checklist_entregables.md`
- `docs/10_roles_por_entidad.md`
- `docs/00_plan_acelerado.md`
- `docs/bitacora.md`
