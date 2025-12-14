import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

export function useAuth() {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setLoading(true);

      try {
        if (user) {
          const ref = doc(db, "usuarios", user.uid);
          const snap = await getDoc(ref);

          if (snap.exists()) {
            const data = snap.data();

            setUsuario({
              uid: user.uid,
              email: user.email,
              nombre: data.nombre || "Usuario",
              rol: data.rol || "estudiante", // 🔥 DEFAULT SEGURO
            });
          } else {
            // Usuario autenticado pero sin documento
            setUsuario({
              uid: user.uid,
              email: user.email,
              nombre: "Usuario",
              rol: "estudiante", // 🔥 IMPORTANTE
            });
          }
        } else {
          setUsuario(null);
        }
      } catch (error) {
        console.error("Error en useAuth:", error);
        setUsuario(null);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return { usuario, loading };
}
