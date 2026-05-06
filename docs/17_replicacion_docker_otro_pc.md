# Replicacion del Proyecto en Otro PC (Docker)

## Requisitos
- Windows 10/11 o Linux/macOS
- Docker Desktop (o Docker Engine + Compose)
- Git

## 1) Clonar repositorio
```bash
git clone https://github.com/WILLIAM-863/PROPIEDAD_HORIZONTAL.git
cd PROPIEDAD_HORIZONTAL
```

## 2) Verificar Docker
```bash
docker --version
docker compose version
```

## 3) Levantar proyecto
```bash
docker compose up --build -d
```

Esto crea:
- Contenedor `ph_db` (PostgreSQL 16)
- Contenedor `ph_app` (Node/Express)
- Volumen `pgdata` con persistencia

## 4) Validar funcionamiento
- App: `http://localhost:3000`
- Salud: `http://localhost:3000/health`

Comando de verificacion:
```bash
docker compose ps
```

## 5) Reiniciar limpio (si hay errores de datos iniciales)
```bash
docker compose down -v
docker compose up --build -d
```

## 6) Comandos utiles
- Ver logs:
```bash
docker compose logs -f
```
- Detener:
```bash
docker compose down
```

## 7) Puertos usados
- `3000`: aplicacion web
- `5432`: PostgreSQL

## 8) Estructura relevante
- `docker-compose.yml`: orquestacion de servicios
- `app/Dockerfile`: imagen de la miniaplicacion
- `db/01_schema.sql`: creacion de objetos
- `db/02_seed.sql`: datos semilla
- `db/03_views_roles.sql`: vistas y roles

## 9) Nota para Windows (WSL2)
Si Docker Desktop no inicia engine Linux:
1. Abrir PowerShell Administrador.
2. Ejecutar:
```powershell
wsl --update
wsl --set-default-version 2
wsl -l -v
```
3. Verificar que la distro (ej. Ubuntu) quede en `VERSION 2`.
4. Abrir Docker Desktop y esperar "Engine running".
