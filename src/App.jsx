import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

// páginas públicas
import Home from "./pages/Home";
import Nosotras from "./pages/Nosotras";
import MisionVision from "./pages/MisionVision";
import Catalogo from "./pages/Catalogo";
import Foro from "./pages/Foro";
import Testimonios from "./pages/Testimonios";
import Contactanos from "./pages/Contactanos";
import Promociones from "./pages/Promociones";
import pizarra from "./pages/pizarra";
import Login from "./pages/Login";
import Register from "./pages/Register";

// páginas protegidas
import CrearCurso from "./pages/CrearCurso";
import MisCursos from "./pages/MisCursos";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>

          {/* 🌍 PÚBLICAS */}
          <Route path="/" element={<Home />} />
          <Route path="/nosotras" element={<Nosotras />} />
          <Route path="/mision-vision" element={<MisionVision />} />
          <Route path="/catalogo" element={<Catalogo />} />
          <Route path="/foro" element={<Foro />} />
          <Route path="/testimonios" element={<Testimonios />} />
          <Route path="/contactanos" element={<Contactanos />} />
          <Route path="/promociones" element={<Promociones />} />
          <Route path="/pizarra" element={<Pizarra />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />


          {/* 🔐 SOLO ESTUDIANTE */}
          <Route
            path="/mis-cursos"
            element={
              <ProtectedRoute roles={["estudiante"]}>
                <MisCursos />
              </ProtectedRoute>
            }
          />

          {/* 🔐 SOLO PROFESOR */}
          <Route
            path="/crear-curso"
            element={
              <ProtectedRoute roles={["profesor"]}>
                <CrearCurso />
              </ProtectedRoute>
            }
          />

        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
