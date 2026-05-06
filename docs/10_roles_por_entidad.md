# 10 Roles por Entidad (matriz inicial)

## Roles
- Administrador
- Auxiliar Administrativo
- Vigilante
- Residente
- Propietario
- Tesoreria
- Comite Convivencia

## Matriz resumida
- unidad: Administrador (CRUD), Auxiliar (R), Propietario (R)
- residente: Administrador (CRUD), Auxiliar (CRU), Vigilante (R)
- espacio_comun: Administrador (CRUD), Residente (R)
- reserva_espacio: Residente (CR), Administrador (RUD), Vigilante (R)
- incidente_convivencia: Vigilante (C), Residente (C), Comite (RUD)
- sancion: Comite (CRU), Administrador (R)
- factura: Tesoreria (CRUD), Propietario (R), Residente (R)
- pago: Tesoreria (CRUD), Propietario (R)
- pqrs: Residente (C), Auxiliar (R), Administrador (RUD)
- bitacora_acceso: Vigilante (CRUD), Administrador (R)

## Convencion
- C: Create
- R: Read
- U: Update
- D: Delete
