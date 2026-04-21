import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import logo from "../../assets/logo.png";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!user) return null;

  return (
    <header className="border-b border-black/10 bg-white">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* 🔥 LOGO + TEXTO */}
        <div className="flex items-center gap-3">
          <img
            src={logo}
            alt="Essenza Luxe"
            className="h-12 w-12 object-contain"
          />

          <div>
            <h1 className="text-xl font-semibold leading-none">
              Essenza Luxe
            </h1>
            <p className="text-sm text-black/50">
              Bienvenido, {user?.name}
            </p>
          </div>
        </div>

        {/* 🔥 NAV */}
        <nav className="flex items-center gap-3 flex-wrap justify-end">
          {user.role === "buyer" && (
            <>
              <Link
                to="/"
                className="rounded-xl border border-black/15 px-4 py-2 bg-white hover:bg-black hover:text-white transition"
              >
                Inicio
              </Link>

              <Link
                to="/cart"
                className="rounded-xl border border-black/15 px-4 py-2 bg-white hover:bg-black hover:text-white transition"
              >
                Carrito
              </Link>

              <Link
                to="/orders"
                className="rounded-xl border border-black/15 px-4 py-2 bg-white hover:bg-black hover:text-white transition"
              >
                Órdenes
              </Link>
            </>
          )}

          {user.role === "seller" && (
            <Link
              to="/products"
              className="rounded-xl border border-black/15 px-4 py-2 bg-white hover:bg-black hover:text-white transition"
            >
              Productos
            </Link>
          )}

          <button
            onClick={handleLogout}
            className="rounded-xl bg-black text-white px-4 py-2 hover:opacity-80 transition"
          >
            Cerrar sesión
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;