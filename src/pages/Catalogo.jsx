import React, { useState, useMemo } from "react";
import cursos from "../data/cursos.json";

/* 🎉 CONFETI */
function lanzarConfeti() {
  const colors = ["#FFB703", "#FB8500", "#FFD166", "#F77F00", "#FFDDD2"];
  const canvas = document.createElement("canvas");
  canvas.style.position = "fixed";
  canvas.style.inset = 0;
  canvas.style.pointerEvents = "none";
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  document.body.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  const pieces = Array.from({ length: 60 }).map(() => ({
    x: Math.random() * canvas.width,
    y: -20,
    size: 6 + Math.random() * 6,
    speedY: 2 + Math.random() * 4,
    speedX: -2 + Math.random() * 4,
    color: colors[Math.floor(Math.random() * colors.length)],
  }));

  let frame;
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pieces.forEach((p) => {
      p.y += p.speedY;
      p.x += p.speedX;
      ctx.fillStyle = p.color;
      ctx.fillRect(p.x, p.y, p.size, p.size);
    });
    frame = requestAnimationFrame(draw);
  }

  draw();
  setTimeout(() => {
    cancelAnimationFrame(frame);
    document.body.removeChild(canvas);
  }, 2500);
}

export default function Catalogo() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Todas");
  const [selected, setSelected] = useState(null);
  const [confirmacion, setConfirmacion] = useState(null);

  const categories = useMemo(
    () => ["Todas", ...new Set(cursos.map((c) => c.category))],
    []
  );

  const filtered = useMemo(() => {
    return cursos.filter((c) => {
      const text = (c.title + c.description).toLowerCase();
      const matchesQuery = text.includes(query.toLowerCase());
      const matchesCategory =
        category === "Todas" || c.category === category;
      return matchesQuery && matchesCategory;
    });
  }, [query, category]);

  return (
    <main className="min-h-screen p-6 bg-orange-50">
      <h1 className="text-3xl font-bold text-orange-700 mb-6">
        📚 Catálogo de Cursos
      </h1>

      {/* Filtros */}
      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar curso..."
          className="flex-1 border rounded-xl px-4 py-2"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border rounded-xl px-4 py-2"
        >
          {categories.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* Cursos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((c) => (
          <article
            key={c.id}
            className="bg-white p-4 rounded-2xl shadow-md hover:shadow-xl transition"
          >
            <img
              src={c.image}
              alt={c.title}
              className="w-full h-40 object-cover rounded-xl mb-3"
            />

            <h2 className="font-semibold text-lg">{c.title}</h2>
            <p className="text-sm text-gray-500">
              {c.category} • {c.price === 0 ? "Gratuito" : `$${c.price}`}
            </p>

            <p className="text-gray-700 mt-2 line-clamp-3">
              {c.description}
            </p>

            <div className="mt-4 flex justify-between items-center">
              <button
                onClick={() => setSelected(c)}
                className="text-sm border px-3 py-1 rounded-lg"
              >
                Ver detalles
              </button>

              <button
                onClick={() => {
                  lanzarConfeti();
                  setConfirmacion(c);
                }}
                className="bg-orange-500 text-white px-4 py-1.5 rounded-lg hover:bg-orange-600 transition"
              >
                {c.price === 0 ? "Inscribirme" : "Comprar"}
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* Modal detalles */}
      {selected && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-40"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-white rounded-2xl p-6 max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold text-orange-700">
              {selected.title}
            </h3>
            <p className="text-sm text-gray-500 mb-2">
              {selected.category} •{" "}
              {selected.price === 0 ? "Gratuito" : `$${selected.price}`}
            </p>

            <img
              src={selected.image}
              alt={selected.title}
              className="w-full h-40 object-cover rounded-xl mb-3"
            />

            <p className="text-gray-700">{selected.description}</p>

            <div className="mt-4 text-right">
              <button
                onClick={() => {
                  lanzarConfeti();
                  setConfirmacion(selected);
                  setSelected(null);
                }}
                className="bg-orange-500 text-white px-5 py-2 rounded-full"
              >
                {selected.price === 0 ? "Inscribirme" : "Comprar"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ✅ Confirmación */}
      {confirmacion && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full text-center shadow-xl">
            <div className="text-5xl mb-3">🎉</div>

            <h3 className="text-2xl font-bold text-orange-700 mb-2">
              {confirmacion.price === 0
                ? "¡Inscripción exitosa!"
                : "¡Compra realizada!"}
            </h3>

            <p className="text-gray-700 mb-4">
              Ya formas parte del curso:
              <br />
              <strong>{confirmacion.title}</strong>
            </p>

            <button
              onClick={() => setConfirmacion(null)}
              className="bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 transition"
            >
              Continuar ✨
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
