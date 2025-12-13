import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function lanzarConfeti() {
  const colors = ["#FFB27A", "#FF8A65", "#FFD7C2", "#FFEED8", "#FFB3A7"];
  const count = 45;
  const canvas = document.createElement("canvas");
  canvas.style.position = "fixed";
  canvas.style.left = 0;
  canvas.style.top = 0;
  canvas.style.pointerEvents = "none";
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  document.body.appendChild(canvas);
  const ctx = canvas.getContext("2d");

  const pieces = Array.from({ length: count }).map(() => ({
    x: Math.random() * canvas.width,
    y: -20 - Math.random() * 100,
    size: 6 + Math.random() * 8,
    speedY: 2 + Math.random() * 4,
    speedX: -2 + Math.random() * 4,
    rotate: Math.random() * Math.PI,
    rotateSpeed: -0.1 + Math.random() * 0.2,
    color: colors[Math.floor(Math.random() * colors.length)],
  }));

  let rafId;
  const start = performance.now();
  function draw(now) {
    const t = now - start;
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
    if (t < 3500) {
      rafId = requestAnimationFrame(draw);
    } else {
      cancelAnimationFrame(rafId);
      document.body.removeChild(canvas);
    }
  }
  rafId = requestAnimationFrame(draw);
}

export default function Home() {
  return (
    <div className="from-orange-50 to-orange-100 min-h-screen flex items-center">
      <div className="max-w-5xl mx-auto w-full px-6 py-24 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

        {/* Texto */}
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col gap-6"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-orange-700 leading-tight">
            Sembrando Conocimientos
          </h1>

          <p className="text-gray-700 text-lg max-w-md">
            Una plataforma creada con cariño por estudiantes para estudiantes:
            recursos claros, cursos gratuitos y una comunidad que acompaña tu aprendizaje.
          </p>

          <div className="flex gap-3">
            <Link
              to="/foro"
              className="bg-orange-500 text-white px-5 py-3 rounded-xl shadow hover:bg-orange-600 transition font-semibold"
            >
              🌱 Explorar cursos
            </Link>

            <Link
              to="/login"
              className="bg-white border border-orange-200 text-orange-700 px-5 py-3 rounded-xl hover:bg-orange-50 transition font-medium"
            >
              Iniciar sesión
            </Link>

            <button
              onClick={lanzarConfeti}
              className="bg-amber-100 border border-orange-200 text-orange-700 px-4 py-3 rounded-xl hover:bg-amber-200 transition font-medium"
              title="Celebrar"
            >
              🎉 Celebrar
            </button>
          </div>
        </motion.div>

        {/* Imagenes */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="grid grid-cols-2 gap-4"
        >
          <img
            src="/public/assets/img/jovenes.jpeg"
            alt="Ilustración 1"
            className="w-full h-40 object-cover rounded-2xl shadow-md border border-orange-100"
          />
          <img
            src="/public/assets/img/niños.jpeg"
            alt="Ilustración 2"
            className="w-full h-40 object-cover rounded-2xl shadow-md border border-orange-100"
          />
          <img
            src="/public/assets/img/libros.jpeg"
            alt="Ilustración 3"
            className="w-full h-40 object-cover rounded-2xl shadow-md border border-orange-100"
          />
          <img
            src="/public/assets/img/creatividad.jpeg"
            alt="Ilustración 4"
            className="w-full h-40 object-cover rounded-2xl shadow-md border border-orange-100"
          />
        </motion.div>
      </div>
    </div>
  );
}