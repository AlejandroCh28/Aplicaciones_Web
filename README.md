#  Essenza Luxe

Essenza Luxe es una plataforma web tipo marketplace enfocada en la compra y venta de perfumes, diseñada con una interfaz moderna, elegante y fácil de usar.

El sistema permite a los usuarios registrarse como compradores o vendedores, gestionar productos, realizar compras y visualizar órdenes dentro de una misma aplicación.

---

##  Objetivo del proyecto

Resolver la desorganización en la gestión de productos y compras mediante una plataforma centralizada que permita:

- Administración de productos
- Control de inventario
- Compra en línea mediante carrito
- Seguimiento de órdenes

---

##  Tipos de usuario

###  Comprador (Buyer)
- Ver productos disponibles
- Filtrar por categoría (Hombre, Mujer, Unisex)
- Buscar productos
- Agregar al carrito
- Modificar cantidades
- Eliminar productos
- Realizar compra
- Ver historial de órdenes

---

###  Vendedor (Seller)
- Crear productos
- Editar productos
- Eliminar productos
- Gestionar inventario (stock)

---

##  Tecnologías utilizadas

### Frontend
- React
- Vite
- Tailwind CSS
- React Router DOM
- Axios

### Backend
- Node.js
- Express
- MongoDB (Atlas)
- Mongoose
- JWT (JSON Web Tokens)
- bcryptjs

---

##  Estructura del proyecto

Essenza_Luxe/
│
├── backend/
│ ├── src/
│ │ ├── config/
│ │ ├── controllers/
│ │ ├── middleware/
│ │ ├── models/
│ │ ├── routes/
│ │ └── server.js
│ └── package.json
│
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ ├── context/
│ │ ├── layouts/
│ │ ├── pages/
│ │ ├── services/
│ │ └── assets/
│ └── package.json
│
└── docs/


---

##  Instrucciones para ejecutar el proyecto

>  IMPORTANTE: Se deben ejecutar **frontend y backend por separado**

---

###  Backend

Abrir terminal en la carpeta: backend


Instalar dependencias:

cd backend
npm install

Crear archivo .env dentro de backend con:

PORT=5000
MONGO_URI=tu_conexion_mongodb
JWT_SECRET=essenza_luxe

Ejecutar:

npm run dev

###  Frontend

Abrir otra terminal en: frontend

Instalar dependencias:

cd frontend
npm install

Ejecutar:

npm run dev

---
## Acceso al sistema

Una vez ejecutado:

 Frontend:

http://localhost:5173

👉 Backend:

http://localhost:5000

