import React, { useCallback } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

/* =====================
   🎉 Confeti optimizado
===================== */
function lanzarConfeti() {
  // Evita crear múltiples canvas si se hace spam al botón
  if (document.getElementById("confetti-canvas")) return;

  const colors = ["#FFB27A", "#FF8A65", "#FFD7C2", "#FFEED8", "#FFB3A7"];
  const count = 45;

  const canvas = document.createElement("canvas");
  canvas.id = "confetti-canvas";
  canvas.style.position = "fixed";
  canvas.style.inset = 0;
  canvas.style.pointerEvents = "none";
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  document.body.appendChild(canvas);

  const ctx = canvas.getContext("2d");

  const pieces = Array.from({ length: count }, () => ({
    x: Math.random() * canvas.width,
    y: -20 - Math.random() * 100,
    size: 6 + Math.random() * 8,
    speedY: 2 + Math.random() * 4,
    speedX: -2 + Math.random() * 4,
    rotate: Math.random() * Math.PI,
    rotateSpeed: -0.1 + Math.random() * 0.2,
    color: colors[Math.floor(Math.random() * colors.length)],
  }));

  const start = performance.now();
  let rafId;

  function draw(now) {
    const elapsed = now - start;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    pieces.forEach((p) => {
      p.x += p.speedX;
      p.y += p.speedY;
      p.rotate += p.rotateSpeed;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotate);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
      ctx.restore();
    });

    if (elapsed < 3500) {
      rafId = requestAnimationFrame(draw);
    } else {
      cancelAnimationFrame(rafId);
      canvas.remove();
    }
  }

  rafId = requestAnimationFrame(draw);
}

/* =====================
   🏠 Home
===================== */
export default function Home() {
  // useCallback evita recrear la función en cada render
  const handleConfeti = useCallback(() => {
    lanzarConfeti();
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-orange-50 to-orange-100 flex items-center">
      <div className="max-w-5xl mx-auto w-full px-6 py-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

        {/* Texto */}
        <motion.section
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-6"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-orange-700 leading-tight">
            Sembrando Conocimientos
          </h1>

          <p className="text-gray-700 text-lg max-w-md">
            Una plataforma creada con cariño por estudiantes para estudiantes:
            recursos claros, cursos gratuitos y una comunidad que acompaña tu aprendizaje.
          </p>

          <div className="flex gap-3 flex-wrap">
            <Link
              to="/foro"
              className="bg-orange-500 text-white px-5 py-3 rounded-xl shadow
                         hover:bg-orange-600 transition font-semibold"
            >
              🌱 Explorar cursos
            </Link>

            <Link
              to="/login"
              className="bg-white border border-orange-200 text-orange-700 px-5 py-3 rounded-xl
                         hover:bg-orange-50 transition font-medium"
            >
              Iniciar sesión
            </Link>

            <button
              onClick={handleConfeti}
              className="bg-amber-100 border border-orange-200 text-orange-700 px-4 py-3 rounded-xl
                         hover:bg-amber-200 transition font-medium"
              aria-label="Celebrar con confeti"
            >
              🎉 Celebrar
            </button>
          </div>
        </motion.section>

        {/* Imágenes */}
        <motion.section
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 gap-4"
        >
          {["jovenes", "niños", "libros", "creatividad"].map((img, i) => (
            <img
              key={img}
              src={`/assets/img/${img}.jpeg`}
              alt={`Ilustración educativa ${i + 1}`}
              loading="lazy"
              className="w-full h-40 object-cover rounded-2xl shadow-md
                         border border-orange-100 hover:scale-105 transition"
            />
          ))}
        </motion.section>
      </div>
    </main>
  );
}
