INSERT INTO torre (nombre) VALUES ('Torre A'), ('Torre B');

INSERT INTO unidad (torre, numero, area_m2, estado_ocupacion) VALUES
('Torre A','101',65.4,'OCUPADA'),
('Torre A','102',58.0,'OCUPADA'),
('Torre B','201',72.1,'OCUPADA');

INSERT INTO residente (nombre_completo, documento, telefono, email) VALUES
('Ana Martinez','CC1001','3001112233','ana@example.com'),
('Luis Gomez','CC1002','3005558899','luis@example.com'),
('Carla Rojas','CC1003','3014445566','carla@example.com');

INSERT INTO unidad_residente (unidad_id, residente_id, rol_tenencia, fecha_inicio) VALUES
(1,1,'PROPIETARIO','2025-01-01'),
(2,2,'ARRENDATARIO','2026-01-10'),
(3,3,'PROPIETARIO','2024-06-01');

INSERT INTO espacio_comun (nombre, tipo, aforo_maximo) VALUES
('Salon Social','SALON',80),
('Piscina','PISCINA',40),
('Cancha Multiple','CANCHA',24);

INSERT INTO reserva_espacio (espacio_id, unidad_id, residente_id, fecha_inicio, fecha_fin, estado)
VALUES
(1,1,1,'2026-05-08 18:00','2026-05-08 22:00','APROBADA'),
(3,3,3,'2026-05-09 08:00','2026-05-09 10:00','ACTIVA');
