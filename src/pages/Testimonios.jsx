import React, { useState } from "react";
import testimoniosData from "../data/testimonios.json";

export default function Testimonios() {
  const [categoria, setCategoria] = useState("Todos");
  const [likes, setLikes] = useState({});

  const categorias = ["Todos", "Estudiantes", "Profesores" ];

  const testimoniosFiltrados =
    categoria === "Todos"
      ? testimoniosData
      : testimoniosData.filter(t => t.tipo === categoria);

  const handleLike = (id) => {
    setLikes(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-orange-100 to-white px-6">
      {/* Introducción */}
      <section className="text-center py-10">
        <h1 className="text-2xl md:text-3xl font-bold text-orange-800">
          Opiniones de nuestros clientes
        </h1>
        <p className="text-gray-700 mt-2">
          Experiencias reales que respaldan nuestro trabajo
        </p>
      </section>

      {/* Filtros */}
      <div className="flex justify-center gap-3 mb-10 flex-wrap">
        {categorias.map(cat => (
          <button
            key={cat}
            onClick={() => setCategoria(cat)}
            className={`px-4 py-2 rounded-full text-sm transition
              ${categoria === cat
                ? "bg-orange-500 text-white"
                : "bg-white text-orange-600 hover:bg-orange-100"}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Testimonios */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto pb-14">
        {testimoniosFiltrados.map(testimonio => (
          <TestimonioCard
            key={testimonio.id}
            testimonio={testimonio}
            liked={likes[testimonio.id]}
            onLike={handleLike}
          />
        ))}
      </section>
    </main>
  );
}

function TestimonioCard({ testimonio, liked, onLike }) {
  const [expandido, setExpandido] = useState(false);
  const { id, nombre, texto, imagen, rating } = testimonio;

  return (
    <article className="bg-white rounded-2xl shadow-md p-6 text-center
      hover:shadow-xl hover:-translate-y-1 transition-all duration-300">

      <img
        src={imagen}
        alt={nombre}
        className="w-24 h-24 mx-auto rounded-full mb-4 object-cover
        border-4 border-orange-300 hover:rotate-2 transition"
      />

      <h3 className="text-lg font-semibold text-orange-700">
        {nombre}
      </h3>

      {/* Estrellas */}
      <div className="flex justify-center gap-1 mt-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <span
            key={i}
            className={i < rating ? "text-orange-400" : "text-gray-300"}
          >
            ★
          </span>
        ))}
      </div>

      {/* Texto */}
      <p className="text-gray-700 mt-3 italic">
        {expandido ? texto : texto.slice(0, 80) + "..."}
      </p>

      <button
        onClick={() => setExpandido(!expandido)}
        className="text-sm text-orange-600 mt-2 hover:underline"
      >
        {expandido ? "Leer menos" : "Leer más"}
      </button>

      {/* Like */}
      <button
        onClick={() => onLike(id)}
        className={`mt-4 text-sm flex justify-center items-center gap-1 w-full
          ${liked ? "text-orange-600" : "text-gray-400 hover:text-orange-500"}`}
      >
        👍 {liked ? "¡Gracias!" : "¿Te fue útil?"}
      </button>
    </article>
  );
}
