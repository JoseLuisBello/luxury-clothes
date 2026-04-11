"use client";

import { X } from "lucide-react"; 

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export default function FormularioDireccion({ isOpen, onClose, onSubmit }: Props) {
  if (!isOpen) return null;

  return (
    // Backdrop: El fondo oscuro semitransparente
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      
      {/* Contenedor del Modal */}
      <div className="bg-white w-full max-w-lg rounded-2xl p-8 relative max-h-[90vh] overflow-y-auto shadow-2xl">
        
        {/* Botón cerrar */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-black transition"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-medium mb-8">Agregar dirección</h2>

        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); /* onSubmit logic */ }}>
          
          <div className="grid grid-cols-2 gap-4">
            <input type="text" placeholder="Nombre*" className="border border-gray-300 p-3 rounded-md w-full focus:outline-black" />
            <input type="text" placeholder="Apellido*" className="border border-gray-300 p-3 rounded-md w-full focus:outline-black" />
          </div>

          <input type="text" placeholder="Dirección*" className="border border-gray-300 p-3 rounded-md w-full focus:outline-black" />
          
          <input type="text" placeholder="Apartamento, suite, edificio" className="border border-gray-300 p-3 rounded-md w-full focus:outline-black" />

          <div className="grid grid-cols-2 gap-4">
            <input type="text" placeholder="Ciudad*" className="border border-gray-300 p-3 rounded-md w-full focus:outline-black" />
            <input type="text" placeholder="Código postal*" className="border border-gray-300 p-3 rounded-md w-full focus:outline-black" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <select className="border border-gray-300 p-3 rounded-md w-full bg-white">
                <option disabled selected>Provincia*</option>
                <option>Oaxaca</option>
                <option>CDMX</option>
            </select>
            <div className="border border-gray-300 p-3 rounded-md bg-gray-50 text-gray-500">
                México
            </div>
          </div>

          <input type="tel" placeholder="Número de teléfono*" className="border border-gray-300 p-3 rounded-md w-full focus:outline-black" />

          <div className="flex items-start gap-3 pt-2">
            <input type="checkbox" id="default" className="mt-1 h-4 w-4 accent-black" />
            <label htmlFor="default" className="text-sm text-gray-600 cursor-pointer">
                Establecer como dirección de envío predeterminada
            </label>
          </div>

          <div className="flex justify-end pt-6">
            <button 
                type="submit"
                className="bg-black text-white px-8 py-3 rounded-full font-medium hover:opacity-80 transition"
            >
              Guardar
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}