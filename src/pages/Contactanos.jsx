import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Contactanos() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    mensaje: "",
  });

  const [errores, setErrores] = useState({});
  const [toast, setToast] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [mensajes, setMensajes] = useState([]);

  /* 📬 Mensajes mock */
  useEffect(() => {
    fetch("/data/mensajes.json")
      .then((res) => res.json())
      .then((data) => setMensajes(data))
      .catch(() => setMensajes([]));
  }, []);

  /* ✅ Validación */
  const validarCampo = (name, value) => {
    let error = "";

    if (name === "nombre" && !value.trim()) {
      error = "El nombre es obligatorio";
    }

    if (name === "email") {
      if (!value.trim()) error = "El correo es obligatorio";
      else if (!/\S+@\S+\.\S+/.test(value))
        error = "Correo no válido";
    }

    if (name === "mensaje" && !value.trim()) {
      error = "Escribe tu mensaje";
    }

    setErrores((prev) => ({ ...prev, [name]: error }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validarCampo(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    Object.entries(formData).forEach(([k, v]) =>
      validarCampo(k, v)
    );

    const hayErrores = Object.values(errores).some(Boolean);
    if (hayErrores) return;

    setEnviando(true);

    setTimeout(() => {
      setToast(true);
      setEnviando(false);
      setFormData({ nombre: "", email: "", mensaje: "" });

      setTimeout(() => setToast(false), 3500);
    }, 1200);
  };

  return (
    <main className="min-h-screen bg-orange-50 flex flex-col items-center py-16 px-6">

      {/* 🌱 HEADER */}
      <motion.header
        initial={{ opacity: 0, y: -25 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <img
          src="/assets/img/logo.png"
          alt="Sembrando Conocimientos"
          className="w-24 h-24 mx-auto mb-4 rounded-full border-4 border-orange-300 shadow-lg"
        />
        <h1 className="text-4xl font-bold text-orange-700">
          Contáctanos 🌿
        </h1>
        <p className="text-gray-600 mt-2 max-w-xl mx-auto">
          Estamos aquí para escucharte y acompañarte en tu aprendizaje.
        </p>
      </motion.header>

      {/* 📝 FORM */}
      <motion.form
        onSubmit={handleSubmit}
        className="bg-white/70 backdrop-blur-md border border-orange-200 shadow-xl rounded-2xl p-8 w-full max-w-lg"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        {["nombre", "email"].map((campo) => (
          <div key={campo} className="mb-5">
            <label className="block font-semibold text-orange-800 mb-1 capitalize">
              {campo}
            </label>
            <input
              type={campo === "email" ? "email" : "text"}
              name={campo}
              value={formData[campo]}
              onChange={handleChange}
              className={`w-full p-2 rounded-lg border transition focus:ring-2
                ${
                  errores[campo]
                    ? "border-red-400 focus:ring-red-300"
                    : "border-orange-300 focus:ring-orange-400"
                }`}
              placeholder={`Tu ${campo}`}
            />
            {errores[campo] && (
              <p className="text-red-500 text-sm mt-1">
                {errores[campo]}
              </p>
            )}
          </div>
        ))}

        {/* MENSAJE */}
        <div className="mb-6">
          <label className="block font-semibold text-orange-800 mb-1">
            Mensaje
          </label>
          <textarea
            rows="4"
            name="mensaje"
            value={formData.mensaje}
            onChange={handleChange}
            className={`w-full p-2 rounded-lg border transition focus:ring-2
              ${
                errores.mensaje
                  ? "border-red-400 focus:ring-red-300"
                  : "border-orange-300 focus:ring-orange-400"
              }`}
            placeholder="Escribe tu mensaje con confianza 💛"
          />
          {errores.mensaje && (
            <p className="text-red-500 text-sm mt-1">
              {errores.mensaje}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={enviando}
          className={`w-full py-2 rounded-lg font-semibold text-white transition
            ${
              enviando
                ? "bg-orange-300 cursor-not-allowed"
                : "bg-orange-500 hover:bg-orange-600 shadow-md"
            }`}
        >
          {enviando ? "Enviando..." : "Enviar mensaje ✨"}
        </button>
      </motion.form>

      {/* 🔔 TOAST */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="fixed top-6 right-6 bg-white border border-orange-200 shadow-xl rounded-xl px-6 py-4 z-50"
          >
            <p className="font-semibold text-orange-700">
              🌱 ¡Mensaje enviado!
            </p>
            <p className="text-sm text-gray-600">
              Te responderemos muy pronto
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 📬 MENSAJES */}
      <section className="mt-16 w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-orange-700 text-center mb-6">
          Mensajes recibidos 💬
        </h2>

        <div className="space-y-4">
          {mensajes.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-5 rounded-xl shadow border border-orange-200"
            >
              <div className="flex justify-between items-center mb-1">
                <p className="font-semibold text-orange-800">
                  {msg.nombre}
                </p>
                <span className="text-xs text-gray-400">
                  {new Date(msg.fecha).toLocaleDateString()}
                </span>
              </div>
              <p className="text-sm text-gray-600">{msg.email}</p>
              <p className="mt-2 text-gray-700 italic">
                “{msg.mensaje}”
              </p>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
