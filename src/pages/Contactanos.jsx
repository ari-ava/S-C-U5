import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {motion} from "framer-motion";

const Contactanos = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    mensaje: "",
  });

  const [errores, setErrores] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [mensajes, setMensajes] = useState([]);

  useEffect(() => {
    fetch("/data/mensajes.json")
      .then((res) => res.json())
      .then((data) => setMensajes(data))
      .catch((err) => console.error("Error al cargar mensajes:", err));
  }, []);

  const validarFormulario = () => {
    let erroresTemp = {};

    if (!formData.nombre.trim()) erroresTemp.nombre = "El nombre es obligatorio";

    if (!formData.email.trim()) {
      erroresTemp.email = "El correo es obligatorio";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      erroresTemp.email = "El correo no es válido";
    }

    if (!formData.mensaje.trim())
      erroresTemp.mensaje = "Por favor, escribe tu mensaje";

    setErrores(erroresTemp);
    return Object.keys(erroresTemp).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validarFormulario()) {
      setSuccessMessage("🌿 ¡Gracias por contactarte! Te responderemos pronto.");
      setFormData({ nombre: "", email: "", mensaje: "" });
      setErrores({});
    } else {
      setSuccessMessage("");
    }
  };

  return (

      <main className="min-h-screen from-orange-100 to-orange-50 flex flex-col items-center py-12 px-6">

        {/* ENCABEZADO */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <img
            src="/assets/img/logo.png"
            alt="Logo Sembrando Conocimientos"
            className="w-24 h-24 mx-auto mb-4 rounded-full shadow-lg border-4 border-orange-300"
          />

          <h1 className="text-4xl font-bold text-orange-700 drop-shadow-sm">
            ¡Contáctanos! 🌱
          </h1>
          <p className="text-gray-700 mt-2 text-lg">
            Estamos aquí para ayudarte en tu camino de aprendizaje.
          </p>
        </motion.header>

        {/* FORMULARIO */}
        <motion.form
          onSubmit={handleSubmit}
          noValidate
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="backdrop-blur-lg bg-white/60 shadow-xl rounded-2xl p-8 w-full max-w-lg border border-orange-300/40"
        >
          {/* Nombre */}
          <div className="mb-5">
            <label className="block text-orange-800 font-semibold mb-1">
              Nombre:
            </label>
            <input
              type="text"
              value={formData.nombre}
              onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
              className="w-full border border-orange-300 rounded-lg p-2 focus:ring-2 focus:ring-orange-400"
              placeholder="Tu nombre completo"
            />
            {errores.nombre && <p className="text-red-500 text-sm">{errores.nombre}</p>}
          </div>

          {/* Email */}
          <div className="mb-5">
            <label className="block text-orange-800 font-semibold mb-1">
              Correo electrónico:
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full border border-orange-300 rounded-lg p-2 focus:ring-2 focus:ring-orange-400"
              placeholder="ejemplo@correo.com"
            />
            {errores.email && <p className="text-red-500 text-sm">{errores.email}</p>}
          </div>

          {/* Mensaje */}
          <div className="mb-5">
            <label className="block text-orange-800 font-semibold mb-1">
              Mensaje:
            </label>
            <textarea
              rows="4"
              value={formData.mensaje}
              onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
              className="w-full border border-orange-300 rounded-lg p-2 focus:ring-2 focus:ring-orange-400"
              placeholder="Escribe tu mensaje aquí..."
            ></textarea>
            {errores.mensaje && <p className="text-red-500 text-sm">{errores.mensaje}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-lg shadow-md transition"
          >
            Enviar
          </button>

          {successMessage && (
            <p className="text-green-600 mt-4 text-center font-medium">
              {successMessage}
            </p>
          )}
        </motion.form>

        {/* Lista de mensajes */}
        <section className="mt-12 w-full max-w-lg">
          <h2 className="text-2xl font-bold text-orange-700 text-center mb-4">
            📬 Mensajes Recibidos
          </h2>

          <div className="space-y-4">
            {mensajes.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-white shadow-md p-4 rounded-xl border border-orange-200"
              >
                <p className="font-semibold text-orange-800">{msg.nombre}</p>
                <p className="text-gray-700 text-sm">{msg.email}</p>
                <p className="italic text-gray-600 mt-1">{msg.mensaje}</p>
                <p className="text-xs text-gray-400 mt-2">
                  {new Date(msg.fecha).toLocaleString()}
                </p>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
  );
};

export default Contactanos;