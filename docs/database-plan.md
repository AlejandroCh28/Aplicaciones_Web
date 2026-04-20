1. User (Usuario)
Almacena la información de las personas registradas en la plataforma, controlando sus accesos mediante roles.

name (String): Nombre del usuario (Obligatorio).

email (String): Correo electrónico del usuario (Obligatorio, único y se guarda en minúsculas).

password (String): Contraseña encriptada para la autenticación (Obligatorio).

role (String): Nivel de acceso en el sistema. Valores permitidos: buyer (comprador) o seller (vendedor). Por defecto: buyer.

timestamps: Sí (genera automáticamente createdAt y updatedAt).
--------------------------------------------------------------------------------------------------------------------------------------
2. Product (Producto)
Representa los artículos que conforman el catálogo de la tienda.

name (String): Nombre del producto (Obligatorio).

brand (String): Marca del producto (Obligatorio).

price (Number): Precio de venta (Obligatorio).

description (String): Descripción detallada del artículo.

image (String): Ruta de la imagen subida.

category (String): Clasificación del producto. Valores permitidos: men, women, unisex. Por defecto: unisex.

stock (Number): Cantidad de unidades disponibles en inventario (Obligatorio). Por defecto: 0.

timestamps: Sí.
------------------------------------------------------------------------------------------------------------------------------------
3. Cart (Carrito de Compras)
Maneja el estado temporal de los productos que un usuario desea comprar antes de procesar el pago.

user (ObjectId): Referencia directa al modelo User. Indica de quién es el carrito (Obligatorio).

items (Array de Objetos): Lista de los productos agregados. Cada objeto contiene:

productId (ObjectId): Referencia directa al modelo Product (Obligatorio).

quantity (Number): Cantidad que se desea llevar de ese producto en específico (Obligatorio). Por defecto: 1.
------------------------------------------------------------------------------------------------------------------------------------------
4. Order (Órdenes / Pedidos)
Registra el historial y el estado de las compras realizadas por los usuarios.

user (ObjectId): Referencia directa al modelo User que realizó la compra (Obligatorio).

items (Array de Objetos): "Fotografía" de los productos comprados. Cada objeto contiene:

productId (ObjectId): Referencia al modelo Product (Obligatorio).

quantity (Number): Cantidad comprada de ese producto (Obligatorio).

total (Number): Monto total a cobrar por la orden (Obligatorio). Por defecto: 0.

status (String): Estado actual del pedido. Valores permitidos: pending (pendiente), paid (pagado), cancelled (cancelado). Por defecto: paid.

paymentMethod (String): Método con el que se realizó el pago. Por defecto: fake.

timestamps: Sí (ideal para mostrar la fecha de la compra en el historial del usuario).
