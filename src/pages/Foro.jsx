import React, { useEffect, useState } from "react";
import materiasData from "../data/materiales.json";
import { db, auth } from "../firebase.js";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  addDoc,
  updateDoc,
  doc,
} from "firebase/firestore";

const Foro = () => {
  const [mensajes, setMensajes] = useState([]);
  const [materiaSeleccionada, setMateriaSeleccionada] = useState("");
  const [mensajeTexto, setMensajeTexto] = useState("");
  const [filtro, setFiltro] = useState("Todos");

  const user = auth.currentUser;

  // 🔹 Cargar mensajes desde Firestore en tiempo real
  useEffect(() => {
    const q = query(collection(db, "foroposts"), orderBy("fecha", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        respuestas: doc.data().respuestas || [],
      }));
      setMensajes(data);
    });
    return () => unsubscribe();
  }, []);

  // 🔹 Publicar mensaje
  const publicarMensaje = async () => {
    if (!mensajeTexto.trim() || !materiaSeleccionada) {
      alert("Por favor escribe un mensaje y selecciona una materia.");
      return;
    }

    if (!user) {
      alert("Debes iniciar sesión para publicar.");
      return;
    }

    await addDoc(collection(db, "foroposts"), {
      autor: user.displayName || user.email,
      autorId: user.uid,
      rol: user.rol || "estudiante",
      materia: materiaSeleccionada,
      texto: mensajeTexto,
      fecha: new Date(),
      respuestas: [],
    });

    setMensajeTexto("");
    setMateriaSeleccionada("");
  };

  // 🔹 Publicar respuesta
  const enviarRespuesta = async (id, textoRespuesta) => {
    if (!textoRespuesta.trim() || !user) return;

    const mensajeRef = doc(db, "foroposts", id);
    await updateDoc(mensajeRef, {
      respuestas: [
        ...mensajes.find((m) => m.id === id).respuestas,
        {
          autor: user.displayName || user.email,
          autorId: user.uid,
          rol: user.rol || "estudiante",
          texto: textoRespuesta,
          fecha: new Date(),
        },
      ],
    });
  };

  // 🔹 Filtrado por materia
  const mensajesFiltrados =
    filtro === "Todos"
      ? mensajes
      : mensajes.filter((m) => m.materia === filtro);

  return (

      <main className="max-w-6xl mx-auto p-6 font-sans">
        {/* Header */}
        <section className="text-center mb-12">
          <h1 className="text-4xl font-bold text-orange-600 mb-4">
            Bienvenido a nuestro Foro
          </h1>
          <p className="max-w-3xl mx-auto text-gray-700 leading-relaxed">
            ¿Tienes dudas o quieres ayudar a alguien? Este foro es tu espacio
            para compartir, aprender y crecer juntos.
          </p>

          <div className="grid sm:grid-cols-3 gap-4 mt-8">
            <div className="bg-orange-100 p-6 rounded-xl shadow hover:bg-orange-200">
              📘 Aprende
            </div>
            <div className="bg-orange-100 p-6 rounded-xl shadow hover:bg-orange-200">
              💬 Participa
            </div>
            <div className="bg-orange-100 p-6 rounded-xl shadow hover:bg-orange-200">
              🤝 Ayuda
            </div>
          </div>
        </section>

        {/* Filtro de materias */}
        <section className="text-center mb-10">
          <h2 className="text-2xl font-bold text-orange-600 mb-4">
            ¡Elige una materia y empieza a interactuar!
          </h2>

          <div className="flex flex-wrap justify-center gap-3 mb-6">
            <button
              className={`px-4 py-2 rounded-lg border ${
                filtro === "Todos"
                  ? "bg-orange-500 text-white"
                  : "bg-white text-orange-600 border-orange-400"
              }`}
              onClick={() => setFiltro("Todos")}
            >
              Todos
            </button>

            {materiasData.map((materia) => (
              <button
                key={materia}
                className={`px-4 py-2 rounded-lg border ${
                  filtro === materia
                    ? "bg-orange-500 text-white"
                    : "bg-white text-orange-600 border-orange-400"
                }`}
                onClick={() => setFiltro(materia)}
              >
                {materia}
              </button>
            ))}
          </div>
        </section>

        {/* Input de nuevo mensaje */}
        <section className="mb-10">
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
            <input
              type="text"
              placeholder="Escribe tu mensaje aquí"
              className="border p-2 rounded-lg flex-1"
              value={mensajeTexto}
              onChange={(e) => setMensajeTexto(e.target.value)}
            />
            <select
              className="border p-2 rounded-lg"
              value={materiaSeleccionada}
              onChange={(e) => setMateriaSeleccionada(e.target.value)}
            >
              <option value="">Selecciona materia</option>
              {materiasData.map((materia) => (
                <option key={materia} value={materia}>
                  {materia}
                </option>
              ))}
            </select>
            <button
              className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition"
              onClick={publicarMensaje}
            >
              Publicar
            </button>
          </div>
        </section>

        {/* Mensajes */}
        <section className="space-y-6">
          {mensajesFiltrados.map((m) => (
            <MensajeCard
              key={m.id}
              mensaje={m}
              enviarRespuesta={enviarRespuesta}
            />
          ))}
        </section>
      </main>

  );
};

// Componente MensajeCard
const MensajeCard = ({ mensaje, enviarRespuesta }) => {
  const [mostrar, setMostrar] = useState(false);
  const [respuesta, setRespuesta] = useState("");

  return (
    <div className="bg-white border border-orange-200 rounded-xl p-4 shadow">
      <p className="font-semibold text-orange-700">
        {mensaje.materia}: <span className="text-gray-800">{mensaje.texto}</span>
      </p>
      <p className="text-sm text-gray-500 mb-2">
        {mensaje.autor} ({mensaje.rol})
      </p>

      {/* Responder */}
      <button
        onClick={() => setMostrar(!mostrar)}
        className="text-sm text-orange-600 font-semibold hover:underline"
      >
        {mostrar ? "Ocultar respuestas" : "Responder"}
      </button>

      {mostrar && (
        <div className="mt-3">
          <input
            type="text"
            placeholder="Escribe una respuesta"
            value={respuesta}
            onChange={(e) => setRespuesta(e.target.value)}
            className="border p-2 rounded-lg w-full mb-2"
          />
          <button
            className="bg-orange-500 text-white px-3 py-1 rounded-lg hover:bg-orange-600"
            onClick={() => {
              enviarRespuesta(mensaje.id, respuesta);
              setRespuesta("");
            }}
          >
            Enviar
          </button>

          <div className="mt-2 space-y-1">
            {mensaje.respuestas.map((r, i) => (
              <p key={i} className="text-sm text-gray-700 ml-3">
                👤 {r.autor} ({r.rol}): {r.texto}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Foro;