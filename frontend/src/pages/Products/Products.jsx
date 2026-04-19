import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";
import Navbar from "../../components/ui/Navbar";

const Products = () => {
  const { user } = useAuth();

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

  const emptyForm = {
    name: "",
    brand: "",
    price: "",
    description: "",
    image: "",
    category: "unisex",
    stock: "",
  };

  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [selectedFile, setSelectedFile] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);

  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };

  const fetchProducts = async () => {
    try {
      setError("");
      const { data } = await api.get("/products");
      setProducts(data);
    } catch {
      setError("No se pudieron cargar los productos");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setForm(emptyForm);
    setSelectedFile(null);
    setEditingId(null);
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUploadImage = async () => {
    if (!selectedFile) return form.image;

    const formData = new FormData();
    formData.append("image", selectedFile);

    setUploading(true);

    try {
      const { data } = await api.post("/upload", formData, {
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      return data.imageUrl;
    } catch (err) {
      throw new Error(err.response?.data?.message || "No se pudo subir la imagen");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.brand || !form.price || !form.stock) {
      setError("Nombre, marca, precio y stock son obligatorios");
      return;
    }

    try {
      setError("");
      setMessage("");

      let imageUrl = form.image;

      if (selectedFile) {
        imageUrl = await handleUploadImage();
      }

      const payload = {
        name: form.name.trim(),
        brand: form.brand.trim(),
        price: Number(form.price),
        description: form.description.trim(),
        image: imageUrl,
        category: form.category,
        stock: Number(form.stock),
      };

      if (editingId) {
        await api.put(`/products/${editingId}`, payload, config);
        setMessage("Producto actualizado correctamente");
      } else {
        await api.post("/products", payload, config);
        setMessage("Producto creado correctamente");
      }

      resetForm();
      fetchProducts();
    } catch (err) {
      setError(err.message || err.response?.data?.message || "No se pudo guardar el producto");
    }
  };

  const handleEditProduct = (product) => {
    setEditingId(product._id);
    setSelectedFile(null);
    setForm({
      name: product.name || "",
      brand: product.brand || "",
      price: product.price?.toString() || "",
      description: product.description || "",
      image: product.image || "",
      category: product.category || "unisex",
      stock: product.stock?.toString() || "",
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDeleteProduct = async (productId) => {
    try {
      setError("");
      setMessage("");

      await api.delete(`/products/${productId}`, config);

      setMessage("Producto eliminado correctamente");

      if (editingId === productId) {
        resetForm();
      }

      fetchProducts();
    } catch (err) {
      setError(err.response?.data?.message || "No se pudo eliminar el producto");
    }
  };

  const labelCategory = (category) => {
    if (category === "men") return "Hombre";
    if (category === "women") return "Mujer";
    return "Unisex";
  };

  return (
    <div className="min-h-screen bg-[#f5f5f3]">
      <Navbar />

      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className="mb-10">
          <p className="uppercase tracking-[0.25em] text-xs text-black/40 mb-3">
            Seller Panel
          </p>
          <h2 className="text-4xl font-semibold mb-2">Gestión de productos</h2>
          <p className="text-black/55">
            Crea, edita y elimina productos de tu catálogo.
          </p>
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

        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-8">
          <div className="bg-white rounded-[24px] border border-black/5 shadow-sm p-6 h-fit">
            <h3 className="text-2xl font-semibold mb-6">
              {editingId ? "Editar producto" : "Crear producto"}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm mb-2 text-black/70">Nombre</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-black/15 bg-[#fafaf8] px-4 py-3 outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="block text-sm mb-2 text-black/70">Marca</label>
                <input
                  type="text"
                  name="brand"
                  value={form.brand}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-black/15 bg-[#fafaf8] px-4 py-3 outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="block text-sm mb-2 text-black/70">Precio</label>
                <input
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-black/15 bg-[#fafaf8] px-4 py-3 outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="block text-sm mb-2 text-black/70">Descripción</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows="3"
                  className="w-full rounded-2xl border border-black/15 bg-[#fafaf8] px-4 py-3 outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="block text-sm mb-2 text-black/70">Imagen del producto</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full rounded-2xl border border-black/15 bg-[#fafaf8] px-4 py-3 outline-none"
                />
                {selectedFile && (
                  <p className="text-sm text-black/50 mt-2">
                    Archivo seleccionado: {selectedFile.name}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm mb-2 text-black/70">Categoría</label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-black/15 bg-[#fafaf8] px-4 py-3 outline-none focus:border-black"
                >
                  <option value="men">Hombre</option>
                  <option value="women">Mujer</option>
                  <option value="unisex">Unisex</option>
                </select>
              </div>

              <div>
                <label className="block text-sm mb-2 text-black/70">Stock</label>
                <input
                  type="number"
                  name="stock"
                  value={form.stock}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-black/15 bg-[#fafaf8] px-4 py-3 outline-none focus:border-black"
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={uploading}
                  className="flex-1 rounded-2xl bg-black text-white py-3.5 font-medium hover:opacity-90 transition disabled:opacity-60"
                >
                  {uploading
                    ? "Subiendo imagen..."
                    : editingId
                    ? "Guardar cambios"
                    : "Crear producto"}
                </button>

                {editingId && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="rounded-2xl border border-black/15 px-5 py-3.5"
                  >
                    Cancelar
                  </button>
                )}
              </div>
            </form>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-6">Productos actuales</h3>

            <div className="space-y-4">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="bg-white rounded-[24px] border border-black/5 shadow-sm overflow-hidden"
                >
                  <div className="grid md:grid-cols-[180px_1fr]">
                    <div className="h-48 md:h-full bg-[#e9e7e2] overflow-hidden">
                      <img
                        src={product.image || fallbackImage}
                        alt={product.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = fallbackImage;
                        }}
                      />
                    </div>

                    <div className="p-6 flex flex-col justify-between">
                      <div>
                        <p className="text-sm text-black/40 mb-2">{product.brand}</p>
                        <h4 className="text-2xl font-semibold mb-2">{product.name}</h4>
                        <p className="text-black/55 mb-2">
                          {product.description || "Sin descripción"}
                        </p>
                        <p className="text-black/60">
                          Categoría: {labelCategory(product.category)}
                        </p>
                        <p className="text-black/60">Precio: ₡{product.price}</p>
                        <p className="text-black/60">Stock: {product.stock}</p>
                      </div>

                      <div className="mt-6 flex justify-end gap-3">
                        <button
                          onClick={() => handleEditProduct(product)}
                          className="rounded-xl border border-black/15 px-4 py-2 hover:bg-black hover:text-white transition"
                        >
                          Editar
                        </button>

                        <button
                          onClick={() => handleDeleteProduct(product._id)}
                          className="rounded-xl border border-black/15 px-4 py-2 hover:bg-black hover:text-white transition"
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {products.length === 0 && (
                <div className="bg-white rounded-[24px] border border-black/5 shadow-sm p-6">
                  <p className="text-black/55">No hay productos creados todavía.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Products;