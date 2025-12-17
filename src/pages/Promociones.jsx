import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Promociones() {
  const slides = [
    { img: "/assets/img/1.png", alt: "Aprende con profesores" },
    { img: "/assets/img/2.png", alt: "Cursos accesibles" },
    { img: "/assets/img/creatividad.jpeg", alt: "Educación con propósito" },
    { img: "/assets/img/4.png", alt: "Certificados personalizados" },
  ];

  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-orange-100 to-white">

      {/* CARRUSEL INICIAL */}
      <section className="max-w-7xl mx-auto px-6 pt-10 pb-20">
        <div className="relative overflow-hidden rounded-3xl shadow-xl border border-orange-200 bg-white">
          <motion.div
            className="flex"
            animate={{ x: `-${slide * 100}%` }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            {slides.map((item, i) => (
              <div key={i} className="min-w-full h-64 md:h-96">
                <img
                  src={item.img}
                  alt={item.alt}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </motion.div>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setSlide(i)}
                className={`h-3 w-3 rounded-full transition ${
                  slide === i ? "bg-orange-500 scale-125" : "bg-orange-300"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block bg-orange-200 text-orange-700 text-sm px-4 py-1 rounded-full mb-4">
            🌱 EDUCACIÓN CON PROPÓSITO
          </span>

          <h1 className="text-4xl md:text-5xl font-extrabold text-orange-700 leading-tight mb-6">
            Sembrando Conocimientos <br />
            <span className="text-orange-500">ya está aquí</span>
          </h1>

          <p className="text-gray-600 text-lg mb-6 max-w-xl">
            Aprende con acompañamiento real, profesores comprometidos y
            contenidos pensados para crecer paso a paso, sin presión 💛
          </p>

          <div className="bg-white rounded-2xl p-6 shadow-md border border-orange-100 mb-8">
            <p className="text-gray-600 text-sm mb-2">✔ Cursos accesibles</p>
            <p className="text-gray-600 text-sm mb-2">✔ Interacción directa</p>
            <p className="text-gray-600 text-sm">✔ Certificados personalizados</p>
          </div>

          <Link
            to="/catalogo"
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold shadow transition inline-block"
          >
            Explorar cursos
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="rounded-3xl overflow-hidden shadow-xl border border-orange-200">
            <img
              src="/assets/img/baner.png.png"
              alt="Promociones educativas"
              className="w-full h-full object-cover"
            />
          </div>

          <span className="absolute top-4 left-4 bg-orange-500 text-white px-4 py-1 rounded-full text-sm shadow">
            ✨ NUEVO
          </span>
        </motion.div>
      </section>

      {/* BENEFICIOS */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[
            { title: "Cursos accesibles", text: "Opciones para crecer 🌱" },
            { title: "Acompañamiento real", text: "Profesores contigo 🤍" },
            { title: "Aprende a tu ritmo", text: "Sin presión ✨" },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -6 }}
              className="bg-white p-6 rounded-2xl shadow-md border border-orange-100 hover:shadow-xl transition"
            >
              <h3 className="text-lg font-semibold text-orange-700 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
