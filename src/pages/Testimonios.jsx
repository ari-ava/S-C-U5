import React, { useState } from "react";
import testimoniosData from "../data/testimonios.json";

export default function Testimonios() {
  const [testimonios] = useState(testimoniosData);

  return (
    <main className="from-orange-100 to-white min-h-screen">
      {/* Encabezado */}
      <section className="text-center p-6 bg-orange-200 shadow-md">
        <h1 className="text-2xl md:text-3xl font-bold text-orange-800">
          ¿Dudas de que nuestra empresa es confiable?
        </h1>
        <p className="text-lg text-gray-700 mt-2">
          ¡Te invitamos a leer los testimonios de nuestros clientes!
        </p>
      </section>

      {/* Testimonios */}
      <section className="flex flex-col md:flex-row justify-center items-center gap-8 p-8 flex-wrap">
        {testimonios.map((testimonio) => (
          <div
            key={testimonio.id}
            className="bg-white rounded-2xl shadow-md p-6 w-72 text-center hover:shadow-lg hover:scale-105 transition-transform"
          >
            <img
              src={testimonio.imagen}
              alt={testimonio.nombre}
              className="w-24 h-24 mx-auto rounded-full mb-4 object-cover border-4 border-orange-300"
            />
            <h3 className="text-lg font-semibold text-orange-700">
              {testimonio.nombre}
            </h3>
            <p className="text-gray-700 mt-2 italic">{testimonio.texto}</p>
          </div>
        ))}
      </section>
    </main>
  );
}