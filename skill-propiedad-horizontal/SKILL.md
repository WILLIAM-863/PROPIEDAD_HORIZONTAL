---
name: propiedad-horizontal-mvp
description: Usar cuando se trabaje en este proyecto de Base de Datos de propiedad horizontal para mantener coherencia entre MER, SQL crudo, miniaplicacion y entregables academicos, incluyendo plan acelerado y checklist de sustentacion.
---

# Skill: Propiedad Horizontal MVP

## Cuando usarla
- Cuando haya que crear o ajustar entregables del proyecto.
- Cuando se modifique el modelo de datos o la miniaplicacion.
- Cuando se prepare evidencia para sustentacion.

## Flujo de trabajo
1. Leer `references/project-context.md` para recordar alcance, fechas y restricciones.
2. Verificar consistencia entre:
   - `db/*.sql`
   - `app/src/server.js`
   - `docs/*.md`
3. Si se agrega entidad o regla nueva, actualizar en el mismo ciclo:
   - esquema SQL
   - semilla de datos
   - documento de entregables
4. Ejecutar validacion local con Docker:
   - `docker compose up --build`
   - revisar `/health` y flujo principal `/`
5. Cerrar iteracion con nota de avance en `docs/bitacora.md`.

## Principios
- SQL crudo siempre (sin ORM).
- Cambios pequeños, demostrables y trazables.
- Mantener estilo MVP estetico y simple.

## Mejora continua
Al final de cada sesion agregar en `docs/bitacora.md`:
- que funciono
- que falta
- riesgo detectado
- siguiente accion concreta
