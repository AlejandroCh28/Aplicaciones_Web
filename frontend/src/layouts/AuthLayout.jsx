import { Link } from "react-router-dom";

const AuthLayout = ({ title, subtitle, children }) => {
  return (
    <div className="min-h-screen bg-[#f5f5f3] text-black">
      <header className="w-full border-b border-black/10 bg-[#f5f5f3]">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-black" />
            <span className="text-2xl font-light tracking-wide">Essenza Luxe</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm">
            <Link to="/" className="hover:opacity-70 transition">Inicio</Link>
            <Link to="/products" className="hover:opacity-70 transition">Perfumes</Link>
            <Link to="/login" className="hover:opacity-70 transition">Ingresar</Link>
          </nav>
        </div>
      </header>

      <section className="bg-black text-white">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
          <p className="uppercase tracking-[0.3em] text-xs text-white/60 mb-4">
            Parfumerie
          </p>
          <h1 className="text-4xl md:text-6xl font-semibold leading-[0.95] max-w-3xl">
            {title}
          </h1>
          <p className="mt-6 text-base md:text-xl text-white/75 max-w-2xl">
            {subtitle}
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        {children}
      </section>
    </div>
  );
};

export default AuthLayout;