import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const ProductForm = ({ onSubmit, editingProduct, onCancel }) => {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    price: "",
    description: "",
    image: "",
    type: "producto",
    status: "activo"
  });

  const categories = ["Talleres", "Recursos", "Mentoría", "Cursos", "Materiales"];
  const productTypes = ["producto", "servicio", "recurso"];

  useEffect(() => {
    if (editingProduct) {
      setFormData(editingProduct);
    }
  }, [editingProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validación básica
    if (!formData.title || !formData.category || !formData.description) {
      alert("Por favor completa los campos obligatorios");
      return;
    }

    // Preparar datos
    const productData = {
      ...formData,
      price: formData.price === "" ? 0 : parseFloat(formData.price)
    };

    onSubmit(productData);
    
    // Reset form si no está editando
    if (!editingProduct) {
      setFormData({
        title: "",
        category: "",
        price: "",
        description: "",
        image: "",
        type: "producto",
        status: "activo"
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-lg p-6 sticky top-4"
    >
      <h2 className="text-2xl font-bold text-orange-800 mb-6">
        {editingProduct ? "✏️ Editar Producto" : "➕ Agregar Nuevo Producto"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Tipo de Producto */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tipo *
          </label>
          <div className="grid grid-cols-3 gap-2">
            {productTypes.map(type => (
              <button
                key={type}
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, type }))}
                className={`py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                  formData.type === type
                    ? "bg-orange-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {type === "producto" && "📦"}
                {type === "servicio" && "🎯"}
                {type === "recurso" && "📚"}
                {" " + type}
              </button>
            ))}
          </div>
        </div>

        {/* Título */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Título *
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Ej: Taller de Escritura Creativa"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            required
          />
        </div>

        {/* Categoría */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Categoría *
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            required
          >
            <option value="">Selecciona una categoría</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Precio */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Precio ($)
          </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="0.00"
            min="0"
            step="0.01"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          />
          <p className="text-xs text-gray-500 mt-1">Deja en 0 para productos gratuitos</p>
        </div>

        {/* Imagen */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            URL de Imagen
          </label>
          <input
            type="url"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="https://ejemplo.com/imagen.jpg"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          />
        </div>

        {/* Descripción */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Descripción *
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            placeholder="Describe el producto o servicio..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            required
          />
        </div>

        {/* Estado */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Estado
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          >
            <option value="activo">🟢 Activo</option>
            <option value="inactivo">🔴 Inactivo</option>
            <option value="agotado">🟡 Agotado</option>
          </select>
        </div>

        {/* Botones */}
        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold transition-colors"
          >
            {editingProduct ? "💾 Guardar Cambios" : "➕ Agregar Producto"}
          </button>
          
          {editingProduct && (
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
          )}
        </div>
      </form>
    </motion.div>
  );
};

export default ProductForm;