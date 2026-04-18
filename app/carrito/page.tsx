import { Minus, LucideTrash2, Plus, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function CarritoPage() {
  const name = 'Zapatillas Speedrock de piel y malla';
  const price = 18483.00;
  const image = 'https://www.prada.com/content/dam/pradabkg_products/2/2EE/2EE468/3ZM0F0002/2EE468_3ZM0_F0002_F_G000_SLR.jpg/_jcr_content/renditions/cq5dam.web.hebebed.1000.1000.jpg';
  const color = 'Negro';
  const talla = '30';
  const genero = 'Tenis para hombre';

  return (
    <div className="w-full h-full p-24">
      {/* Contenedor para la bolsa */}
      <div className="flex flex-col gap-3 items-center">
        
        {/* card de carrito */}
        <div className="border relative h-90 w-180">
          {/* Imagen y botones */}
          <div className="flex flex-col items-center justify-center w-fit space-y-3">
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
          <div></div>
        </div>
      </div>

      {/* Contenedor para el resumen de compra */}
      <div>

      </div>
    </div>
  );
}