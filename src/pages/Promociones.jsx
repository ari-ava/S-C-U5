import { React } from "react";
import { motion } from "framer-motion";
import { useState } from "react";
<<<<<<< HEAD
import confetti from "canvas-confetti";

const cards = [
  {
    title: "Cursos accesibles",
    text: "Aprende con cursos gratuitos y de pago, diseñados para crecer paso a paso 🌱",
    icon: "📚",
  },
  {
    title: "Acompañamiento real",
    text: "Interactúa directamente con profesores y resuelve tus dudas en el foro 💬",
    icon: "🤝",
  },
  {
    title: "Certificados personalizados",
    text: "Recibe certificados con tu nombre y celebra cada logro 🎓✨",
    icon: "🏆",
  },
  {
    title: "Comunidad educativa",
    text: "Aprender es mejor cuando no estás solo/a 🤍",
    icon: "🌍",
  },
];

export default function SembrandoConocimientosPage() {
  const [celebrate, setCelebrate] = useState(false);

  const handleCTA = () => {
    setCelebrate(true);
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.7 },
      colors: ["#fb923c", "#fdba74", "#fed7aa"],
    });
    setTimeout(() => setCelebrate(false), 2500);
  };

=======
import PromoCarousel from "../Components/PromoCarousel";

export default function Promociones() {
  <PromoCarousel />;
  const [promos] = useState([
    {
      id: 1,
      titulo: "🌱 Aprende desde casa",
      descripcion: "Accede a nuestros cursos online con 30% de descuento por tiempo limitado.",
      badge: "DESCUENTO",
    },
    {
      id: 2,
      titulo: "📚 Cursos gratuitos",
      descripcion: "Inscríbete hoy y obtén acceso gratuito a cursos introductorios.",
      badge: "GRATIS",
    },
    {
      id: 3,
      titulo: "🎓 Plan estudiante",
      descripcion: "Precios especiales para estudiantes registrados.",
      badge: "EXCLUSIVO",
    },
  ]);
>>>>>>> da4937e90d36042b02f6b4a61429649c367095c7
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-orange-100/40 to-white px-6 py-14">
      
      {/* ===== HERO ===== */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-3xl mx-auto mb-20"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-orange-700 mb-4 drop-shadow-sm">
          Sembrando Conocimientos 🌱
        </h1>

        <p className="text-lg text-gray-700 mb-8">
          Aprende hoy, crece siempre.  
          Educación cercana, humana y pensada para ti.
        </p>

        <motion.button
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleCTA}
          className="bg-orange-500 hover:bg-orange-600 text-white px-10 py-4 rounded-2xl shadow-lg font-semibold"
        >
          Empezar a aprender
        </motion.button>

        {celebrate && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-5 text-orange-600 font-medium"
          >
            ✨ ¡Excelente decisión! Tu aprendizaje acaba de comenzar 🌱
          </motion.p>
        )}
      </motion.section>

      {/* ===== GRID TIPO PINTEREST ===== */}
      <section className="max-w-6xl mx-auto columns-1 sm:columns-2 md:columns-3 gap-6 space-y-6">
        {cards.map((card, index) => (
          <motion.div
            key={index}
            whileHover={{ y: -8 }}
            transition={{ type: "spring", stiffness: 180 }}
            className="break-inside-avoid bg-white rounded-3xl p-6 shadow-md hover:shadow-xl border border-orange-100"
          >
            <div className="text-3xl mb-3">{card.icon}</div>

            <h3 className="text-xl font-semibold text-orange-700 mb-2">
              {card.title}
            </h3>

            <p className="text-gray-600 leading-relaxed">
              {card.text}
            </p>
          </motion.div>
        ))}
      </section>

      {/* ===== TESTIMONIOS ===== */}
      <section className="max-w-4xl mx-auto mt-24 text-center">
        <h2 className="text-3xl font-bold text-orange-700 mb-12">
          Lo que dicen nuestros estudiantes 🧡
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {[
            "Aquí sí me sentí acompañada, no solo aprendí, crecí 🌱",
            "Mi certificado fue lo mejor, sentí que valió la pena ✨",
          ].map((text, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.04 }}
              className="bg-orange-100/70 p-6 rounded-3xl shadow-sm"
            >
              <p className="text-gray-700 italic">“{text}”</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
