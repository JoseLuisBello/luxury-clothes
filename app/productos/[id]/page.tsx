import { getProducto } from "@/client/producto.client";
import { Loader } from "lucide-react";
import DetallesProductoCuerpo from "../components/DetallesProductoCuerpo";

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
        <DetallesProductoCuerpo data={data} />
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