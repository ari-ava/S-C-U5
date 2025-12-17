import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { auth, db } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

export default function Layout({ children }) {
  const [open, setOpen] = useState(false);
  const [usuario, setUsuario] = useState(null);
  const location = useLocation();
  

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const ref = doc(db, "usuarios", user.uid);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          setUsuario({ uid: user.uid, ...snap.data() });
        } else {
          setUsuario({
            uid: user.uid,
            nombre: "Usuario",
            rol: "estudiante",
          });
        }
      } else {
        setUsuario(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setUsuario(null);
  };

  const navLinks = [
    { to: "/", label: "Inicio" },
    { to: "/nosotras", label: "Nosotras" },
    { to: "/mision-vision", label: "Misión y Visión" },
    { to: "/foro", label: "Foro" },
    { to: "/catalogo", label: "Catálogo" },

    // 🧭 Solo invitados
    !usuario && { to: "/contactanos", label: "Contáctanos" },
    !usuario && { to: "/testimonios", label: "Testimonios" },

    // 🎓 Solo estudiante
    usuario?.rol === "estudiante" && {
      to: "/mis-cursos",
      label: "Mis cursos",
    },
    usuario?.rol === "estudiante" && {
      to: "/promociones",
      label: "Promociones",
    },

    // 👩‍🏫 Solo profesor
    usuario?.rol === "profesor" && {
      to: "/crear-curso",
      label: "Crear curso",
    },
    usuario?.rol === "profesor" && {
      to: "/promociones",
      label: "Promociones",
    }
  ].filter(Boolean);

  return (
    <div className="min-h-screen flex flex-col bg-orange-50">

      {/* ================= HEADER ================= */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-orange-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-6">

          {/* 🌱 LOGO */}
          <Link
            to="/"
            className="flex items-center gap-2 font-extrabold tracking-tight text-orange-700 text-xl sm:text-2xl"
          >
            🌱
            <span className="hidden sm:inline">
              Sembrando Conocimientos
            </span>
          </Link>

          {/* 🧭 NAV DESKTOP */}
          <nav className="hidden md:flex flex-wrap gap-6 text-sm font-medium">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={`relative transition
                  ${
                    location.pathname === l.to
                      ? "text-orange-600 font-semibold"
                      : "text-gray-600 hover:text-orange-600"
                  }`}
              >
                {l.label}
                {location.pathname === l.to && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-orange-400 rounded-full" />
                )}
              </Link>
            ))}
          </nav>

          {/* 👤 PERFIL / LOGIN */}
          {!usuario ? (
            <Link
              to="/login"
              className="hidden md:block bg-orange-500 text-white px-4 py-2 rounded-full shadow hover:bg-orange-600 transition whitespace-nowrap"
            >
              Iniciar sesión
            </Link>
          ) : (
            <div className="hidden md:flex items-center gap-3 whitespace-nowrap">
              <div className="text-right leading-tight">
                <p className="text-orange-700 font-semibold text-sm">
                  {usuario.nombre}
                </p>
                <p className="text-xs text-orange-400 capitalize">
                  {usuario.rol}
                </p>
              </div>

              <img
                src="/assets/img/avatar.png"
                alt="Avatar"
                className="h-9 w-9 rounded-full border-2 border-orange-300"
              />

              <button
                onClick={handleLogout}
                className="text-sm bg-orange-100 text-orange-700 px-3 py-1 rounded-full hover:bg-orange-200 transition"
              >
                Cerrar sesión
              </button>
            </div>
          )}

          {/* 📱 BOTÓN MOBILE */}
          <button
            className="md:hidden text-orange-700"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* ================= MOBILE MENU ================= */}
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-white border-t border-orange-200 px-6 py-6 space-y-4"
          >
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="block text-gray-700 font-medium hover:text-orange-600"
              >
                {l.label}
              </Link>
            ))}

            {!usuario ? (
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="block mt-3 bg-orange-500 text-white text-center py-2 rounded-full shadow"
              >
                Iniciar sesión
              </Link>
            ) : (
              <button
                onClick={() => {
                  handleLogout();
                  setOpen(false);
                }}
                className="w-full mt-3 bg-orange-100 text-orange-700 py-2 rounded-full"
              >
                Cerrar sesión
              </button>
            )}
          </motion.div>
        )}
      </header>

      {/* ================= MAIN ================= */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {children}
        </motion.div>
      </main>

      {/* ================= FOOTER ================= */}
      <footer className="bg-white border-t border-orange-200 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="font-semibold text-orange-700">
            🌱 Sembrando Conocimientos © {new Date().getFullYear()}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Educación con cariño, diseño y propósito ✨
          </p>
        </div>
      </footer>
    </div>
  );
}
