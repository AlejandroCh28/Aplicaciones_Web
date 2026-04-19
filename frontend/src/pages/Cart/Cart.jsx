import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";
import Navbar from "../../components/ui/Navbar";

const Cart = () => {
  const { user } = useAuth();
  const [cartData, setCartData] = useState(null);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };

  const fetchCart = async () => {
    try {
      setError("");
      const { data } = await api.get("/cart/my", config);
      setCartData(data.cart);
      setTotal(data.total || 0);
    } catch (err) {
      setError(err.response?.data?.message || "No se pudo cargar el carrito");
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleRemove = async (productId) => {
    try {
      setError("");
      setMessage("");
      await api.delete(`/cart/item/${productId}`, config);
      setMessage("Producto eliminado del carrito");
      fetchCart();
    } catch (err) {
      setError(err.response?.data?.message || "No se pudo eliminar el producto");
    }
  };

  const handleClearCart = async () => {
    try {
      setError("");
      setMessage("");
      await api.delete("/cart/clear", config);
      setMessage("Carrito vaciado");
      fetchCart();
    } catch (err) {
      setError(err.response?.data?.message || "No se pudo vaciar el carrito");
    }
  };

  const handleCheckout = async () => {
    try {
      setError("");
      setMessage("");
      await api.post("/orders/checkout", {}, config);
      setMessage("Pago simulado exitoso");
      fetchCart();
    } catch (err) {
      setError(err.response?.data?.message || "No se pudo realizar el checkout");
    }
  };

  const handleQuantityChange = async (productId, newQuantity) => {
    try {
      setError("");
      setMessage("");

      await api.put(
        `/cart/item/${productId}`,
        { quantity: newQuantity },
        config
      );

      fetchCart();
    } catch (err) {
      setError(err.response?.data?.message || "No se pudo actualizar la cantidad");
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f3]">
      <Navbar />

      <section className="max-w-6xl mx-auto px-6 py-10">
        <div className="mb-8">
          <p className="uppercase tracking-[0.25em] text-xs text-black/40 mb-3">
            Compra
          </p>
          <h2 className="text-4xl font-semibold mb-2">Tu carrito</h2>
          <p className="text-black/55">Revisa tus productos antes de pagar.</p>
        </div>

        {error && (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-red-600">
            {error}
          </div>
        )}

        {message && (
          <div className="mb-6 rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-green-700">
            {message}
          </div>
        )}

        {!cartData || cartData.items.length === 0 ? (
          <div className="bg-white rounded-[24px] p-8 border border-black/5 shadow-sm">
            <p className="text-black/55">Tu carrito está vacío.</p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-[1.5fr_0.7fr] gap-8">
            <div className="space-y-4">
              {cartData.items.map((item) => (
                <div
                  key={item._id}
                  className="bg-white rounded-[24px] border border-black/5 shadow-sm p-6 flex items-center justify-between gap-4"
                >
                  <div>
                    <p className="text-sm text-black/40 mb-1">
                      {item.productId.brand}
                    </p>
                    <h3 className="text-2xl font-semibold">
                      {item.productId.name}
                    </h3>
                    <p className="text-black/55 mt-1">
                      Precio: ₡{item.productId.price}
                    </p>

                    <div className="mt-3 flex items-center gap-3">
                      <button
                        onClick={() =>
                          handleQuantityChange(item.productId._id, item.quantity - 1)
                        }
                        className="rounded-lg border border-black/15 px-3 py-1"
                      >
                        -
                      </button>

                      <span className="font-medium">{item.quantity}</span>

                      <button
                        onClick={() =>
                          handleQuantityChange(item.productId._id, item.quantity + 1)
                        }
                        className="rounded-lg border border-black/15 px-3 py-1"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => handleRemove(item.productId._id)}
                    className="rounded-xl border border-black/15 px-4 py-2 hover:bg-black hover:text-white transition"
                  >
                    Eliminar
                  </button>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-[24px] border border-black/5 shadow-sm p-6 h-fit">
              <h3 className="text-2xl font-semibold mb-4">Resumen</h3>
              <p className="text-black/55 mb-2">Total a pagar</p>
              <p className="text-3xl font-semibold mb-6">₡{total}</p>

              <div className="space-y-3">
                <button
                  onClick={handleCheckout}
                  className="w-full rounded-xl bg-black text-white py-3"
                >
                  Pagar
                </button>

                <button
                  onClick={handleClearCart}
                  className="w-full rounded-xl border border-black/15 py-3"
                >
                  Vaciar carrito
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default Cart;