// Importa lo que necesitas de Firebase
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDFxsTVl9pX_ibdXfWE9JfEVRkJ6l0gDMM",
  authDomain: "sembrando-conocimientos.firebaseapp.com",
  projectId: "sembrando-conocimientos",
  storageBucket: "sembrando-conocimientos.firebasestorage.app",
  messagingSenderId: "780126530004",
  appId: "1:780126530004:web:f368ebc721c76dc78f0e41",
  measurementId: "G-R4HE4KB7JK",
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Inicializa Auth y Firestore
export const auth = getAuth(app);
export const db = getFirestore(app);

// Si quieres, también puedes exportar app y analytics
export { app, analytics };