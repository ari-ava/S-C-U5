import { useState } from "react";
import { useAuth } from "../services/useAuth";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { Navigate } from "react-router-dom";

export default function CrearCurso() {
  const { usuario } = useAuth();

  if (!usuario || usuario.rol !== "profesor") {
    return <Navigate to="/" />;
  }

  const [form, setForm] = useState({
    titulo: "",
    descripcion: "",
    categoria: "",
    precio: 0,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "cursos"), {
        ...form,
        precio: Number(form.precio),
        profesorId: usuario.uid,
        createdAt: serverTimestamp(),
      });

      alert("Curso creado con éxito 🎉");
      setForm({ titulo: "", descripcion: "", categoria: "", precio: 0 });
    } catch (error) {
      console.error(error);
      alert("Error al crear el curso");
    }
  };

  return (
    <div className="max-w-xl">
      <h1 className="text-3xl font-bold text-orange-700 mb-6">
        👩‍🏫 Crear Curso
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow space-y-4"
      >
        <input
          name="titulo"
          placeholder="Título del curso"
          value={form.titulo}
          onChange={handleChange}
          required
          className="w-full border rounded px-3 py-2"
        />

        <textarea
          name="descripcion"
          placeholder="Descripción"
          value={form.descripcion}
          onChange={handleChange}
          required
          className="w-full border rounded px-3 py-2"
        />

        <input
          name="categoria"
          placeholder="Categoría"
          value={form.categoria}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />

        <input
          type="number"
          name="precio"
          placeholder="Precio (0 = gratis)"
          value={form.precio}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />

        <button
          type="submit"
          className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition"
        >
          Crear Curso
        </button>
      </form>
    </div>
  );
}
