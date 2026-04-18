import Cart from "../models/cartModel.js";

// OBTENER EL CARRITO
export const getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id }).populate("items.productId");

        if (!cart) {
            return res.json({ cart: null, total: 0 });
        }

        let total = 0;

        cart.items.forEach((item) => {
            total += item.productId.price * item.quantity;
        });

        res.json({ cart, total });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// AGREGAR PRODUCTO AL CARRITO
export const addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;

        let cart = await Cart.findOne({ user: req.user._id });

        if (!cart) {
            cart = await Cart.create({
                user: req.user._id,
                items: []
            });
        }

        const index = cart.items.findIndex(
            item => item.productId.toString() === productId
        );

        if (index > -1) {
            cart.items[index].quantity += quantity || 1;
        } else {
            cart.items.push({
                productId,
                quantity: quantity || 1
            });
        }

        await cart.save();

        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ELIMINAR PRODUCTO DEL CARRITO
export const removeFromCart = async (req, res) => {
    try {
        const { productId } = req.params;

        const cart = await Cart.findOne({ user: req.user._id });

        if (!cart) {
            return res.status(404).json({ message: "Carrito no encontrado" });
        }

        cart.items = cart.items.filter(
            item => item.productId.toString() !== productId
        );

        await cart.save();

        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// VACIAR EL CARRITO
export const clearCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id });

        if (!cart) {
            return res.status(404).json({ message: "Carrito no encontrado" });
        }

        cart.items = [];

        await cart.save();

        res.json({ message: "Carrito vaciado" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};