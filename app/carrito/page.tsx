import { Minus, LucideTrash2, Plus, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function CarritoPage() {
  const name = 'Zapatillas Speedrock de piel y malla';
  const price = 184830000.00;
  const image = 'https://www.prada.com/content/dam/pradabkg_products/2/2EE/2EE468/3ZM0F0002/2EE468_3ZM0_F0002_F_G000_SLR.jpg/_jcr_content/renditions/cq5dam.web.hebebed.1000.1000.jpg';
  const color = 'Negro';
  const talla = '30';
  const genero = 'Tenis para hombre';

  return (
    <div className="w-full h-full p-24">
      {/* Contenedor para la bolsa */}
      <div className="flex flex-col gap-3 items-center">
        
        <div className="relative h-fit w-180 flex flex-col space-y-7">
          {/* card de carrito */}
          <div className="relative h-fit w-full flex">
            {/* Imagen y botones */}
            <div className="flex flex-col items-center justify-start w-fit h-full space-y-3">
              <div className="h-42 w-42 overflow-hidden relative">
                <Image
                  key={1}
                  src={image}
                  alt={name}
                  fill
                  className=" object-cover"
                />
              </div>
              <div className="w-full flex h-fit justify-around">
                {/* Boton para cantidades */}
                <div className="rounded-full border border-gray-200 flex justify-between items-center w-25.5 h-10">
                  <button className="h-10 w-10 flex hover:bg-gray-200 justify-center items-center rounded-full">
                    <LucideTrash2 className="h-4.5 w-4.5" />
                  </button>
                  <p>1</p>
          
                  <button className="h-10 w-10 hover:bg-gray-200 flex justify-center items-center rounded-full">
                    <Plus className="h-4.5 w-4.5" />
                  </button>
                </div>
                {/* Boton para favoritos */}
                <div className="rounded-full flex justify-center items-center w-10 h-10 border border-gray-200">
                  <button className="h-full w-full flex hover:bg-gray-200 justify-center items-center rounded-full">
                    <Heart className="h-4.5 w-4.5" color="black"/>
                  </button>
                </div>
              </div>
            </div>
            {/* Información del producto */}
            <div className="flex justify-between h-full w-full">
              {/* Titulo y demas */}
              <div className="w-full text-md px-4 py-1 flex flex-col gap-0.5">
                <p className="font-semibold">{name}</p>
                <p className="text-black font-medium opacity-50">{genero}</p>
                <p className="text-black font-medium opacity-50">{color}</p>
                <p className="text-black font-medium opacity-70 underline underline-offset-6">{'Talla: ' + talla}</p>
              </div>
              {/* Precio */}
              <div className="px-4 py-1">
                <p className="font-semibold">${Number(price).toLocaleString()}</p>
              </div>
            </div>
          </div>
          <div className="border border-gray-200 w-full"></div>
        </div>
      </div>

      {/* Contenedor para el resumen de compra */}
      <div>

      </div>
    </div>
  );
}