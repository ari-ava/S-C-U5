import React, { useState, useMemo } from "react";
import cursos from "../data/cursos.json";

/* 🎉 CONFETI SUAVE */
function lanzarConfeti() {
  const colors = ["#FFB703", "#FB8500", "#FFD166", "#F77F00"];
  const canvas = document.createElement("canvas");
  canvas.style.position = "fixed";
  canvas.style.inset = 0;
  canvas.style.pointerEvents = "none";
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  document.body.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  const pieces = Array.from({ length: 40 }).map(() => ({
    x: Math.random() * canvas.width,
    y: -20,
    size: 6 + Math.random() * 6,
    speedY: 2 + Math.random() * 3,
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
  }, 2000);
}

export default function Catalogo() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Todas");
  const [selected, setSelected] = useState(null);
  const [confirmacion, setConfirmacion] = useState(null);

  const [inscritos, setInscritos] = useState([]);

  const [certificadoCurso, setCertificadoCurso] = useState(null);
  const [tipoCertificado, setTipoCertificado] = useState("");

  const categories = useMemo(
    () => ["Todas", ...new Set(cursos.map((c) => c.category))],
    []
  );

  const filtered = useMemo(() => {
    return cursos.filter((c) => {
      const text = (c.title + c.description).toLowerCase();
      return (
        text.includes(query.toLowerCase()) &&
        (category === "Todas" || c.category === category)
      );
    });
  }, [query, category]);

  return (
    <main className="min-h-screen p-6 bg-orange-50">
      {/* TÍTULO */}
      <h1 className="text-3xl font-bold text-orange-700 mb-6">
        📚 Catálogo de Cursos
      </h1>

      {/* FILTROS */}
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

      {/* CURSOS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((c) => {
          const yaInscrito = inscritos.includes(c.id);

          return (
            <article
              key={c.id}
              className="bg-white p-4 rounded-2xl shadow hover:shadow-xl transition"
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
                  disabled={yaInscrito}
                  onClick={() => {
                    lanzarConfeti();
                    setInscritos([...inscritos, c.id]);
                    setConfirmacion(c);
                  }}
                  className={`px-4 py-1.5 rounded-lg transition
                    ${
                      yaInscrito
                        ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                        : "bg-orange-500 text-white hover:bg-orange-600"
                    }`}
                >
                  {yaInscrito
                    ? "Inscrito ✔"
                    : c.price === 0
                    ? "Inscribirme"
                    : "Comprar"}
                </button>
              </div>
            </article>
          );
        })}
      </div>

      {/* CONFIRMACIÓN */}
      {confirmacion && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full text-center">
            <div className="text-5xl mb-3">🎉</div>
            <h3 className="text-xl font-bold text-orange-700 mb-2">
              ¡Inscripción exitosa!
            </h3>
            <p className="text-gray-700 mb-4">
              Ahora formas parte de:
              <br />
              <strong>{confirmacion.title}</strong>
            </p>
            <button
              onClick={() => setConfirmacion(null)}
              className="bg-orange-500 text-white px-6 py-2 rounded-full"
            >
              Continuar ✨
            </button>
          </div>
        </div>
      )}

      {/* 🎓 CERTIFICADOS */}
      <section className="mt-20">
        <h2 className="text-3xl font-bold text-orange-700 mb-4">
          🎓 Certificados
        </h2>

        <p className="text-gray-600 mb-6 max-w-2xl">
          Al finalizar un curso, podrás elegir el tipo de certificado que deseas.
          Solo los cursos completados aparecen aquí.
        </p>

        {inscritos.length === 0 && (
          <p className="text-gray-500 italic">
            Aún no tienes cursos inscritos.
          </p>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cursos
            .filter((c) => inscritos.includes(c.id))
            .map((c) => (
              <div
                key={c.id}
                className="bg-white rounded-2xl p-5 shadow"
              >
                <h3 className="font-semibold text-lg mb-2">{c.title}</h3>
                <p className="text-sm text-gray-500 mb-4">
                  Curso finalizado ✔
                </p>

                <button
                  onClick={() => setCertificadoCurso(c)}
                  className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600"
                >
                  Obtener certificado
                </button>
              </div>
            ))}
        </div>
      </section>

      {/* MODAL CERTIFICADO */}
      {certificadoCurso && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-orange-700 mb-3">
              Certificado – {certificadoCurso.title}
            </h3>

            <select
              value={tipoCertificado}
              onChange={(e) => setTipoCertificado(e.target.value)}
              className="w-full border rounded-lg p-2 mb-4"
            >
              <option value="">Selecciona tipo</option>
              <option>Certificado Básico</option>
              <option>Certificado Intermedio</option>
              <option>Certificado Premium</option>
            </select>

            {/* VISTA PREVIA */}
            {tipoCertificado && (
              <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mb-4">
                <p className="text-xs text-gray-500 mb-2">
                  Vista previa
                </p>
                <div className="bg-white rounded-lg p-4 text-center shadow">
                  <h4 className="font-bold text-orange-700">
                    Certificado de Finalización
                  </h4>
                  <p className="text-sm text-gray-600 mt-2">
                    Se certifica que
                  </p>
                  <p className="font-semibold mt-1">
                    Nombre del Estudiante
                  </p>
                  <p className="text-sm mt-2">
                    completó el curso
                  </p>
                  <p className="font-semibold text-orange-700 mt-1">
                    {certificadoCurso.title}
                  </p>
                  <p className="text-xs text-gray-500 mt-3">
                    {tipoCertificado} • {new Date().toLocaleDateString()}
                  </p>
                </div>
              </div>
            )}

            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setCertificadoCurso(null);
                  setTipoCertificado("");
                }}
                className="px-4 py-2 rounded-lg border"
              >
                Cancelar
              </button>

              <button
                disabled={!tipoCertificado}
                onClick={() => {
                  lanzarConfeti();
                  setCertificadoCurso(null);
                  setTipoCertificado("");
                }}
                className="bg-orange-500 text-white px-5 py-2 rounded-lg disabled:opacity-40"
              >
                Confirmar ✨
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
