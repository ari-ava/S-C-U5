import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

/**
 * Hook global de autenticación
 * - Escucha cambios de sesión
 * - Obtiene datos del usuario desde Firestore
 * - Maneja roles (estudiante, profesor, invitado)
 */
export function useAuth() {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        if (user) {
          const ref = doc(db, "usuarios", user.uid);
          const snap = await getDoc(ref);

          if (snap.exists()) {
            setUsuario({
              uid: user.uid,
              ...snap.data(), // nombre, rol, email, etc
            });
          } else {
            // Usuario autenticado pero sin doc en Firestore
            setUsuario({
              uid: user.uid,
              nombre: "Usuario",
              rol: "invitado",
              email: user.email,
            });
          }
        } else {
          // No logueado
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
