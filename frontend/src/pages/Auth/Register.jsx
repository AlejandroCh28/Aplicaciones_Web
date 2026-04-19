import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import AuthLayout from "../../layouts/AuthLayout";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "buyer",
  });
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const { data } = await api.post("/auth/register", form);
      login(data);

      if (data.role === "seller") {
        navigate("/products");
      } else {
        navigate("/");
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Error al registrarse");
    }
  };

  return (
    <AuthLayout
      title="Crea tu cuenta en Essenza Luxe"
      subtitle="Únete como comprador o vendedor y forma parte de una tienda con identidad elegante y exclusiva."
    >
      <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-start">
        <div className="bg-white rounded-[28px] shadow-sm border border-black/5 p-8 md:p-10">
          <p className="text-sm uppercase tracking-[0.25em] text-black/40 mb-4">
            Registro
          </p>

          <h2 className="text-3xl md:text-4xl font-semibold leading-tight mb-3">
            Crea tu cuenta
          </h2>

          <p className="text-black/55 mb-8">
            Completa tus datos para comenzar.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm mb-2 text-black/70">Nombre</label>
              <input
                type="text"
                name="name"
                placeholder="Tu nombre"
                value={form.name}
                onChange={handleChange}
                className="w-full rounded-2xl border border-black/15 bg-[#fafaf8] px-4 py-3.5 outline-none focus:border-black"
              />
            </div>

            <div>
              <label className="block text-sm mb-2 text-black/70">
                Correo electrónico
              </label>
              <input
                type="email"
                name="email"
                placeholder="ejemplo@correo.com"
                value={form.email}
                onChange={handleChange}
                className="w-full rounded-2xl border border-black/15 bg-[#fafaf8] px-4 py-3.5 outline-none focus:border-black"
              />
            </div>

            <div>
              <label className="block text-sm mb-2 text-black/70">Contraseña</label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                className="w-full rounded-2xl border border-black/15 bg-[#fafaf8] px-4 py-3.5 outline-none focus:border-black"
              />
            </div>

            <div>
              <label className="block text-sm mb-2 text-black/70">Tipo de cuenta</label>
              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className="w-full rounded-2xl border border-black/15 bg-[#fafaf8] px-4 py-3.5 outline-none focus:border-black"
              >
                <option value="buyer">Comprador</option>
                <option value="seller">Vendedor</option>
              </select>
            </div>

            {error && (
              <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full rounded-2xl bg-black text-white py-3.5 font-medium hover:opacity-90 transition"
            >
              Crear cuenta
            </button>
          </form>

          <p className="mt-6 text-sm text-black/55">
            ¿Ya tienes cuenta?{" "}
            <Link to="/login" className="text-black font-medium hover:underline">
              Inicia sesión
            </Link>
          </p>
        </div>

        <div className="rounded-[28px] overflow-hidden bg-[#e9e7e2] min-h-[320px] flex flex-col justify-between">
          <div className="p-8 md:p-10">
            <p className="text-sm uppercase tracking-[0.25em] text-black/40 mb-4">
              Parfumerie
            </p>
            <h3 className="text-2xl md:text-3xl font-semibold leading-tight max-w-sm">
              Diseño limpio, identidad premium y acceso organizado por rol.
            </h3>
          </div>

          <div className="h-52 bg-gradient-to-br from-[#111111] via-[#2e2e2e] to-[#c7b8a1]" />
        </div>
      </div>
    </AuthLayout>
  );
};

export default Register;