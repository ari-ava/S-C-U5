import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import promociones from "../data/promociones.json";
const PromoCarousel = () => {
  const [promos, setPromos] = useState([]);
  const [index, setIndex] = useState(0);

  // Cargar promociones desde JSON
  useEffect(() => {
    fetch("/data/promociones.json")
      .then((res) => res.json())
      .then((data) => {
        setPromos(data.filter((p) => p.activo));
      });
  }, []);

  // Auto play
  useEffect(() => {
    if (promos.length === 0) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % promos.length);
    }, 4500);

    return () => clearInterval(interval);
  }, [promos]);

  if (promos.length === 0) return null;

  return (
    <div className="w-full max-w-5xl mx-auto mb-10 overflow-hidden rounded-2xl shadow-lg">
      <AnimatePresence mode="wait">
        <motion.div
          key={promos[index].id}
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -80 }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <img
            src={promos[index].imagen}
            alt={promos[index].titulo}
            className="w-full h-320px object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/25 flex flex-col justify-end p-6">
            <h2 className="text-2xl font-bold text-white">
              {promos[index].titulo}
            </h2>
            <p className="text-white text-sm mb-3">
              {promos[index].descripcion}
            </p>

            <button className="w-fit bg-pink-500 hover:bg-pink-600 text-white px-5 py-2 rounded-full text-sm font-semibold transition">
              {promos[index].cta}
            </button>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Indicadores */}
      <div className="flex justify-center gap-2 py-3 bg-white">
        {promos.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full transition ${
              i === index ? "bg-pink-500" : "bg-pink-200"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default PromoCarousel;
