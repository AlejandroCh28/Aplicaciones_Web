1. Auth (Autenticación)
Rutas públicas encargadas del acceso de los usuarios.

POST /api/auth/register → Registra un nuevo usuario en la base de datos.

POST /api/auth/login → Verifica las credenciales e inicia sesión, devolviendo la información del usuario y su token JWT.

2. Products (Catálogo de Productos)
Rutas para la gestión del inventario. Mezcla accesos públicos con accesos restringidos para vendedores.

GET /api/products → Obtiene la lista de todos los productos (Público).

GET /api/products/:id → Obtiene los detalles de un producto específico por su ID (Público).

POST /api/products → Crea un nuevo producto (Protegido - Solo seller).

POST /api/products/bulk → Crea múltiples productos al mismo tiempo (Protegido - Solo seller).

PUT /api/products/:id → Actualiza la información de un producto existente (Protegido - Solo seller).

DELETE /api/products/:id → Elimina un producto del catálogo (Protegido - Solo seller).

3. Cart (Carrito de Compras)
Rutas destinadas exclusivamente a los compradores para gestionar lo que desean adquirir.

GET /api/cart/my → Obtiene el carrito actual del usuario logueado (Protegido - Solo buyer).

POST /api/cart/add → Agrega un nuevo producto al carrito (Protegido - Solo buyer).

PUT /api/cart/item/:productId → Actualiza la cantidad de un producto específico dentro del carrito (Protegido - Solo buyer).

DELETE /api/cart/item/:productId → Elimina un producto específico del carrito (Protegido - Solo buyer).

DELETE /api/cart/clear → Vacía por completo el carrito del usuario (Protegido - Solo buyer).

4. Orders (Órdenes de Compra)
Rutas para procesar pagos y consultar historiales.

POST /api/orders/checkout → Procesa los artículos del carrito, genera la orden de compra y la marca como pagada (Protegido - Solo buyer).

GET /api/orders/my → Devuelve el historial de todas las compras realizadas por el usuario logueado (Protegido - Solo buyer).

5. Upload (Subida de Archivos)
Ruta auxiliar para el manejo de imágenes (usando Multer).

POST /api/upload → Recibe un archivo (mediante el campo de formulario image), valida que sea una imagen válida (.jpg, .png, .webp) y lo guarda en el servidor. Devuelve la URL pública para acceder a la imagen (Protegido - Solo seller).