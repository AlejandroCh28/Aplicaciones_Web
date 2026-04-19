import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";
import Navbar from "../../components/ui/Navbar";

const Orders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");

  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await api.get("/orders/my", config);
        setOrders(data);
      } catch (err) {
        setError(err.response?.data?.message || "No se pudieron cargar las órdenes");
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen bg-[#f5f5f3]">
      <Navbar />

      <section className="max-w-6xl mx-auto px-6 py-10">
        <div className="mb-8">
          <p className="uppercase tracking-[0.25em] text-xs text-black/40 mb-3">
            Historial
          </p>
          <h2 className="text-4xl font-semibold mb-2">Mis órdenes</h2>
          <p className="text-black/55">
            Aquí puedes ver todas tus compras realizadas.
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-red-600">
            {error}
          </div>
        )}

        {orders.length === 0 ? (
          <div className="bg-white rounded-[24px] border border-black/5 shadow-sm p-8">
            <p className="text-black/55">Todavía no has realizado compras.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white rounded-[24px] border border-black/5 shadow-sm p-6"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">
                  <div>
                    <p className="text-sm text-black/40 mb-1">
                      Orden #{order._id.slice(-6)}
                    </p>
                    <p className="text-black/55">
                      Fecha: {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="text-left md:text-right">
                    <p className="text-sm text-black/40">Estado</p>
                    <p className="font-medium">{order.status}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {order.items.map((item) => (
                    <div
                      key={item._id}
                      className="border border-black/10 rounded-2xl p-4 flex items-center justify-between gap-4"
                    >
                      <div>
                        <p className="text-sm text-black/40">
                          {item.productId?.brand}
                        </p>
                        <h3 className="text-xl font-semibold">
                          {item.productId?.name}
                        </h3>
                        <p className="text-black/55">
                          Cantidad: {item.quantity}
                        </p>
                      </div>

                      <p className="font-medium">
                        ₡{item.productId?.price}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex justify-end">
                  <div className="text-right">
                    <p className="text-sm text-black/40">Total</p>
                    <p className="text-2xl font-semibold">₡{order.total}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Orders;