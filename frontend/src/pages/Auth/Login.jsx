import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import AuthLayout from "../../layouts/AuthLayout";
import logo from "../../assets/logo.png";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
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
      const { data } = await api.post("/auth/login", form);
      login(data);

      if (data.role === "seller") {
        navigate("/products");
      } else {
        navigate("/");
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Error al iniciar sesión");
    }
  };

  return (
    <AuthLayout
      title="Ingresa a tu espacio exclusivo"
      subtitle="Accede a Essenza Luxe y continúa tu experiencia premium en perfumes, estilo y sofisticación."
    >
      <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-start">
        <div className="bg-white rounded-[28px] shadow-sm border border-black/5 p-8 md:p-10">
          <p className="text-sm uppercase tracking-[0.25em] text-black/40 mb-4">
            Iniciar sesión
          </p>

          <h2 className="text-3xl md:text-4xl font-semibold leading-tight mb-3">
            Bienvenido de nuevo
          </h2>

          <p className="text-black/55 mb-8">
            Ingresa tus datos para acceder a tu cuenta.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
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
              <label className="block text-sm mb-2 text-black/70">
                Contraseña
              </label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                className="w-full rounded-2xl border border-black/15 bg-[#fafaf8] px-4 py-3.5 outline-none focus:border-black"
              />
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
              Entrar
            </button>
          </form>

          <p className="mt-6 text-sm text-black/55">
            ¿No tienes cuenta?{" "}
            <Link to="/register" className="text-black font-medium hover:underline">
              Regístrate
            </Link>
          </p>
        </div>

        <div className="rounded-[28px] overflow-hidden bg-[#d6d0c5] min-h-[320px] flex flex-col justify-between">
          <div className="p-8 md:p-10">
            <p className="text-sm uppercase tracking-[0.25em] text-black/40 mb-4">
              Essenza Luxe
            </p>
            <h3 className="text-2xl md:text-3xl font-semibold leading-tight max-w-sm">
              Una experiencia elegante desde el primer acceso.
            </h3>
          </div>

          <div className="flex-1 flex items-center justify-center p-8 md:p-10">
            <img
              src={logo}
              alt="Essenza Luxe"
              className="max-w-[75%] h-auto object-contain opacity-95"
            />
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Login;