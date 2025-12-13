import { useState } from "react";

export default function Promociones() {
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

  return (
    <div>
      <h1 className="text-3xl font-bold text-orange-700 mb-6">
        🎯 Promociones
      </h1>

      <p className="text-gray-600 mb-8 max-w-2xl">
        Descubre nuestras ofertas y aprovecha oportunidades pensadas para ti.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {promos.map((p) => (
          <article
            key={p.id}
            className="relative bg-white rounded-xl shadow-md p-6 border border-orange-100 hover:shadow-lg transition"
          >
            {/* Badge */}
            <span className="absolute top-3 right-3 bg-orange-500 text-white text-xs px-3 py-1 rounded-full">
              {p.badge}
            </span>

            <h2 className="text-xl font-semibold text-orange-700 mb-2">
              {p.titulo}
            </h2>

            <p className="text-gray-600 mb-4">
              {p.descripcion}
            </p>

            <button
              onClick={() => alert("Promo aplicada 🎉")}
              className="mt-auto bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition"
            >
              Ver promoción
            </button>
          </article>
        ))}
      </div>
    </div>
  );
}
