import React, { useState } from "react";
import cursos from "../data/cursos.json";

export default function Catalogo() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Todas");
  const [selected, setSelected] = useState(null);

  const categories = ["Todas", ...Array.from(new Set(cursos.map((c) => c.category)))];

  const filtered = cursos.filter((c) => {
    const matchesQuery = (c.title + " " + c.description).toLowerCase().includes(query.toLowerCase());
    const matchesCategory = category === "Todas" ? true : c.category === category;
    return matchesQuery && matchesCategory;
  });

  return (
      <main className="min-h-screen p-6 bg-orange-50">
        <h1 className="text-3xl font-bold text-orange-700 mb-6">📚 Catálogo de Cursos</h1>

        {/* Filtros */}
        <div className="flex flex-col md:flex-row gap-3 mb-6 items-center">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar curso..."
            className="flex-1 border rounded px-3 py-2"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border rounded px-3 py-2"
          >
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Cursos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((c) => (
            <article key={c.id} className="bg-white p-4 rounded-xl shadow-md">
              <img src={c.image} alt={c.title} className="w-full h-40 object-cover rounded mb-3" />
              <h2 className="font-semibold text-lg">{c.title}</h2>
              <p className="text-sm text-gray-500">{c.category} • {c.price === 0 ? "Gratuito" : `$${c.price}`}</p>
              <p className="text-gray-700 mt-2 truncate">{c.description}</p>
              <div className="mt-3 flex justify-between">
                <button
                  onClick={() => setSelected(c)}
                  className="px-3 py-1 border rounded text-sm"
                >
                  Ver
                </button>
                <button
                  onClick={() => alert(`Inscribiste/compraste '${c.title}'`)}
                  className="px-3 py-1 bg-blue-600 text-white rounded text-sm"
                >
                  {c.price === 0 ? "Inscribirme" : "Comprar"}
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Modal */}
        {selected && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 bg-black/40 flex items-center justify-center p-4"
            onClick={() => setSelected(null)}
          >
            <div
              className="bg-white p-4 rounded max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-bold">{selected.title}</h3>
                  <p className="text-sm text-gray-500">{selected.category} • {selected.price === 0 ? "Gratuito" : `$${selected.price}`}</p>
                </div>
                <button onClick={() => setSelected(null)} aria-label="Cerrar">✕</button>
              </div>
              <img src={selected.image} alt={selected.title} className="w-full h-40 object-cover rounded my-3" />
              <p className="text-gray-700">{selected.description}</p>
              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => { alert(`Inscribiste/compraste '${selected.title}'`); setSelected(null); }}
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  Inscribirme / Comprar
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
  );
}