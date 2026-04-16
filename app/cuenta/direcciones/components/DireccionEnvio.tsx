"use client";

import { useState } from "react";
import FormularioDireccion from "./FormularioDireccion";

type Direccion = {
  id: number;
  nombre: string;
  apellido: string;
  direccion: string;
  ciudad: string;
  cp: string;
};

const mockDireccion: Direccion = {
  id: 1,
  nombre: "Magali",
  apellido: "Valeriano Lopez",
  direccion: "Calle Nezahualcoyotl No. 16",
  ciudad: "Huajuapan de León",
  cp: "69007",
};

export default function DireccionEnvio() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDireccion, setSelectedDireccion] =
    useState<Direccion | null>(null);

  const handleEdit = (direccion: Direccion) => {
    setSelectedDireccion(direccion);
    setIsOpen(true);
  };

  const handleCreate = () => {
    setSelectedDireccion(null);
    setIsOpen(true);
  };

  return (
    <div className="max-w-xl">

      <h2 className="text-black font-semibold text-lg mb-1">
        Dirección de entrega predeterminada
      </h2>

      <div className="flex justify-between items-start mt-4">

        <div className="text-[#757575] text-[16px] space-y-1">
          <p>{mockDireccion.nombre} {mockDireccion.apellido}</p>
          <p>{mockDireccion.direccion}</p>
          <p>{mockDireccion.cp} {mockDireccion.ciudad}</p>
        </div>

        <button
          onClick={() => handleEdit(mockDireccion)}
          className="text-black text-sm font-bold underline"
        >
          Editar
        </button>

      </div>

      <div className="flex justify-end mt-8">
        <button
          onClick={handleCreate}
          className="bg-black text-white px-6 py-2 rounded-full"
        >
          Agregar nueva dirección
        </button>
      </div>

      {/* MODAL */}
      <FormularioDireccion
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
          setSelectedDireccion(null);
        }}
        onSubmit={(data) => {
          console.log("guardar:", data);
        }}
        selectedDireccion={selectedDireccion}
      />
    </div>
  );
}