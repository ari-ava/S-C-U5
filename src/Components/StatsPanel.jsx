// src/components/StatsPanel.jsx
import React from "react";
import { motion } from "framer-motion";

const StatsPanel = ({ cursos }) => {
  const stats = {
    total: cursos.length,
    gratuitos: cursos.filter(c => c.price === 0).length,
    premium: cursos.filter(c => c.price > 0).length,
    activos: cursos.filter(c => c.status === "activo").length,
  };

  const statCards = [
    { label: "Total", value: stats.total, icon: "📚", color: "blue" },
    { label: "Gratuitos", value: stats.gratuitos, icon: "🎁", color: "green" },
    { label: "Premium", value: stats.premium, icon: "💎", color: "purple" },
    { label: "Activos", value: stats.activos, icon: "✅", color: "orange" },
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: "bg-blue-50 border-blue-200 text-blue-700",
      green: "bg-green-50 border-green-200 text-green-700",
      purple: "bg-purple-50 border-purple-200 text-purple-700",
      orange: "bg-orange-50 border-orange-200 text-orange-700",
    };
    return colors[color] || colors.blue;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6"
    >
      {statCards.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
          className={`border-2 rounded-xl p-4 text-center ${getColorClasses(stat.color)}`}
        >
          <div className="text-2xl mb-2">{stat.icon}</div>
          <div className="text-2xl font-bold mb-1">{stat.value}</div>
          <div className="text-sm font-medium">{stat.label}</div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default StatsPanel;