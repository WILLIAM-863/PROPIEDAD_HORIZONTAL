# 16 Guion de Sustentacion Tecnica

## Estructura sugerida (8 a 12 minutos)
1. Problema y contexto (1 min)
2. Alcance y delimitacion (1 min)
3. Requerimientos y reglas de negocio (2 min)
4. MER preliminar y MER final (2 min)
5. Diccionario + esquema logico inicial (2 min)
6. Demo miniaplicacion (2 min)
7. Cierre y mejoras futuras (1 min)

## Discurso corto por bloque
### 1) Problema
"Modelamos una copropiedad con alta complejidad operativa y administrativa, buscando trazabilidad y consistencia en los procesos clave." 

### 2) Alcance
"Priorizamos un MVP funcional en reservas, sin perder cobertura conceptual amplia en finanzas, seguridad, convivencia y administracion." 

### 3) Requerimientos y reglas
"Tradujimos requerimientos del dominio en reglas verificables, por ejemplo validacion de traslape horario y consistencia de estados." 

### 4) MER
"Construimos un MER preliminar de 74 entidades y lo refinamos en un MER final con cardinalidades explicitas por modulo." 

### 5) Diccionario y esquema logico
"Documentamos entidades/atributos y mapeamos a tablas relacionales, manteniendo trazabilidad de negocio a estructura tecnica." 

### 6) Demo
"Mostramos creacion de reserva, validacion de conflicto horario, persistencia en PostgreSQL y consulta de reservas recientes." 

### 7) Cierre
"La solucion es reproducible por Docker, cumple SQL crudo y deja base escalable para extender modulos pendientes." 

## Preguntas probables y respuestas
1. Por que 74 entidades si el MVP usa 4?
- Porque el enunciado exige complejidad alta del modelo completo; el MVP valida solo un proceso puntual.

2. Como garantizan consistencia en reservas?
- Con validacion temporal en backend y restricciones de integridad en la BD.

3. Por que SQL crudo y no ORM?
- Restriccion del proyecto y mayor control explicito sobre reglas y transacciones.

4. Como evidencian seguridad en BD?
- Definicion de roles (`rol_admin_ph` y `rol_consulta_ph`) y control de privilegios en scripts SQL.

5. Que queda pendiente para produccion real?
- Completar implementacion de modulos financieros, PQRS y seguridad operativa completa.

## Checklist pre-sustentacion
- [ ] Ejecutar demo en limpio con `docker compose up --build -d`
- [ ] Confirmar `/health` y flujo de reserva
- [ ] Ensayar tiempos por bloque
- [ ] Definir quien responde preguntas tecnicas de modelado y quien de implementacion
