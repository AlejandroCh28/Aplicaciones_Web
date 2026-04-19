import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";
import Navbar from "../../components/ui/Navbar";

const Home = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");
  const [brandFilter, setBrandFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const fallbackImage =
    "data:image/svg+xml;utf8," +
    encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" width="600" height="400">
        <rect width="100%" height="100%" fill="#e9e7e2"/>
        <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle"
          font-family="Arial, sans-serif" font-size="28" fill="#777">
          Sin imagen
        </text>
      </svg>
    `);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setError("");
        const { data } = await api.get("/products");
        setProducts(data);
      } catch (err) {
        setError("No se pudieron cargar los productos");
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = async (productId) => {
    try {
      setError("");
      setMessage("");

      await api.post(
        "/cart/add",
        {
          productId,
          quantity: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      setMessage("Producto agregado al carrito");
    } catch (err) {
      setError(err.response?.data?.message || "No se pudo agregar al carrito");
    }
  };

  const brands = useMemo(() => {
    return [...new Set(products.map((p) => p.brand).filter(Boolean))];
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name?.toLowerCase().includes(search.toLowerCase()) ||
        product.brand?.toLowerCase().includes(search.toLowerCase());

      const matchesBrand =
        brandFilter === "all" ? true : product.brand === brandFilter;

      const matchesCategory =
        categoryFilter === "all" ? true : product.category === categoryFilter;

      return matchesSearch && matchesBrand && matchesCategory;
    });
  }, [products, search, brandFilter, categoryFilter]);

  const categoryButtonClass = (value) =>
    `rounded-xl px-4 py-2 border transition ${
      categoryFilter === value
        ? "bg-black text-white border-black"
        : "bg-white text-black border-black/15 hover:bg-black hover:text-white"
    }`;

  return (
    <div className="min-h-screen bg-[#f5f5f3]">
      <Navbar />

      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className="mb-8">
          <p className="uppercase tracking-[0.25em] text-xs text-black/40 mb-3">
            Colección
          </p>
          <h2 className="text-4xl font-semibold mb-2">Nuestros perfumes</h2>
          <p className="text-black/55">
            Descubre fragancias elegantes y exclusivas.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 mb-6">
          <button
            onClick={() => setCategoryFilter("all")}
            className={categoryButtonClass("all")}
          >
            Todos
          </button>
          <button
            onClick={() => setCategoryFilter("men")}
            className={categoryButtonClass("men")}
          >
            Hombre
          </button>
          <button
            onClick={() => setCategoryFilter("women")}
            className={categoryButtonClass("women")}
          >
            Mujer
          </button>
          <button
            onClick={() => setCategoryFilter("unisex")}
            className={categoryButtonClass("unisex")}
          >
            Unisex
          </button>
        </div>

        <div className="grid md:grid-cols-[1fr_240px] gap-4 mb-8">
          <input
            type="text"
            placeholder="Buscar por nombre o marca..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-2xl border border-black/15 bg-white px-4 py-3 outline-none focus:border-black"
          />

          <select
            value={brandFilter}
            onChange={(e) => setBrandFilter(e.target.value)}
            className="w-full rounded-2xl border border-black/15 bg-white px-4 py-3 outline-none focus:border-black"
          >
            <option value="all">Todas las marcas</option>
            {brands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
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

        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-[24px] p-8 border border-black/5 shadow-sm">
            <p className="text-black/55">
              No hay productos disponibles con esos filtros.
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-[24px] border border-black/5 shadow-sm overflow-hidden"
              >
                <div className="h-56 bg-[#e9e7e2] overflow-hidden">
                  <img
                    src={product.image || fallbackImage}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = fallbackImage;
                    }}
                  />
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-black/40">{product.brand}</p>
                    <span className="text-xs uppercase tracking-wide text-black/40">
                      {product.category === "men"
                        ? "Hombre"
                        : product.category === "women"
                        ? "Mujer"
                        : "Unisex"}
                    </span>
                  </div>

                  <h3 className="text-2xl font-semibold mb-2">{product.name}</h3>
                  <p className="text-black/55 mb-4">
                    {product.description || "Fragancia exclusiva"}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-xl font-semibold">₡{product.price}</span>

                    <button
                      onClick={() => handleAddToCart(product._id)}
                      disabled={product.stock === 0}
                      className={`rounded-xl px-4 py-2 transition ${
                        product.stock === 0
                          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                          : "bg-black text-white hover:opacity-90"
                      }`}
                    >
                      {product.stock === 0 ? "Agotado" : "Agregar"}
                    </button>
                  </div>

                  <p className="mt-3 text-sm">
                    {product.stock === 0 ? (
                      <span className="text-red-500 font-medium">Sin stock</span>
                    ) : (
                      <span className="text-black/40">Stock: {product.stock}</span>
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;