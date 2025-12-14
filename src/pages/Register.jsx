import React, { useState } from "react";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Register() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (!nombre || !email || !password) {
      setError("Completa todos los campos 🌱");
      return;
    }

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    setLoading(true);

    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);

      await setDoc(doc(db, "usuarios", user.uid), {
        nombre,
        email,
        rol: "estudiante",
        cursosAsignados: [],
        creadoEn: serverTimestamp(),
      });

      navigate("/login");
    } catch (err) {
      console.error(err);
      if (err.code === "auth/email-already-in-use") {
        setError("Este correo ya está registrado");
      } else {
        setError("Ocurrió un error al registrarse");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-100 via-orange-50 to-white px-6">

      <motion.form
        onSubmit={handleRegister}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 backdrop-blur-lg border border-orange-200 shadow-xl rounded-2xl p-8 w-full max-w-md"
      >
        {/* HEADER */}
        <div className="text-center mb-6">
          <div className="text-4xl">🌱</div>
          <h2 className="text-2xl font-extrabold text-orange-700 mt-2">
            Crear cuenta
          </h2>
          <p className="text-gray-600 text-sm">
            Empieza tu camino de aprendizaje
          </p>
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

        {/* NOMBRE */}
        <div className="mb-3">
          <label className="text-sm font-medium text-orange-700">
            Nombre completo
          </label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Tu nombre"
            className="mt-1 w-full rounded-xl border border-orange-300 px-4 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
          />
        </div>

        {/* EMAIL */}
        <div className="mb-3">
          <label className="text-sm font-medium text-orange-700">
            Correo electrónico
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="correo@ejemplo.com"
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
            placeholder="Mínimo 6 caracteres"
            className="mt-1 w-full rounded-xl border border-orange-300 px-4 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
          />
        </div>

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
          {loading ? "Creando cuenta..." : "Registrarse"}
        </button>

        {/* FOOTER */}
        <p className="mt-5 text-center text-sm text-gray-600">
          ¿Ya tienes cuenta?{" "}
          <Link
            to="/login"
            className="text-orange-600 font-semibold hover:underline"
          >
            Inicia sesión
          </Link>
        </p>
      </motion.form>
    </div>
  );
}
