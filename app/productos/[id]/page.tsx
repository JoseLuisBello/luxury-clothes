"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Producto } from "@/types/producto/Producto";
import { useParams } from "next/navigation";

export default function ProductoPage() {
    const [producto, setProducto] = useState<Producto | null>(null);
    const [url, setURL] = useState<String | null>(null);
    const { id } = useParams();

    useEffect(() => {
        async function fetchProducto() {
            try {
                const res = await fetch(`/api/producto/${id}`);
                const data = await res.json();
                setProducto(data.data);
                setURL(data.data.imagenes[0]);
            } catch (error) {
                console.error("Error fetching producto:", error);
            }
        }

        fetchProducto();
    }, [id]);

    if (!producto) {
        return <div className="h-full w-full flex items-center justify-center">Cargando...</div>;
    }

    return (
        <div className="p-24 w-full h-full">
            {/* Div para la galeria de imagenes */}
            <div>
                {/* Imagenes de costado */}
                <div>
                    {producto.imagenes && producto.imagenes.map((imgUrl, index) => (
                        <Image
                            key={index}
                            src={imgUrl}
                            alt={`${producto.nombre} - Imagen ${index + 1}`}
                            width={70}
                            height={70}
                            className="mb-4 cursor-pointer border rounded hover:opacity-80"
                            onClick={() => setURL(imgUrl)}
                            onMouseEnter={() => setURL(imgUrl)}
                            loading="lazy"
                        />
                    ))}
                </div>
                {/* Imagen principal */}
                <div>
                    <Image
                        src={url ? url.toString() : producto.imagen_url || "/placeholder.png"}
                        alt={producto.nombre}
                        width={400}
                        height={400}
                        className="rounded"
                        loading="lazy"
                    />
                </div>
            </div>

            {/* Div para la informacion del producto */}
            <div className="ml-12">
                <h1 className="text-2xl font-bold mb-4">{producto.nombre}</h1>
                <p className="text-lg text-gray-700 mb-6">{producto.descripcion}</p>
                <p className="text-xl font-semibold mb-4">${producto.precio}</p>
                <button className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700">
                    Agregar al carrito
                </button>
            </div>

            {/* Div para la informacion del producto */}
            <div></div>
        </div>
    );
}