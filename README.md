# SkyShip Express - Programación Web, proyecto 2

## Descripción del proyecto

SkyShip Express es una plataforma web desarrollada para la gestión y seguimiento de envíos. El sistema permite a los usuarios registrarse, iniciar sesión, crear envíos y consultar información relacionada con paquetes y solicitudes. Además, incluye funcionalidades administrativas para la visualización de estadísticas, gestión de contactos y administración de envíos. 
El proyecto fue desarrollado utilizando una arquitectura separada entre frontend y backend, desplegada completamente en servicios cloud de AWS.

---

# Arquitectura general del sistema

El sistema está dividido en tres componentes principales:

## 1. Frontend
Aplicación desarrollada en React encargada de:
- Interfaz gráfica del usuario
- Formularios de login y registro
- Creación y visualización de envíos
- Panel administrativo
- Comunicación con la API REST

## 2. Backend
API REST desarrollada en Node.js y Express encargada de:
- Manejo de autenticación
- Gestión de usuarios
- Gestión de envíos
- Gestión de mensajes de contacto
- Generación y validación de JWT
- Comunicación con MongoDB Atlas

## 3. Base de datos
Base de datos NoSQL utilizando MongoDB Atlas para almacenar:
- Usuarios
- Envíos
- Contactos
- Roles

---

# Tecnologías utilizadas

## Frontend
- React
- Axios
- CSS
- React Router

## Backend
- Node.js
- Express.js
- bcryptjs
- jsonwebtoken
- mongoose
- cors
- dotenv

## Base de datos
- MongoDB Atlas

## Servicios AWS
- AWS Amplify
- AWS Elastic Beanstalk
- AWS CodePipeline
- AWS CodeBuild
- AWS API Gateway

---

# Estructura del proyecto

```txt
/
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── axios.js
│   │   ├── pages/
│   │   ├── components/
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js
│   │   ├── controllers/
│   │   │   └── auth.controller.js
│   │   ├── middleware/
│   │   ├── models/
│   │   │   └── User.js
│   │   ├── routes/
│   │   │   ├── auth.routes.js
│   │   │   ├── shipment.routes.js
│   │   │   ├── admin.routes.js
│   │   │   ├── contact.routes.js
│   │   │   └── test.routes.js
│   │   └── services/
│   │
│   ├── server.js
│   └── package.json
│
├── buildspec.yml
└── README.md
```

---

# Configuración del frontend

## Archivo principal de conexión API

Ruta:

```txt
frontend/src/api/axios.js
```

Este archivo centraliza todas las solicitudes HTTP hacia el backend.

Configuración utilizada:

```javascript
import axios from 'axios';

const api = axios.create({
    baseURL: 'https://rgphe6wwl0.execute-api.us-east-2.amazonaws.com/api'
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default api;
```

### Función del archivo
- Configura la URL base de la API
- Agrega automáticamente el token JWT a cada request
- Centraliza las llamadas HTTP

---

# Configuración del backend

## Archivo principal del servidor

Ruta:

```txt
backend/server.js
```

Responsabilidades:
- Inicializar Express
- Configurar middlewares
- Configurar CORS
- Conectar MongoDB
- Registrar rutas
- Iniciar servidor

Configuraciones importantes:

```javascript
app.use('/api/auth', authRoutes);
app.use('/api/shipments', shipmentRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/contact', contactRoutes);
```

---

# Conexión a MongoDB

## Archivo de conexión

Ruta:

```txt
backend/src/config/db.js
```

Responsabilidades:
- Conectar MongoDB Atlas
- Manejar errores de conexión
- Inicializar mongoose

Variables utilizadas:

```env
MONGO_URI=
```

---

# Modelo de usuarios

## Archivo

Ruta:

```txt
backend/src/models/User.js
```

Campos principales:
- name
- email
- phone
- address
- password
- role

Roles disponibles:
- client
- admin

---

# Autenticación

## Controlador de autenticación

Ruta:

```txt
backend/src/controllers/auth.controller.js
```

Funciones implementadas:

### register
- Validación de usuario existente
- Hash de contraseña con bcrypt
- Creación de usuario
- Guardado en MongoDB

### login
- Validación de credenciales
- Comparación de contraseña
- Generación de JWT
- Retorno de token

---

# Rutas principales

## Archivo

Ruta:

```txt
backend/src/routes/auth.routes.js
```

Endpoints:

```txt
POST /api/auth/register
POST /api/auth/login
```

---

# Variables de entorno

## Backend (.env)

Archivo ubicado en:

```txt
backend/.env
```

Ejemplo:

```env
PORT=5000
MONGO_URI=mongodb+srv://...
JWT_SECRET=secretkey
```

---

# Cómo ejecutar el proyecto localmente

## 1. Clonar repositorio

```bash
git clone <URL_DEL_REPOSITORIO>
```

---

## 2. Instalar dependencias frontend

```bash
cd frontend
npm install
```

---

## 3. Instalar dependencias backend

