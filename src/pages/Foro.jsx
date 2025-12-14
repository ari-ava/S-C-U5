import React, { useEffect, useState } from "react";
import materias from "../data/materiales.json";
import { db, auth } from "../firebase";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export default function Foro() {
  const [usuario, setUsuario] = useState(null);
  const [posts, setPosts] = useState([]);
  const [texto, setTexto] = useState("");
  const [materia, setMateria] = useState("");

  /* Usuario */
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUsuario(u));
    return () => unsub();
  }, []);

  /* Mensajes */
  useEffect(() => {
    const q = query(collection(db, "foroposts"), orderBy("fecha", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      setPosts(
        snap.docs.map((d) => ({
          id: d.id,
          ...d.data(),
          respuestas: d.data().respuestas || [],
        }))
      );
    });
    return () => unsub();
  }, []);

  const publicar = async () => {
    if (!usuario || !texto.trim() || !materia) return;

    await addDoc(collection(db, "foroposts"), {
      texto,
      materia,
      autor: usuario.displayName || usuario.email,
      autorId: usuario.uid,
      fecha: new Date(),
      respuestas: [],
    });

    setTexto("");
    setMateria("");
  };

  const responder = async (id, respuesta) => {
    if (!usuario || !respuesta.trim()) return;
    const ref = doc(db, "foroposts", id);
    const actual = posts.find((p) => p.id === id);

    await updateDoc(ref, {
      respuestas: [
        ...actual.respuestas,
        {
          texto: respuesta,
          autor: usuario.displayName || usuario.email,
          fecha: new Date(),
        },
      ],
    });
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-orange-50 to-white p-6">

      {/* HEADER */}
      <header className="max-w-5xl mx-auto text-center mb-16">
        <h1 className="text-5xl font-extrabold text-orange-600 mb-4">
          Foro Académico
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Un espacio para aprender, preguntar y ayudar con respeto 🤍
        </p>
      </header>

      {/* REGLAS */}
      <section className="max-w-4xl mx-auto bg-orange-100/60 border border-orange-200 rounded-3xl p-6 mb-14">
        <h2 className="font-bold text-orange-700 mb-3 text-lg">
          📜 Reglas del foro
        </h2>
        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
          <li>Sé respetuoso con todos los participantes</li>
          <li>Mantén tus preguntas relacionadas a la materia</li>
          <li>No spam, no insultos, no desinformación</li>
          <li>Ayudar también es aprender ✨</li>
        </ul>
      </section>

      {/* NUEVO POST */}
      <section className="max-w-4xl mx-auto bg-white rounded-3xl shadow-md p-6 mb-16">
        <h3 className="text-xl font-bold text-orange-600 mb-4">
          ✍️ Crear una pregunta
        </h3>

        <div className="flex flex-col gap-4">
          <textarea
            placeholder={
              usuario
                ? "Escribe tu duda o aporte aquí..."
                : "Inicia sesión para participar"
            }
            disabled={!usuario}
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            className="border rounded-2xl p-4 min-h-[100px] resize-none focus:outline-orange-400 disabled:bg-gray-100"
          />

          <div className="flex flex-col sm:flex-row gap-3">
            <select
              disabled={!usuario}
              value={materia}
              onChange={(e) => setMateria(e.target.value)}
              className="border rounded-xl px-4 py-2 disabled:bg-gray-100"
            >
              <option value="">Selecciona materia</option>
              {materias.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>

            <button
              onClick={publicar}
              disabled={!usuario}
              className="bg-orange-500 text-white px-6 py-2 rounded-xl hover:bg-orange-600 transition disabled:bg-gray-300"
            >
              Publicar
            </button>
          </div>
        </div>
      </section>

      {/* POSTS */}
      <section className="max-w-5xl mx-auto space-y-8">
        {posts.length === 0 && (
          <p className="text-center text-gray-500 italic">
            Aún no hay publicaciones.
          </p>
        )}

        {posts.map((p) => (
          <PostCard
            key={p.id}
            post={p}
            responder={responder}
            usuario={usuario}
          />
        ))}
      </section>
    </main>
  );
}

/* ---------------- COMPONENTES ---------------- */

const PostCard = ({ post, responder, usuario }) => {
  const [abierto, setAbierto] = useState(false);
  const [respuesta, setRespuesta] = useState("");

  return (
    <article className="bg-white rounded-3xl border border-orange-100 shadow-sm p-6 hover:shadow-md transition">
      <span className="inline-block bg-orange-100 text-orange-700 text-xs font-semibold px-3 py-1 rounded-full mb-3">
        {post.materia}
      </span>

      <p className="text-gray-800 text-lg mb-2">{post.texto}</p>

      <p className="text-sm text-gray-500 mb-4">
        👤 {post.autor}
      </p>

      <button
        onClick={() => setAbierto(!abierto)}
        className="text-orange-600 font-semibold text-sm hover:underline"
      >
        {abierto ? "Ocultar respuestas" : "Responder"}
      </button>

      {abierto && (
        <div className="mt-5 space-y-4">
          <div className="flex gap-2">
            <input
              value={respuesta}
              onChange={(e) => setRespuesta(e.target.value)}
              disabled={!usuario}
              placeholder={
                usuario
                  ? "Escribe una respuesta..."
                  : "Inicia sesión para responder"
              }
              className="flex-1 border rounded-xl px-4 py-2 text-sm disabled:bg-gray-100"
            />
            <button
              onClick={() => {
                responder(post.id, respuesta);
                setRespuesta("");
              }}
              disabled={!usuario}
              className="bg-orange-500 text-white px-4 py-2 rounded-xl text-sm hover:bg-orange-600 disabled:bg-gray-300"
            >
              Enviar
            </button>
          </div>

          {post.respuestas.map((r, i) => (
            <div
              key={i}
              className="bg-orange-50 border border-orange-100 rounded-2xl p-4 text-sm"
            >
              <p className="text-gray-700">{r.texto}</p>
              <p className="text-xs text-gray-500 mt-1">👤 {r.autor}</p>
            </div>
          ))}
        </div>
      )}
    </article>
  );
};
