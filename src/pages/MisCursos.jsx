import { useEffect, useState } from "react";
import { useAuth } from "../services/useAuth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";

export default function MisCursos() {
  const { usuario } = useAuth();
  const [cursos, setCursos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCursos = async () => {
      if (!usuario) return;

      try {
        const q = query(
          collection(db, "inscripciones"),
          where("userId", "==", usuario.uid)
        );

        const snap = await getDocs(q);
        setCursos(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCursos();
  }, [usuario]);

  if (loading) return <p>Cargando cursos...</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold text-orange-700 mb-6">
        📘 Mis Cursos
      </h1>

      {cursos.length === 0 ? (
        <p className="text-gray-600">Aún no estás inscrita en ningún curso.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {cursos.map((c) => (
            <article
              key={c.id}
              className="bg-white rounded-xl shadow p-4"
            >
              <h2 className="font-semibold text-lg">{c.titulo}</h2>
              <p className="text-sm text-gray-500">{c.categoria}</p>
              <p className="mt-2 text-gray-700 text-sm">{c.descripcion}</p>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
