1. Buyer (Comprador)

Es el rol asignado por defecto a cualquier usuario nuevo al momento de registrarse. Sus permisos están enfocados en la experiencia de compra:

Ver el catálogo de productos disponibles.

Agregar artículos al carrito de compras.

Modificar cantidades o eliminar productos de su carrito.

Procesar el pago y finalizar compras (Checkout).

Visualizar el historial y estado de sus propias órdenes.

----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
2. Seller (Vendedor)

Es un usuario con privilegios elevados, encargado de la gestión de la tienda y el inventario. Además de poder realizar las mismas acciones que un comprador, cuenta con los siguientes permisos de administración:

Crear y publicar nuevos productos en el catálogo.

Actualizar la información de productos existentes (modificar precios, stock, categoría, etc.).

Eliminar productos del sistema.

Subir imágenes al servidor para asociarlas a los artículos.

----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
3. Implementación de la Seguridad (Cómo funciona)

Para garantizar que los permisos se respeten, el sistema valida los roles en dos capas (Frontend y Backend):

Protección en el Frontend (React): A través de AuthContext, la aplicación guarda la sesión del usuario (incluyendo su rol) en el estado global y en el localStorage. Esto permite que la interfaz de usuario sea dinámica; por ejemplo, ocultando el botón de "Crear Producto" a los compradores y bloqueando el acceso a pantallas de administración mediante componentes como PrivateRoute.

Protección en el Backend (Node/Express): Aquí reside la verdadera seguridad del sistema. Se utiliza el middleware authorizeRoles (src/middleware/roleMiddleware.js), el cual intercepta las peticiones HTTP antes de que lleguen al controlador. Si un usuario intenta ejecutar una acción restringida (por ejemplo, intentar borrar un producto) y su rol no coincide con los roles permitidos para esa ruta, el servidor bloquea la petición automáticamente y devuelve un error 403 (Acceso denegado).
