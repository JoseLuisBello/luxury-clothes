import { getProducto } from "@/client/producto.client";
import { Loader } from "lucide-react";
import GalleryDetails from "../components/GalleryDetails";

type Props = {
  params: { id: number };
};

export default async function ProductoPage({ params }: Props) {
    const { id } = await params;
    const { data } = await getProducto(id);


    if (!data) {
        return (
            <div className="h-full w-full flex items-center justify-center">
                <Loader className="animate-spin" size={48} />
            </div>
        );
    }

    return (
        <div className="p-24 w-full h-full flex gap-8 justify-center">
            {/* Div para la galeria de imagenes */}
            <GalleryDetails data={data} />

            {/* Div para la informacion del producto */}
            <div>
                <div className="font-semibold text-2xl w-100 h-fit mt-6">
                    <p>{data.nombre}</p>
                </div>
                <div className="w-100 h-fit font-regular text-[14px] opacity-50 mt-2">
                    <p>{data.descripcion}</p>
                </div>
                <div className="font-semibold text-[16px] mt-6">
                    <p>${Number(data.precio).toLocaleString()}</p>
                </div>
                <div className="flex items-center gap-4 text-[16px] mt-8">
                    <p className="font-bold">Color: </p>
                    <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full" style={{ backgroundColor: getColor(data.color || "lightgray") }}></div>
                        <p>{data.color}</p>
                    </div>
                </div>
                <div className="mt-6 flex flex-col gap-4">
                    <p className={"font-semibold"}>Selecciona tu talla:</p>
                    <div className="grid grid-cols-3 gap-2 w-fit">
                        { 
                            data.stock_por_talla && data.stock_por_talla.map(
                                (item, index) => <Talla key={index} talla={item.talla} stock={item.stock} />
                            )
                        }
                    </div>
                </div>
                <div className="mt-12 w-full">
                    <button className="bg-black text-white py-2 px-4 rounded-[28px] w-full h-16 hover:opacity-60">
                        Agregar al carrito
                    </button>
                </div>

                <div className="mt-6 w-full">
                    <button className="text-black bg-white py-2 px-4 rounded-[28px] w-full h-16 border border-[#E6E6E6] hover:border-black">
                        Añadir a lista de deseos
                    </button>
                </div>
            </div>
        </div>
    );
}

function getColor(nombre: string) {
    switch (nombre.toLowerCase()) {
        case "negro":
            return "#111111";
        case "blanco":
            return "#F2F1ED";
        case "rojo":
            return "#7A1E1E";
        case "azul":
            return "#0F1A2B";
        case "verde":
            return "#0F3D2E";
        case "amarillo":
            return "#C6A75E";
        case "gris":
            return "#4A4F55";
        case "naranja":
            return "#A65A3A";
        case "rosa":
            return "#B76E79";
        case "morado":
            return "#4B2E3F";
        case "café":
            return "#3B241C";
        case "cafe":
            return "#3B241C";
        case "beige":
            return "#C8B69C";
        default:
            return "lightgray";
    }
}

// Componente para tallas
function Talla({
    talla,
    stock,
} : {
    talla: string;
    stock: number;
}) {
    return (
        <div className={`w-30 h-12 border border-[#E6E6E6] rounded-md flex items-center justify-center ${stock === 0 ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:border-[#111111]"}`}>
            {talla} ({stock})
        </div>
    );
}