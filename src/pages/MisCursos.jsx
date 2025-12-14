import React from "react";
import { motion } from "framer-motion";
import { useAuth } from "../services/useAuth";

const cursosFake = [
  {
    id: 1,
    titulo: "Lectura Creativa",
    progreso: 80,
    imagen: "/assets/img/curso1.jpg",
  },
  {
    id: 2,
    titulo: "Matemática Divertida",
    progreso: 45,
    imagen: "/assets/img/curso2.jpg",
  },
];

export default function MisCursos() {
  const { usuario } = useAuth();

  return (
    <section>
      <motion.header
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >
        <h1 className="text-3xl font-extrabold text-orange-700">
          🌱 Mis Cursos
        </h1>
        <p className="text-gray-600 mt-2">
          Hola {usuario?.nombre}, continúa tu aprendizaje 💛
        </p>
      </motion.header>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cursosFake.map((curso) => (
          <motion.article
            key={curso.id}
            whileHover={{ scale: 1.03 }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden"
          >
            <img
              src={curso.imagen}
              alt={curso.titulo}
              className="h-40 w-full object-cover"
            />

            <div className="p-4">
              <h3 className="font-semibold text-lg">
                {curso.titulo}
              </h3>

              <div className="mt-3">
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>Progreso</span>
                  <span>{curso.progreso}%</span>
                </div>

                <div className="h-2 bg-orange-100 rounded-full">
                  <div
                    className="h-full bg-orange-500 rounded-full"
                    style={{ width: `${curso.progreso}%` }}
                  />
                </div>
              </div>

              <button className="mt-4 w-full bg-orange-500 text-white py-2 rounded-full hover:bg-orange-600 transition">
                Continuar
              </button>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
