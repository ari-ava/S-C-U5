import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";

export default function Promociones() {
  const [celebrate, setCelebrate] = useState(false);
  const [promos, setPromos] = useState([]);

  const carouselRef = useRef(null);
  const isHovering = useRef(false);

  useEffect(() => {
    fetch("/src/data/promociones.json")
      .then((res) => res.json())
      .then((data) => {
        setPromos(data.filter((promo) => promo.activo));
      })
      .catch((err) => console.error("Error cargando promociones:", err));
  }, []);

  // 🎠 AUTO SCROLL
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const interval = setInterval(() => {
      if (!isHovering.current) {
        carousel.scrollLeft += 1;

        if (
          carousel.scrollLeft + carousel.clientWidth >=
          carousel.scrollWidth
        ) {
          carousel.scrollLeft = 0;
        }
      }
    }, 20); // velocidad suave

    return () => clearInterval(interval);
  }, []);

  const handleCTA = () => {
    setCelebrate(true);
    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#f97316", "#fb923c", "#fed7aa"],
    });
    setTimeout(() => setCelebrate(false), 2500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-orange-100/50 to-white px-6 py-16">
      {/* ===== HERO ===== */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-3xl mx-auto mb-24"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-orange-700 mb-6">
          Promociones especiales 🌱
        </h1>

        <p className="text-lg text-gray-700 mb-10">
          Aprovecha nuestras ofertas pensadas para acompañarte en tu aprendizaje.
        </p>

        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleCTA}
          className="bg-orange-500 hover:bg-orange-600 text-white px-12 py-4 rounded-2xl shadow-xl font-semibold"
        >
          Empezar ahora ✨
        </motion.button>

        {celebrate && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 text-orange-600 font-medium"
          >
            🎉 ¡Excelente decisión! Tu camino empieza hoy 🌱
          </motion.p>
        )}
      </motion.section>

      {/* ===== CARRUSEL ===== */}
      <section
        ref={carouselRef}
        onMouseEnter={() => (isHovering.current = true)}
        onMouseLeave={() => (isHovering.current = false)}
        className="max-w-6xl mx-auto mb-28 overflow-x-auto scrollbar-hide"
      >
        <div className="flex gap-6 px-1">
          {promos.map((promo, index) => (
            <motion.div
              key={promo.id}
              whileHover={{ scale: 1.05, y: -6 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              className="min-w-[280px] max-w-[280px] bg-white rounded-3xl shadow-md border border-orange-100 overflow-hidden"
            >
              {/* Imagen */}
              <div className="h-40 w-full overflow-hidden">
                <img
                  src={promo.imagen}
                  alt={promo.titulo}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>

              {/* Contenido */}
              <div className="p-5">
                <h3 className="text-lg font-bold text-orange-700 mb-1">
                  {promo.titulo}
                </h3>

                <p className="text-sm text-gray-600 mb-4">
                  {promo.descripcion}
                </p>

                <motion.button
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCTA}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold py-2 rounded-xl shadow"
                >
                  {promo.cta}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

    {/* ===== CTA FINAL ===== */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto mt-32 text-center bg-orange-100/70 rounded-3xl p-12"
      >
        <h2 className="text-3xl font-bold text-orange-700 mb-4">
          Gracias por acompañarnos en este camino educativo! 🧡
        </h2>
        <p className="text-gray-700 mb-8">
            Un proyecto hecho con cariño para estudiantes que buscan aprender de manera accesible,
             cercana y acompañada. Aquí, cada recurso nace desde nuestras experiencias,
              nuestro esfuerzo y nuestros sueños
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleCTA}
          className="bg-orange-500 text-white px-10 py-3 rounded-2xl font-semibold shadow"
        >
          Quiero empezar 🚀
        </motion.button>
      </motion.section>
    </div>
  );
}
