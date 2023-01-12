# Endpoints

## User

| Metodo | Ruta         | Accion                                  |
| ------ | ------------ | --------------------------------------- |
| POST   | /users       | [Registrar Usuario](#registrar-usuario) |
| POST   | /users/login | [Login](#login)                         |

## Plan Requests

| Metodo | Ruta                       | Accion                                                                  |
| ------ | -------------------------- | ----------------------------------------------------------------------- |
| GET    | /plan_requests/:id         | [Obtener una solicitud de plan](#obtener-una-solicitud-de-plan)         |
| GET    | /plan_requests/pending     | [Obtener solicitudes pendientes](#obtener-solicitudes-pendientes)       |
| GET    | /plan_requests/my_requests | [Obtener solicitudes de un usuario](#obtener-solicitudes-de-un-usuario) |
| POST   | /plan_requests             | [Crear solicitud del plan](#crear-una-solicitud-del-plan)               |
| PUT    | /plan_requests/:id/accept  | [Aceptar una solicitud](#aceptar-una-solicitud)                         |
| PUT    | /plan_requests/:id/reject  | [Rechazar una solicitud](#rechazar-una-solicitud)                       |
| PUT    | /plan_requests/:id/modify  | [Solicitar modificacion de un plan](#modificar-una-solicitud)           |

## Internet Plans

| Metodo | Ruta                    | Accion                                                                                        |
| ------ | ----------------------- | --------------------------------------------------------------------------------------------- |
| GET    | /internet_plans/grouped | [Obtener planes de internet agrupados por ISP](#obtener-planes-de-internet-agrupados-por-isp) |
| GET    | /internet_plans/search  | [Buscar planes de internet por ISP](#buscar-planes-de-internet-por-isp)                       |
| POST   | /internet_plans         | [Crear un plan de internet](#crear-un-plan-de-internet)                                       |
| PUT    | /internet_plans/:id     | [Actualizar un plan de internet](#actualizar-un-plan-de-internet)                             |

## User Endpoints

### Registrar Usuario

Registra un nuevo usuario en el sistema.

```text
POST /users
```

Body

```json
{
  "name": "{Nombre}",
  "email": "{Email}",
  "username": "{Usuario}",
  "password": "{Contraseña}",
  "type": "{Tipo (Isp o Cliente)}"
}
```

#### Success Response

Success:

```json
{
  "status": 200,
  "success": true,
  "message": "User Created Successfully",
  "content": {
    "username": "{Usuario}",
    "token": "{Token}",
    "name": "{Nombre}",
    "type": "{Tipo}"
  }
}
```

#### Error Response

```json
{
  "status": 400,
  "success": false,
  "message": "{Motivo del error}",
  "content": {}
}
```

### Login

Loguea un usuario en el sistema

```text
POST /users/login
```

REQUEST

```json
{
  "username": "{Usuario}"
}
```

#### Success Response

Success:

```json
{
  "status": 200,
  "success": true,
  "message": "Login successful",
  "content": {
    "username": "{Usuario}",
    "token": "{Token}",
    "name": "{Nombre}",
    "type": "{Tipo}"
  }
}
```

#### Error Response

```json
{
  "status": 400,
  "success": false,
  "message": "{Motivo del error}",
  "content": {}
}
```

## Plan Requests Endpoints

### Obtener una solicitud de plan

Obtener una solicitud de plan.

```text
GET /plan_requests/:id
```

Header Autorización

```text
Authorization=bearer {token}
```

#### Success Response

Success:

```json
{
  "status": 200,
  "success": true,
  "message": "Plan Request fetched successfully",
  "content": {
    "id": "{id}",
    "status": "{estado}",
    "user": {
      "{User}"
    },
    "request_details": [
      {
        "{RequestDetail}"
      }, ...
    ],
    "created_at": "{Fecha de creacion}",
  }
}
```

#### Error Response

```json
{
  "status": 401,
  "success": false,
  "message": "Client with token {token} doesn't exists",
  "content": {}
}
```

```json
{
  "status": 404,
  "success": false,
  "message": "Plan Request doesn't exists",
  "content": {}
}
```

### Obtener solicitudes pendientes

Obtener las solicitudes pendientes de aprobacion del Isp que este logueado en el sistema

```text
GET /plan_requests/pending
```

Header Autorización

```text
Authorization=bearer {token}
```

#### Success Response

Success:

```json
{
  "status": 200,
  "success": true,
  "message": "Plan Requests fetched successfully",
  "content": {
    "id": "{id}",
    "status": "{estado}",
    "user": {
      "{User}"
    },
    "request_details": [
      {
        "{RequestDetail}"
      }, ...
    ],
    "created_at": "{Fecha de creacion}",
  }
}
```

#### Error Response

```json
{
  "status": 401,
  "success": false,
  "message": "Isp with token {token} doesn't exists",
  "content": {}
}
```

### Obtener solicitudes de un usuario

Obtener las solicitudes de planes del usuario que esta logueado.

```text
GET /plan_requests/my_requests
```

Header Autorización

```text
Authorization=bearer {token}
```

#### Success Response

Success:

```json
{
  "status": 200,
  "success": true,
  "message": "Plan Requests fetched successfully",
  "content": {
    "id": "{id}",
    "status": "{estado}",
    "user": {
      "{User}"
    },
    "request_details": [
      {
        "{RequestDetail}"
      }, ...
    ],
    "created_at": "{Fecha de creacion}",
  }
}
```

#### Error Response

```json
{
  "status": 401,
  "success": false,
  "message": "Client with token {token} doesn't exists",
  "content": {}
}
```

### Crear una solicitud del plan

Crear una solicitud para un plan de internet.

```text
POST /plan_requests
```

Header Autorización

```text
Authorization=bearer {token}
```

Body

```json
{
  "internet_plan_id": "{id}"
}
```

#### Success Response

Success:

```json
{
  "status": 200,
  "success": true,
  "message": "Plan Request created successfully",
  "content": {
    "id": "{id}",
    "status": "{estado}",
    "user": {
      "{User}"
    },
    "request_details": [
      {
        "{RequestDetail}"
      }, ...
    ],
    "created_at": "{Fecha de creacion}",
  }
}
```

#### Error Response

```json
{
  "status": 400,
  "success": false,
  "message": "{Motivo del error}",
  "content": {}
}
```

```json
{
  "status": 401,
  "success": false,
  "message": "Client with token {token} doesn't exists",
  "content": {}
}
```

### Aceptar una solicitud

Un Isp acepta la solicitud de contratacion de un plan de internet por parte de un cliente.

```text
PUT /plan_requests/:id/accept
```

Header Autorización

```text
Authorization=bearer {token}
```

#### Success Response

Success:

```json
{
  "status": 200,
  "success": true,
  "message": "Plan Request accepted successfully",
  "content": {
    "id": "{id}",
    "status": "{estado}",
    "user": {
      "{User}"
    },
    "request_details": [
      {
        "{RequestDetail}"
      }, ...
    ],
    "created_at": "{Fecha de creacion}",
  }
}
```

#### Error Response

```json
{
  "status": 400,
  "success": false,
  "message": "{Motivo del error}",
  "content": {}
}
```

```json
{
  "status": 401,
  "success": false,
  "message": "Isp with token {token} doesn't exists",
  "content": {}
}
```

```json
{
  "status": 404,
  "success": false,
  "message": "Plan Request doesn't exists",
  "content": {}
}
```

### Rechazar una solicitud

Un Isp rechaza la solicitud de contratacion de un plan de internet por parte de un cliente.

```text
PUT /plan_requests/:id/reject
```

Header Autorización

```text
Authorization=bearer {token}
```

#### Success Response

Success:

```json
{
  "status": 200,
  "success": true,
  "message": "Plan Request rejected successfully",
  "content": {
    "id": "{id}",
    "status": "{estado}",
    "user": {
      "{User}"
    },
    "request_details": [
      {
        "{RequestDetail}"
      }, ...
    ],
    "created_at": "{Fecha de creacion}",
  }
}
```

#### Error Response

```json
{
  "status": 400,
  "success": false,
  "message": "{Motivo del error}",
  "content": {}
}
```

```json
{
  "status": 401,
  "success": false,
  "message": "Isp with token {token} doesn't exists",
  "content": {}
}
```

```json
{
  "status": 404,
  "success": false,
  "message": "Plan Request doesn't exists",
  "content": {}
}
```

### Modificar una solicitud

Un cliente solicita la modificacion de un plan de internet aprobado.

```text
PUT /plan_requests/:id/modify
```

Header Autorización

```text
Authorization=bearer {token}
```

Body

```json
{
  "internet_plan_id": "{id}"
}
```

#### Success Response

Success:

```json
{
  "status": 200,
  "success": true,
  "message": "Plan Request updated successfully",
  "content": {
    "id": "{id}",
    "status": "{estado}",
    "user": {
      "{User}"
    },
    "request_details": [
      {
        "{RequestDetail}"
      }, ...
    ],
    "created_at": "{Fecha de creacion}",
  }
}
```

#### Error Response

```json
{
  "status": 400,
  "success": false,
  "message": "{Motivo del error}",
  "content": {}
}
```

```json
{
  "status": 401,
  "success": false,
  "message": "Client with token {token} doesn't exists",
  "content": {}
}
```

```json
{
  "status": 404,
  "success": false,
  "message": "Plan Request doesn't exists",
  "content": {}
}
```

```json
{
  "status": 404,
  "success": false,
  "message": "Internet Plan doesn't exists",
  "content": {}
}
```

## Internet Plan Endpoints

### Obtener planes de internet agrupados por ISP

Obtener todos los planes de internet, agrupados por ISP

```text
GET /internet_plans/grouped
```

#### Success Response

Success:

```json
{
  "status": 200,
  "success": true,
  "message": "Internet plans fetched successfully",
  "content": {
    "{Nombre del Isp}":[
      {
      "{InternetPlan}"
      }, ...
    ],...
  }
}
```

### Buscar planes de internet por ISP

Obtener todos los planes de internet, agrupados por ISP

```text
GET /internet_plans/search
```

Query Params

```text
isp={Nombre del Isp}
```

#### Success Response

Success:

```json
{
  "status": 200,
  "success": true,
  "message": "Internet plans fetched successfully",
  "content": [
    {
      "id": "{Id}",
      "description": "{Descripción}",
      "price": "{Precio}",
      "user": {
        "name": "{Nombre del Isp}"
      }
    },...
  ]
}
```

### Crear un plan de internet

Un ISP crea un plan de internet

```text
POST /internet_plans
```

Header Autorización

```text
Authorization=bearer {token}
```

Body

```json
{
  "description": "{description}",
  "price": "{price}"
}
```

#### Success Response

Success:

```json
{
  "status": 200,
  "success": true,
  "message": "Internet plan created successfully",
  "content": {
    "id": "{Id}",
    "description": "{Descripción}",
    "price": "{Precio}",
    "user": {
      "name": "{Nombre del Isp}"
    }
  }
}
```

#### Error Response

```json
{
  "status": 400,
  "success": false,
  "message": "{Motivo del error}",
  "content": {}
}
```

```json
{
  "status": 401,
  "success": false,
  "message": "Isp with token {token} doesn't exists",
  "content": {}
}
```

### Actualizar un plan de internet

Un ISP actualiza un plan de internet existente

```text
PUT /internet_plans
```

Header Autorización

```text
Authorization=bearer {token}
```

Body

```json
{
  "description": "{description}",
  "price": "{price}"
}
```

#### Success Response

Success:

```json
{
  "status": 200,
  "success": true,
  "message": "Internet plan updated successfully",
  "content": {
    "id": "{Id}",
    "description": "{Descripción}",
    "price": "{Precio}",
    "user": {
      "name": "{Nombre del Isp}"
    }
  }
}
```

#### Error Response

```json
{
  "status": 400,
  "success": false,
  "message": "{Motivo del error}",
  "content": {}
}
```

```json
{
  "status": 401,
  "success": false,
  "message": "Isp with token {token} doesn't exists",
  "content": {}
}
```

```json
{
  "status": 401,
  "success": false,
  "message": "Internet plan doesn't exists",
  "content": {}
}
```
