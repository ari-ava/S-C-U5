import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { auth, db } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

export default function Layout({ children }) {
  const [open, setOpen] = useState(false);
  const [usuario, setUsuario] = useState(null);

  // Detectar usuario logueado
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(db, "usuarios", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUsuario({ uid: user.uid, ...docSnap.data() });
        } else {
          setUsuario({ uid: user.uid, nombre: "Usuario", rol: "desconocido" });
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

  return (
    <div className="min-h-screen flex flex-col bg-orange-50">

      {/* HEADER */}
      <header className="bg-white shadow-md border-b border-orange-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

          {/* LOGO */}
          {!usuario && (
            <Link to="/" className="text-2xl font-bold text-orange-700">
              Sembrando Conocimientos
            </Link>
          )}

          {/* NAV DESKTOP */}
          <nav className="hidden md:flex gap-8 text-gray-700 font-medium">
            <Link to="/" className="hover:text-orange-600 transition">Inicio</Link>
            <Link to="/nosotras" className="hover:text-orange-600 transition">Nosotras</Link>
            <Link to="/mision-vision" className="hover:text-orange-600 transition">Misión y Visión</Link>
            <Link to="/contactanos" className="hover:text-orange-600 transition">Contáctanos</Link>
            <Link to="/testimonios" className="hover:text-orange-600 transition">Testimonios</Link>
            <Link to="/foro" className="hover:text-orange-600 transition">Foro</Link>
            <Link to="/catalogo" className="hover:text-orange-600 transition">Catalogo</Link>
          </nav>

          {/* LOGIN O PERFIL */}
          {!usuario ? (
            <Link
              to="/login"
              className="hidden md:block bg-orange-500 text-white px-4 py-2 rounded-lg shadow hover:bg-orange-600 transition"
            >
              Iniciar sesión
            </Link>
          ) : (
            <div className="hidden md:flex items-center gap-3">
              <span className="text-orange-700 font-semibold">
                {usuario.nombre} ({usuario.rol})
              </span>
              <img
                src="/assets/img/avatar.png"
                alt="Avatar"
                className="h-10 w-10 rounded-full border-2 border-orange-400"
              />
              <button
                onClick={handleLogout}
                className="bg-orange-500 text-white px-3 py-1 rounded hover:bg-orange-600"
              >
                Cerrar sesión
              </button>
            </div>
          )}

          {/* MOBILE MENU BUTTON */}
          <button
            className="md:hidden text-orange-700"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* MOBILE DROPDOWN MENU */}
        {open && (
          <div className="md:hidden bg-white border-t border-orange-200 px-6 py-4 space-y-4 text-gray-700 font-medium">
            <Link to="/" onClick={() => setOpen(false)} className="block">Inicio</Link>
            <Link to="/nosotras" onClick={() => setOpen(false)} className="block">Nosotras</Link>
            <Link to="/mision-vision" onClick={() => setOpen(false)} className="block">Misión y Visión</Link>
            <Link to="/testimonios" onClick={() => setOpen(false)} className="block">Testimonios</Link>
            <Link to="/foro" onClick={() => setOpen(false)} className="block">Foro</Link>
            <Link to="/catalogo" className="hover:text-orange-600 transition">Catalogo</Link>
            <Link to="/contactanos" onClick={() => setOpen(false)} className="block">Contáctanos</Link>

            {!usuario ? (
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="block bg-orange-500 text-white text-center py-2 rounded-lg shadow mt-2"
              >
                Iniciar sesión
              </Link>
            ) : (
              <div className="flex items-center gap-2 mt-2">
                <span className="text-orange-700 font-semibold">{usuario.nombre}</span>
                <button
                  onClick={() => { handleLogout(); setOpen(false); }}
                  className="bg-orange-500 text-white px-3 py-1 rounded hover:bg-orange-600"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-10">
        <motion.div 
          initial={{ opacity: 0, y: 10 }} 
          animate={{ opacity: 1, y: 0 }}
        >
          {children}
        </motion.div>
      </main>

      {/* FOOTER */}
      <footer className="bg-white border-t border-orange-200 py-6">
        <div className="max-w-7xl mx-auto px-6 text-center text-gray-600">
          <p className="font-semibold text-orange-700 mb-1">
            Sembrando Conocimientos © {new Date().getFullYear()}
          </p>
          <p className="text-sm">Hecho con dedicación y creatividad ✨</p>
        </div>
      </footer>
    </div>
  );
}