import React from "react"; // 👈 ESTA LÍNEA ES OBLIGATORIA EN TU PROYECTO
import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useAuth } from "../services/useAuth";

export default function Layout({ children }) {
  const { usuario, loading, logout } = useAuth();
  const [open, setOpen] = useState(false);

  if (loading) return <p className="p-6">Cargando...</p>;

  return (
    <div className="min-h-screen flex flex-col bg-orange-50">
      {/* HEADER */}
      <header className="bg-white shadow-md border-b border-orange-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

          {/* LOGO */}
          <Link to="/" className="text-2xl font-bold text-orange-700">
            Sembrando Conocimientos
          </Link>

          {/* NAV DESKTOP */}
          <nav className="hidden md:flex gap-6 text-gray-700 font-medium">
            {/* PÚBLICAS */}
            <Link to="/">Inicio</Link>
            <Link to="/nosotras">Nosotras</Link>
            <Link to="/mision-vision">Misión y Visión</Link>
            <Link to="/catalogo">Catálogo</Link>
            <Link to="/foro">Foro</Link>
            <Link to="/testimonios">Testimonios</Link>
            <Link to="/contactanos">Contáctanos</Link>
            <Link to="/promociones">Promociones</Link>

            {/* ESTUDIANTE */}
            {usuario?.rol === "estudiante" && (
              <Link to="/mis-cursos" className="text-orange-600 font-semibold">
                Mis cursos
              </Link>
            )}

            {/* PROFESOR */}
            {usuario?.rol === "profesor" && (
              <Link to="/crear-curso" className="text-orange-600 font-semibold">
                Crear curso
              </Link>
            )}
          </nav>

          {/* USUARIO */}
          {!usuario ? (
            <Link
              to="/login"
              className="hidden md:block bg-orange-500 text-white px-4 py-2 rounded-lg"
            >
              Iniciar sesión
            </Link>
          ) : (
            <div className="hidden md:flex items-center gap-3">
              <span className="font-semibold text-orange-700">
                {usuario.nombre} ({usuario.rol})
              </span>
              <img
                src="/assets/img/avatar.png"
                className="w-9 h-9 rounded-full border-2 border-orange-400"
              />
              <button
                onClick={logout}
                className="bg-orange-500 text-white px-3 py-1 rounded"
              >
                Salir
              </button>
            </div>
          )}

          {/* MOBILE BTN */}
          <button
            className="md:hidden text-orange-700"
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>

        {/* MOBILE MENU */}
        {open && (
          <div className="md:hidden bg-white border-t px-6 py-4 space-y-3">
            <Link to="/" onClick={() => setOpen(false)}>Inicio</Link>
            <Link to="/nosotras" onClick={() => setOpen(false)}>Nosotras</Link>
            <Link to="/mision-vision" onClick={() => setOpen(false)}>Misión y Visión</Link>
            <Link to="/catalogo" onClick={() => setOpen(false)}>Catálogo</Link>
            <Link to="/foro" onClick={() => setOpen(false)}>Foro</Link>
            <Link to="/testimonios" onClick={() => setOpen(false)}>Testimonios</Link>
            <Link to="/contactanos" onClick={() => setOpen(false)}>Contáctanos</Link>
            <Link to="/promociones" onClick={() => setOpen(false)}>Promociones</Link>

            {usuario?.rol === "estudiante" && (
              <Link to="/mis-cursos">Mis cursos</Link>
            )}

            {usuario?.rol === "profesor" && (
              <Link to="/crear-curso">Crear curso</Link>
            )}

            {!usuario ? (
              <Link to="/login" className="block bg-orange-500 text-white text-center py-2 rounded">
                Iniciar sesión
              </Link>
            ) : (
              <button
                onClick={logout}
                className="w-full bg-orange-500 text-white py-2 rounded"
              >
                Cerrar sesión
              </button>
            )}
          </div>
        )}
      </header>

      {/* CONTENIDO */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-10">
        {children}
      </main>

      {/* FOOTER */}
      <footer className="bg-white border-t py-6 text-center text-gray-600">
        <p className="font-semibold text-orange-700">
          Sembrando Conocimientos © {new Date().getFullYear()}
        </p>
        <p className="text-sm">Hecho con dedicación ✨</p>
      </footer>
    </div>
  );
}
