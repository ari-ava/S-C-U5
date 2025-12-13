import React, { useState } from "react";
import cursos from "../data/cursos.json";
import { useAuth } from "../services/useAuth";

export default function Catalogo() {
  const { usuario } = useAuth(); // 👈 rol aquí
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Todas");
  const [selected, setSelected] = useState(null);

  const categories = [
    "Todas",
    ...Array.from(new Set(cursos.map((c) => c.category))),
  ];

  const filtered = cursos.filter((c) => {
    const matchesQuery = (c.title + " " + c.description)
      .toLowerCase()
      .includes(query.toLowerCase());
    const matchesCategory =
      category === "Todas" ? true : c.category === category;
    return matchesQuery && matchesCategory;
  });

  return (
    <section className="min-h-screen bg-orange-50">
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-orange-700 mb-2">
          📚 Catálogo de Cursos
        </h1>
        <p className="text-gray-600">
          Aprende a tu ritmo con cursos pensados para ti ✨
        </p>
      </div>

      {/* FILTROS */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="🔍 Buscar curso..."
          className="flex-1 border border-orange-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-300"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border border-orange-200 rounded-lg px-4 py-2"
        >
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* GRID DE CURSOS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((c) => (
          <article
            key={c.id}
            className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden"
          >
            <img
              src={c.image}
              alt={c.title}
              className="w-full h-44 object-cover"
            />

            <div className="p-4 flex flex-col h-full">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full">
                  {c.category}
                </span>
                <span className="text-sm font-semibold text-gray-700">
                  {c.price === 0 ? "Gratis" : `$${c.price}`}
                </span>
              </div>

              <h2 className="font-semibold text-lg text-gray-800">
                {c.title}
              </h2>

              <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                {c.description}
              </p>

              <div className="mt-auto flex justify-between gap-2 pt-4">
                <button
                  onClick={() => setSelected(c)}
                  className="flex-1 border border-orange-300 text-orange-700 rounded-lg py-1.5 text-sm hover:bg-orange-50"
                >
                  Ver detalles
                </button>

                {usuario?.rol === "estudiante" ? (
                  <button
                    onClick={() =>
                      alert(`Te inscribiste/compraste "${c.title}"`)
                    }
                    className="flex-1 bg-orange-500 text-white rounded-lg py-1.5 text-sm hover:bg-orange-600"
                  >
                    {c.price === 0 ? "Inscribirme" : "Comprar"}
                  </button>
                ) : (
                  <button
                    disabled
                    className="flex-1 bg-gray-200 text-gray-500 rounded-lg py-1.5 text-sm cursor-not-allowed"
                  >
                    Inicia sesión
                  </button>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* MODAL */}
      {selected && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-md w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-xl font-bold text-gray-800">
                  {selected.title}
                </h3>
                <p className="text-sm text-gray-500">
                  {selected.category} •{" "}
                  {selected.price === 0 ? "Gratis" : `$${selected.price}`}
                </p>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="text-gray-500 hover:text-gray-800"
              >
                ✕
              </button>
            </div>

            <img
              src={selected.image}
              alt={selected.title}
              className="w-full h-44 object-cover rounded-xl my-3"
            />

            <p className="text-gray-700 text-sm">{selected.description}</p>

            <div className="mt-6 flex justify-end">
              {usuario?.rol === "estudiante" ? (
                <button
                  onClick={() => {
                    alert(
                      `Te inscribiste/compraste "${selected.title}"`
                    );
                    setSelected(null);
                  }}
                  className="bg-orange-500 text-white px-5 py-2 rounded-lg hover:bg-orange-600"
                >
                  {selected.price === 0
                    ? "Inscribirme"
                    : "Comprar curso"}
                </button>
              ) : (
                <p className="text-sm text-gray-500">
                  Inicia sesión para inscribirte 👀
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
