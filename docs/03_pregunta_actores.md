# 03 Pregunta Guia y Mapa de Actores

## Pregunta guia del equipo
Como diseñar y justificar un modelo de datos de alta complejidad para propiedad horizontal, garantizando consistencia y trazabilidad, y demostrando su viabilidad en una miniaplicacion funcional de reservas?

## Objetivo general
Construir un modelo entidad-relacion robusto para la administracion integral de una copropiedad y validar su aplicabilidad mediante un prototipo funcional con persistencia real.

## Objetivos especificos
1. Levantar y organizar requerimientos funcionales y no funcionales del dominio.
2. Definir reglas de negocio verificables y trazables al modelo.
3. Construir y justificar el MER preliminar y final.
4. Implementar una miniaplicacion funcional con 2 a 4 entidades.

## Mapa de actores
- Administrador: define reglas operativas, consulta indicadores y supervisa procesos.
- Auxiliar administrativo: registra novedades y apoyo operativo diario.
- Propietario: responsable legal/economico de unidad.
- Residente: usa servicios de la copropiedad (reservas, PQRS).
- Vigilante: valida ingresos y reporta incidentes.
- Mantenimiento: ejecuta tareas sobre infraestructura.
- Proveedor/Contratista: presta servicios bajo ordenes de trabajo.

## Relaciones actor-proceso (alto nivel)
- Administrador -> aprobacion de politicas y control de cartera.
- Residente -> solicitud y uso de espacios comunes.
- Vigilante -> control de novedades de acceso.
- Mantenimiento -> atencion de incidentes de infraestructura.
