import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase"; // tu archivo firebase.js
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // Iniciar sesión con Firebase Auth
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Obtener datos del usuario desde Firestore
      const userDoc = await getDoc(doc(db, "usuarios", user.uid));
      if (!userDoc.exists()) {
        setError("No se encontró el usuario en la base de datos.");
        return;
      }

      const userData = userDoc.data();
      console.log("Usuario actual:", userData);

      // Guardar en localStorage o contexto global si quieres usarlo en toda la app
      localStorage.setItem("usuarioActual", JSON.stringify({ uid: user.uid, ...userData }));

      // Redirigir a la página principal (o foro)
      navigate("/foro");
    } catch (err) {
      console.error(err);
      setError("Email o contraseña incorrectos");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-orange-50">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-orange-600">Iniciar Sesión</h2>
        
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 p-2 border rounded focus:ring-2 focus:ring-orange-400"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 p-2 border rounded focus:ring-2 focus:ring-orange-400"
        />

        <button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-lg transition"
        >
          Iniciar Sesión
        </button>

        {error && <p className="text-red-500 mt-4">{error}</p>}

        <p className="mt-4 text-sm text-gray-600">
          ¿No tienes cuenta?{" "}
          <a href="/register" className="text-orange-600 hover:underline">Regístrate aquí</a>
        </p>
      </form>
    </div>
  );
};

export default Login;