import React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { BookOpen, Award, X, Clock } from "lucide-react";

export default function MisCursos() {
  const [cursoActivo, setCursoActivo] = useState(null);
  const [avisoActivo, setAvisoActivo] = useState(null);

  const cursos = [
    {
      id: 1,
      titulo: "Aprendizaje Socioemocional",
      descripcion: "Fortalece habilidades emocionales en el aula.",
      progreso: 100,
      imagen: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b",
      competencias: ["Gestión emocional", "Empatía", "Trabajo colaborativo"],
      mensajeProfesor:
        "¡Excelente trabajo! Has demostrado compromiso y reflexión profunda. Sigue aplicando lo aprendido 💛",
    },
    {
      id: 2,
      titulo: "Didáctica Digital",
      descripcion: "Estrategias educativas con tecnología.",
      progreso: 45,
      imagen: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
      fechaLimite: "2025-01-20",
      diasRestantes: 7,
    },
  ];

  const verCurso = (curso) => {
    setCursoActivo(curso);
    if (curso.progreso === 100) {
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    }
  };

  return (
    <div className="space-y-10">
      <h1 className="text-3xl font-bold text-orange-700">
        🌱 Mi perfil · Mis cursos
      </h1>

      {/* GRID PINTEREST */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
        {cursos.map((curso) => (
          <motion.article
            key={curso.id}
            whileHover={{ y: -6 }}
            className="break-inside-avoid bg-white rounded-3xl shadow-md overflow-hidden"
          >
            <img
              src={curso.imagen}
              alt={curso.titulo}
              className="h-44 w-full object-cover"
            />

            <div className="p-5 space-y-4">
              <h3 className="text-lg font-semibold text-orange-700">
                {curso.titulo}
              </h3>

              {/* Progreso */}
              <div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Progreso</span>
                  <span>{curso.progreso}%</span>
                </div>
                <div className="h-2 bg-orange-100 rounded-full">
                  <motion.div
                    animate={{ width: `${curso.progreso}%` }}
                    className="h-2 bg-orange-500 rounded-full"
                  />
                </div>
              </div>

              {/* BOTONES */}
              {curso.progreso === 100 ? (
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => verCurso(curso)}
                  className="w-full bg-orange-100 text-orange-700 py-2 rounded-full font-medium"
                >
                  Ver detalles del curso
                </motion.button>
              ) : (
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setAvisoActivo(curso)}
                  className="w-full bg-orange-500 text-white py-2 rounded-full hover:bg-orange-600"
                >
                  Continuar curso
                </motion.button>
              )}
            </div>
          </motion.article>
        ))}
      </div>

      {/* ===== MODAL CURSO COMPLETADO ===== */}
      <AnimatePresence>
        {cursoActivo && (
          <motion.div
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-3xl p-6 max-w-lg w-full relative"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
            >
              <button
                onClick={() => setCursoActivo(null)}
                className="absolute top-4 right-4 text-gray-400"
              >
                <X />
              </button>

              <h2 className="text-2xl font-bold text-orange-700 mb-3">
                {cursoActivo.titulo}
              </h2>

              <h3 className="font-semibold text-orange-600 mb-1">
                🎓 Mensaje del profesor
              </h3>
              <p className="text-gray-600 mb-4">
                {cursoActivo.mensajeProfesor}
              </p>

              <h3 className="font-semibold text-orange-600 mb-1">
                🏆 Competencias logradas
              </h3>
              <ul className="list-disc list-inside text-sm text-gray-600 mb-6">
                {cursoActivo.competencias.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>

              <button className="w-full bg-orange-500 text-white py-3 rounded-full">
                Ver certificado ✨
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== MODAL AVISO CURSO EN PROGRESO ===== */}
      <AnimatePresence>
        {avisoActivo && (
          <motion.div
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-3xl p-6 max-w-md w-full relative"
              initial={{ y: 40 }}
              animate={{ y: 0 }}
            >
              <button
                onClick={() => setAvisoActivo(null)}
                className="absolute top-4 right-4 text-gray-400"
              >
                <X />
              </button>

              <h2 className="text-xl font-bold text-orange-700 mb-3">
                ⏳ Curso en progreso
              </h2>

              <p className="text-gray-600 mb-4">
                Aún estás desarrollando este curso. Recuerda las fechas:
              </p>

              <div className="space-y-2 text-sm text-gray-700">
                <p>📅 Fecha límite: <b>{avisoActivo.fechaLimite}</b></p>
                <p>⏱ Días restantes: <b>{avisoActivo.diasRestantes}</b></p>
              </div>

              <button className="mt-6 w-full bg-orange-500 text-white py-3 rounded-full">
                Entrar al curso
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
