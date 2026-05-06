# 02 Contexto, Portada y Delimitacion

## Datos del proyecto
- Universidad: Universidad Tecnologica de Pereira
- Asignatura: Base de Datos (IS644 gr 101)
- Semestre: 2026-1
- Proyecto: Administracion de Propiedad Horizontal
- Integrantes: William Sanchez, [Nombre companera]
- Fecha de sustentacion objetivo: entre 19 y 22 de mayo de 2026

## Tipo de copropiedad modelada
Conjunto residencial de complejidad media-alta con:
- 2 torres
- 120 unidades privadas
- 3 espacios comunes principales (salon social, piscina, cancha multiple)
- Operacion administrativa formal con cartera, mantenimiento, seguridad y convivencia

## Problema interpretado por el equipo
La copropiedad requiere un sistema de informacion unificado para registrar actores (propietarios, residentes, administracion), controlar procesos criticos (reservas, cobros, novedades) y mantener trazabilidad de decisiones operativas.

## Delimitacion del sistema
### Dentro del alcance
- Nucleo habitacional: torres, unidades, residentes y ocupacion.
- Operaciones: reserva de espacios comunes.
- Seguridad de datos: roles de BD y vistas de consulta.
- Persistencia: modelo relacional en PostgreSQL con SQL crudo.

### Fuera del alcance del MVP
- Integracion bancaria en linea.
- Integracion con biometria/CCTV real.
- Modulo avanzado de asambleas y votaciones multi-etapa.

## Supuestos de trabajo
1. Cada unidad puede tener uno o mas residentes activos.
2. Toda reserva se solicita por un residente vinculado a una unidad.
3. Los espacios comunes tienen aforo maximo definido.
4. La validacion de traslape horario es obligatoria.
