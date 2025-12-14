import React, { useState } from "react";
import equipo from "../data/Nosotras.json";
import { motion } from "framer-motion";

/* =====================
   🌸 Nosotras
===================== */
export default function Nosotras() {
  const [activa, setActiva] = useState(null);

  return (
    <main className="bg-orange-50 min-h-screen pb-24">
      {/* Título */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center pt-14 pb-6 px-6"
      >
        <h1 className="text-4xl font-bold text-orange-700 drop-shadow-sm">
          🌸 Nuestro Equipo 🌸
        </h1>
        <p className="text-gray-700 mt-3 text-lg max-w-2xl mx-auto">
          Tres chicas construyendo un proyecto educativo con propósito, empatía y ganas de cambiar el aprendizaje.
        </p>
      </motion.header>

      {/* Cards */}
      <section className="max-w-6xl mx-auto px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {equipo.map((miembro, index) => (
            <motion.article
              key={miembro.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
              whileHover={{ y: -6 }}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all border border-orange-200 overflow-hidden"
            >
              {/* Imagen */}
              <div className="h-64 overflow-hidden">
                <img
                  src={miembro.imagen}
                  alt={miembro.nombre}
                  loading="lazy"
                  className="w-full h-full object-cover hover:scale-105 transition"
                />
              </div>

              {/* Info */}
              <div className="p-6 text-center">
                <h2 className="text-2xl font-bold text-orange-700">
                  {miembro.nombre}
                </h2>

                <p className="text-sm text-gray-600 mt-1">
                  {miembro.edad} años
                </p>

                <p className="text-orange-600 font-medium mt-3">
                  {miembro.rol}
                </p>

                {activa === miembro.id && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-3 bg-orange-50 rounded-xl p-3 text-sm text-gray-700"
                  >
                    {miembro.descripcionRol}
                  </motion.div>
                )}
              </div>
            </motion.article>
          ))}
        </div>

        {/* Bloque final */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-md mt-20 p-10 text-center max-w-3xl mx-auto border border-orange-200"
        >
          <h3 className="text-3xl font-semibold text-orange-700 mb-4">
            🌱 Sembrando Conocimientos
          </h3>

          <p className="text-gray-700 text-lg mb-4">
            Un proyecto creado desde la colaboración, el compromiso y las ganas de hacer del aprendizaje
            una experiencia cercana y significativa.
          </p>

          <p className="font-semibold text-orange-700 text-lg">
            Gracias por ser parte de este camino 🧡
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-6 bg-orange-500 text-white px-6 py-3 rounded-full hover:bg-orange-600 transition shadow-md"
          >
            ✨ Bienvenidas/os ✨
          </motion.button>
        </motion.div>
      </section>
    </main>
  );
}
