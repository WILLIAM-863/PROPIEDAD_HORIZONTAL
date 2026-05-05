# Instalacion de Docker (Windows) y ejecucion del proyecto

Fecha de intento automatizado: 5 de mayo de 2026.

## Estado actual
- `winget` disponible.
- Descarga de Docker Desktop completada.
- Instalacion fallo con codigo `4294967291` por elevacion administrativa (UAC/admin).

## Instalacion recomendada (manual, 2 minutos)
1. Abrir PowerShell **como Administrador**.
2. Ejecutar:
   `winget install -e --id Docker.DockerDesktop --accept-package-agreements --accept-source-agreements`
3. Reiniciar Windows si Docker lo solicita.
4. Abrir Docker Desktop y completar el wizard inicial (WSL2 backend recomendado).

## Verificacion
Ejecutar en nueva terminal:
- `docker --version`
- `docker compose version`
- `docker run hello-world`

## Levantar el proyecto
En la raiz del repo:
1. `docker compose up --build -d`
2. App: `http://localhost:3000`
3. Health: `http://localhost:3000/health`
4. Apagar: `docker compose down`

## Notas para trabajo en pareja
- Ambos usan el mismo `docker-compose.yml`.
- No requiere instalar Node o Postgres localmente.
- La base se inicializa automaticamente con scripts `db/01_schema.sql`, `db/02_seed.sql`, `db/03_views_roles.sql`.
