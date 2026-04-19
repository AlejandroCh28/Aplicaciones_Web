import Cart from "../models/cartModel.js";
import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";

export const checkout = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate("items.productId");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Carrito vacío" });
    }

    let total = 0;

    for (const item of cart.items) {
      const productInCart = item.productId;

      const product = await Product.findById(productInCart._id);

      if (!product) {
        return res.status(404).json({ message: `Producto no encontrado: ${productInCart._id}` });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({
          message: `No hay suficiente stock para ${product.name}`,
        });
      }

      total += product.price * item.quantity;
    }

    for (const item of cart.items) {
      const product = await Product.findById(item.productId._id);
      product.stock -= item.quantity;
      await product.save();
    }

    const order = await Order.create({
      user: req.user._id,
      items: cart.items.map((item) => ({
        productId: item.productId._id,
        quantity: item.quantity,
      })),
      total,
      status: "paid",
      paymentMethod: "fake",
    });

    cart.items = [];
    await cart.save();

    res.status(201).json({
      message: "Pago simulado exitoso",
      order,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate("items.productId")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};