import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);

      const ref = doc(db, "usuarios", user.uid);
      const snap = await getDoc(ref);

      if (!snap.exists()) {
        throw new Error("Usuario no encontrado");
      }

      const data = snap.data();

      // 🔀 Redirección por rol
      if (data.rol === "profesor") {
        navigate("/crear-curso");
      } else {
        navigate("/mis-cursos");
      }

    } catch (err) {
      console.error(err);
      setError("Correo o contraseña incorrectos");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-100 via-orange-50 to-white px-6">
      
      <motion.form
        onSubmit={handleLogin}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 backdrop-blur-lg border border-orange-200 shadow-xl rounded-2xl p-8 w-full max-w-md"
      >
        {/* LOGO */}
        <div className="text-center mb-6">
          <div className="text-4xl">🌱</div>
          <h2 className="text-2xl font-extrabold text-orange-700 mt-2">
            Bienvenida/o
          </h2>
          <p className="text-gray-600 text-sm">
            Inicia sesión para continuar aprendiendo
          </p>
        </div>

        {/* EMAIL */}
        <div className="mb-4">
          <label className="text-sm font-medium text-orange-700">
            Correo electrónico
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ejemplo@correo.com"
            required
            className="mt-1 w-full rounded-xl border border-orange-300 px-4 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
          />
        </div>

        {/* PASSWORD */}
        <div className="mb-4">
          <label className="text-sm font-medium text-orange-700">
            Contraseña
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            className="mt-1 w-full rounded-xl border border-orange-300 px-4 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
          />
        </div>

        {/* ERROR */}
        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm text-red-500 mb-3"
          >
            {error}
          </motion.p>
        )}

        {/* BOTÓN */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded-full font-semibold transition
            ${loading
              ? "bg-orange-300 cursor-not-allowed"
              : "bg-orange-500 hover:bg-orange-600 text-white"
            }`}
        >
          {loading ? "Ingresando..." : "Iniciar sesión"}
        </button>

        {/* FOOTER */}
        <p className="mt-5 text-center text-sm text-gray-600">
          ¿No tienes cuenta?{" "}
          <Link
            to="/register"
            className="text-orange-600 font-semibold hover:underline"
          >
            Regístrate aquí
          </Link>
        </p>
      </motion.form>
    </div>
  );
}
