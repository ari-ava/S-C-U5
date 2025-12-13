import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

import ProductForm from "../Components/ProductForm";
import ProductList from "../Components/ProductList";
import StatsPanel from "../Components/StatsPanel";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [activeTab, setActiveTab] = useState("products");

  const [userRole, setUserRole] = useState("invitado");

  useEffect(() => {
    const savedProducts = localStorage.getItem("dashboard-products");
    if (savedProducts) setProducts(JSON.parse(savedProducts));
  }, []);

  useEffect(() => {
    localStorage.setItem("dashboard-products", JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setUserRole("invitado");
        return;
      }

      const ref = doc(db, "usuarios", user.uid);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        setUserRole(snap.data().rol);
      } else {
        setUserRole("invitado");
      }
    });

    return () => unsub();
  }, []);

  const permisos = {
    creadora: {
      puedeCrear: true,
      puedeEditar: true,
      puedeEliminar: true,
    },
    profesor: {
      puedeCrear: true,
      puedeEditar: true,
      puedeEliminar: false,
    },
    estudiante: {
      puedeCrear: false,
      puedeEditar: false,
      puedeEliminar: false,
    },
    invitado: {
      puedeCrear: false,
      puedeEditar: false,
      puedeEliminar: false,
    },
  };

  const rol = permisos[userRole] || permisos.invitado;

  const addProduct = (product) => {
    if (!rol.puedeCrear) {
      alert("No tienes permiso para agregar cursos.");
      return;
    }

    const newProduct = {
      ...product,
      id: Date.now(),
      createdAt: new Date().toISOString(),
    };

    setProducts([...products, newProduct]);
  };

  const updateProduct = (updatedProduct) => {
    if (!rol.puedeEditar) {
      alert("No tienes permiso para editar cursos.");
      return;
    }

    setProducts(
      products.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );

    setEditingProduct(null);
  };

  const deleteProduct = (id) => {
    if (!rol.puedeEliminar) {
      alert("No tienes permiso para eliminar cursos.");
      return;
    }

    if (window.confirm("¿Eliminar curso?")) {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  const startEditing = (product) => {
    if (!rol.puedeEditar) {
      alert("No tienes permiso para editar.");
      return;
    }

    setEditingProduct(product);
    setActiveTab("form");
  };

  const cancelEditing = () => {
    setEditingProduct(null);
  };

  return (
    <div className="min-h-screen from-orange-50 to-blue-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-orange-800 mb-4">
            🌱 Dashboard de Cursos
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Administra tus cursos y recursos educativos según tu rol
          </p>
          <p className="mt-2 font-semibold text-orange-700">
            Rol actual: {userRole.toUpperCase()}
          </p>
        </motion.div>

        {/* Panel de estadísticas */}
        <StatsPanel products={products} />

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-1 shadow-md flex gap-2">

            {/* Ver cursos */}
            <button
              onClick={() => setActiveTab("products")}
              className={`px-6 py-2 rounded-md transition-colors ${
                activeTab === "products"
                  ? "bg-orange-500 text-white"
                  : "text-gray-600 hover:bg-orange-100"
              }`}
            >
              📋 Ver Cursos
            </button>

            {/* Agregar curso — SOLO si tiene permiso */}
            {rol.puedeCrear && (
              <button
                onClick={() => setActiveTab("form")}
                className={`px-6 py-2 rounded-md transition-colors ${
                  activeTab === "form"
                    ? "bg-orange-500 text-white"
                    : "text-gray-600 hover:bg-orange-100"
                }`}
              >
                {editingProduct ? "✏️ Editar Curso" : "➕ Agregar Curso"}
              </button>
            )}
          </div>
        </div>

        {/* Contenido */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Formulario */}
          <div className={`lg:col-span-1 ${activeTab !== "form" && "hidden lg:block"}`}>
            {activeTab === "form" && rol.puedeCrear && (
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                <ProductForm
                  onSubmit={editingProduct ? updateProduct : addProduct}
                  editingProduct={editingProduct}
                  onCancel={cancelEditing}
                />
              </motion.div>
            )}
          </div>

          {/* Lista */}
          <div className={`lg:col-span-2 ${activeTab !== "products" && "hidden lg:block"}`}>
            {activeTab === "products" && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <ProductList
                  products={products}
                  onEdit={startEditing}
                  onDelete={deleteProduct}
                  userRole={userRole}
                  permisos={rol}
                />
              </motion.div>
            )}
          </div>
        </div>

        {/* Cuando no hay cursos */}
        {products.length === 0 && activeTab === "products" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12 bg-white rounded-2xl shadow-md"
          >
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">
              No hay cursos aún
            </h3>
            <p className="text-gray-500 mb-6">
              Comienza agregando tu primer curso educativo.
            </p>

            {rol.puedeCrear && (
              <button
                onClick={() => setActiveTab("form")}
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                ➕ Agregar Primer Curso
              </button>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;