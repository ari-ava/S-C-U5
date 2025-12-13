import React from "react";
import equipo from "../data/Nosotras.json";
import { motion } from "framer-motion";


const Nosotras = () => {
  return (
      <div className="bg-orange-50 min-h-screen pb-20">

        {/* Título */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center pt-12 pb-4"
        >
          <h1 className="text-4xl font-bold text-orange-700 drop-shadow-sm">
            🌸 Nuestro Equipo 🌸
          </h1>
          <p className="text-gray-700 mt-3 text-lg max-w-2xl mx-auto">
            Somos tres chicas creando una plataforma educativa accesible, humana y llena de oportunidades.
          </p>
        </motion.div>

        {/* Cards del equipo */}
        <section className="container mx-auto px-6 py-10">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {equipo.map((miembro, index) => (
              <motion.div
                key={miembro.id}
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: index * 0.15 }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all p-5 flex flex-col border border-orange-200"
              >
                {/* Imagen */}
                <div className="w-full h-64 rounded-xl overflow-hidden">
                  <img
                    src={miembro.imagen}
                    alt={miembro.nombre}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Info */}
                <div className="text-center mt-5 flex flex-col gap-3 flex-1">
                  <h2 className="text-2xl font-bold text-orange-700">
                    {miembro.nombre}
                  </h2>

                  <p className="text-gray-600 text-sm italic">
                    "{miembro.frase}"
                  </p>

                  <p className="text-gray-700 text-sm">
                    <strong>Edad:</strong> {miembro.edad}
                  </p>

                  <p className="text-gray-700 text-sm leading-relaxed">
                    <strong>Sueño:</strong> {miembro.sueño}
                  </p>

                  <p className="text-gray-700 text-sm leading-relaxed">
                    <strong>Personalidad:</strong> {miembro.personalidad}
                  </p>

                  <p className="text-gray-700 text-sm leading-relaxed">
                    <strong>Visión en Sembrando Conocimientos:</strong> {miembro.visionFuturo}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bloque bonito */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl shadow-md mt-16 p-10 text-center max-w-3xl mx-auto border border-orange-200"
          >
            <h3 className="text-3xl font-semibold text-orange-700 mb-4">
              🌱 Sembrando Conocimientos 🌱
            </h3>

            <p className="text-gray-700 text-lg mb-3">
              Un proyecto hecho con cariño para estudiantes que buscan aprender de manera accesible,
              cercana y acompañada. Aquí, cada recurso nace desde nuestras experiencias,
              nuestro esfuerzo y nuestros sueños.
            </p>

            <p className="font-semibold text-orange-700 text-lg">
              ¡Gracias por acompañarnos en este camino educativo! 🧡📚
            </p>

            <button className="mt-5 bg-orange-500 text-white px-6 py-3 rounded-full hover:bg-orange-600 transition shadow-md">
              ✨ Bienvenidas/os ✨
            </button>
          </motion.div>
        </section>
      </div>
  );
};

export default Nosotras;