```bash
cd backend
npm install
```

---

## 4. Ejecutar backend

```bash
cd backend
npm start
```

O:

```bash
node server.js
```

---

## 5. Ejecutar frontend

```bash
cd frontend
npm start
```

---

# Despliegue en AWS

# Frontend - AWS Amplify

El frontend fue desplegado utilizando AWS Amplify.

## Pasos realizados

1. Conectar repositorio GitHub
2. Seleccionar rama main
3. Configurar build automático
4. Configurar despliegue continuo

Amplify genera automáticamente:
- HTTPS
- CI/CD
- Hosting
- SSL

---

# Backend - Elastic Beanstalk

El backend fue desplegado utilizando AWS Elastic Beanstalk.

## Configuración utilizada

- Plataforma: Node.js
- Puerto: 8080
- Runtime: Node.js
- Sistema operativo: Amazon Linux

## Variables de entorno configuradas

```txt
MONGO_URI
JWT_SECRET
PORT
```

---

# CI/CD con CodePipeline

Se implementó integración continua utilizando:

- CodePipeline
- CodeBuild
- Elastic Beanstalk

## Flujo implementado

```txt
GitHub
   ↓
CodePipeline
   ↓
CodeBuild
   ↓
Elastic Beanstalk
```

Cada push a la rama main realiza automáticamente:
- Build
- Empaquetado
- Deploy del backend

---

# Archivo buildspec.yml

Ubicado en:

```txt
/buildspec.yml
```

Configuración utilizada:

```yaml
version: 0.2

phases:
  install:
    runtime-versions:
      nodejs: 24
    commands:
      - cd backend
      - npm install

artifacts:
  base-directory: backend
  files:
    - '**/*'
```

---

# API Gateway

Se implementó AWS API Gateway para:

- Resolver problemas de CORS
- Habilitar HTTPS
- Conectar Amplify con Elastic Beanstalk

## Configuraciones realizadas

### Rutas

```txt
ANY /
ANY /{proxy+}
ANY /api/{proxy+}
```

### CORS

Origins permitidos:

```txt
https://main.dp832kspmbcj6.amplifyapp.com
```

Métodos permitidos:

```txt
GET
POST
PUT
DELETE
OPTIONS
```

Headers permitidos:

```txt
Content-Type
Authorization
```

### Parameter Mapping

```txt
overwrite:path = $request.path
```

---

# Problemas encontrados y soluciones

## Problema 1 - Error 502 Bad Gateway

### Causa
Elastic Beanstalk esperaba que la aplicación escuchara en el puerto 8080.

### Solución
Se configuró:

```javascript
const PORT = process.env.PORT || 5000;
```

---

## Problema 2 - MONGO_URI undefined

### Causa
Las variables de entorno no estaban configuradas correctamente en Elastic Beanstalk.

### Solución
Se agregaron las variables:

```txt
MONGO_URI
JWT_SECRET
PORT
```

Desde:

```txt
Elastic Beanstalk → Configuration → Environment properties
```

---

## Problema 3 - Mixed Content HTTPS/HTTP

### Causa
Amplify utiliza HTTPS y Elastic Beanstalk HTTP.

### Solución
Se implementó AWS API Gateway con HTTPS.

---

## Problema 4 - Error 404 en rutas

### Causa
API Gateway no reenviaba correctamente las rutas.

### Solución
Se configuró:

```txt
overwrite:path = $request.path
```

---

# Decisiones técnicas relevantes

## Separación Frontend / Backend

Se decidió separar frontend y backend para:
- facilitar mantenimiento
- mejorar escalabilidad
- permitir despliegues independientes
- modularizar responsabilidades

---

## Uso de MongoDB Atlas

Razones:
- servicio administrado
- acceso remoto
- integración sencilla con Node.js
- escalabilidad

---

## Uso de JWT

Se implementó autenticación JWT para:
- mantener sesiones stateless
- mejorar seguridad
- facilitar autenticación en APIs REST

---

## Uso de API Gateway

Razones:
- habilitar HTTPS
- resolver CORS
- centralizar acceso API
- permitir escalabilidad futura

---

# Credenciales de prueba

## Administrador

```txt
Correo: admin@test.com
Contraseña: admin123
```

## Usuario normal

```txt
Correo: router2911@test.com
Contraseña: 12345
```

---

# URLs del proyecto

## Frontend

```txt
https://main.dp832kspmbcj6.amplifyapp.com
```

## Backend API Gateway

```txt
https://rgphe6wwl0.execute-api.us-east-2.amazonaws.com/api
```

## Elastic Beanstalk

```txt
http://proyecto2-prograweb-backend-env.eba-z2smuvpp.us-east-2.elasticbeanstalk.com
```

---

# Integrantes

- Katherine Mayen, carné 1129222
- Javier Godínez, carné 1179222

---

Frontend y Backend desplegado, MongoDB conectado, API Gateway configurado, Login y Registro funcional, CORS y HTTPS funcional, Deploy automático funcional en AWS

