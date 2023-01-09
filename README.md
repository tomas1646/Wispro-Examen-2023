# Índice

- [Tecnologías Utilizadas](#tecnologías)
- [Cómo ejecutar el programa](#cómo-ejecutar-el-programa)
  - [Base de datos (Postgres - Docker)](#base-de-datos-postgres---docker)
  - [Back-End](#back-end-ruby-on-rails)
  - [Front-End](#front-end-react)
- [Consideraciones Extras](#consideraciones-extras)

## Tecnologías

### BackEnd

- Ruby 3.2.0
- Rails 7.0.4

### FrontEnd

- React 18.2.0

### Base de datos

- Postgres v15.1
- Usuario: root
- Contraseña: root

## Cómo ejecutar el programa

### Base de datos (Postgres - Docker)

```bash
## Iniciamos el contenedor de postgres
docker compose up -d
```

### Back-End (Ruby on Rails)

```bash
cd backend-rails

## Instalamos gemas del proyecto
bundle install

## Corremos migraciones y creamos datos de prueba
bash recreateDB.sh

## Iniciamos el servidor backend
rails s

## Dirección por defecto:
## http://localhost:3000/
```

### Front-End (React)

```bash
cd frontend-react

## Instalamos dependencias
npm install

## Iniciamos el servidor frontend
npm start

## Dirección por defecto:
## http://localhost:3001/
```

## Consideraciones Extras

- Un usuario solo puede solicitar la modificación de un plan solo cuando este fue aprobado. Además, no podrá volver a solicitar una nueva modificación, hasta que la modificación anterior no haya sido aprobada o rechazada por el Isp.
