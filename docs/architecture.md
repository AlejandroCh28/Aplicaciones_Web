1. Frontend (Cliente)
Es la capa encargada de la interfaz y la interacción con el usuario.

Tecnología Principal: Desarrollado con React (versión 19) utilizando Vite como entorno de construcción para mayor rapidez y rendimiento.

Estilos: Utiliza Tailwind CSS para un diseño ágil y responsivo.

Enrutamiento: Navegación manejada mediante React Router DOM.

Peticiones HTTP: Se utiliza Axios (configurado en src/services/api.js) para consumir la API REST del backend, apuntando a la ruta base http://localhost:5000/api.

2. Backend (Servidor)
Es la capa encargada de la lógica del negocio, validaciones y de exponer la API REST.

Entorno y Framework: Desarrollado con Node.js y Express. Utiliza ES Modules (type: module).

Estructura de la API: El servidor (corriendo en el puerto 5000) expone diferentes endpoints modulares:

/api/auth: Autenticación de usuarios.

/api/products: Gestión del catálogo.

/api/cart: Manejo del carrito de compras.

/api/orders: Procesamiento de compras.

/api/upload: Subida de archivos.

Manejo de Archivos: Utiliza Multer para recibir imágenes, las cuales se almacenan localmente y se sirven de forma estática a través de la carpeta /uploads.

3. Base de Datos
Encargada de la persistencia de los datos del sistema.

Motor de Base de Datos: MongoDB (Base de datos NoSQL).

ODM (Object Data Modeling): Se utiliza Mongoose (configurado en src/config/db.js) para definir los esquemas, modelos (User, Product, Cart, Order) y facilitar las consultas a la base de datos de forma estructurada.

4. Seguridad y Autenticación
Sesiones: Se utiliza JSON Web Tokens (JWT) para generar tokens de acceso, proteger rutas privadas y validar qué peticiones están autorizadas.

Encriptación: Las contraseñas de los usuarios se encriptan antes de guardarse en la base de datos utilizando Bcrypt.js.

CORS: El backend implementa el middleware cors para permitir que el frontend se comunique con el servidor de forma segura sin bloqueos de navegador.

5. Flujo General de Comunicación
El usuario interactúa con la interfaz en React.

El frontend envía una petición asíncrona mediante Axios hacia un endpoint específico del Backend.

El servidor en Express recibe la petición, verifica la seguridad (si requiere token JWT), y procesa la lógica en su respectivo Controller.

Si se requiere leer o guardar información, el controlador usa Mongoose para comunicarse con MongoDB.

La base de datos responde al backend, y el backend devuelve un JSON al frontend.

El frontend actualiza la interfaz visual con los nuevos datos.