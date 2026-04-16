// # Gestion de direcciones (Agregar, Modificar, Eliminar)
//datos estaticos para probar información de direcciones, se eliminaran cuando se integre con la base de datos
"use client";

import { useState } from "react";
import FormularioDireccion from "@/app/cuenta/direcciones/components/FormularioDireccion";
import DireccionEnvio from "./components/DireccionEnvio";

export default function DireccionesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [direcciones, setDirecciones] = useState(false);

  const handleSaveAddress = (data: any) => {
    console.log("Guardando dirección...", data);
    // Aquí iría tu fetch al API
    setIsModalOpen(false);  
  };

  return (
    <div className="pl-16 pt-12 pr-16 pb-12 min-h-screen">
      <h1 className="mb-6 text-2xl font-medium">
        Direcciones de entrega guardadas
      </h1>
      
      {!direcciones ? (
        <>
        <div className="bg-gray-50 rounded-lg p-6 text-center pb-40 border-gray-300">
          <p className="text-gray-700 mt-2 mb-6">
            Actualmente no tienes ninguna dirección de envío guardada. Agrega
            una dirección aquí para que se complete automáticamente y puedas
            finalizar la compra más rápido.
          </p>

          <button 
            onClick={() => setIsModalOpen(true)}
            className="mt-6 bg-black text-white px-6 py-2.5 rounded-full font-medium hover:opacity-80 transition"
          >
            Agregar dirección
          </button>
        </div>

        <FormularioDireccion 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSaveAddress}
        />
        </>
      ):(
      <DireccionEnvio/> 
      )}
    </div>
  );
}