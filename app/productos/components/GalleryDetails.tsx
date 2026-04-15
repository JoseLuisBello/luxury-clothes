"use client";
import Image from "next/image";
import { useState } from "react";
import { Producto } from "@/types/producto/Producto";

export default function GalleryDetails({
    data,
} : {
    data: Producto,
}) {
    const [url, setURL] = useState<string | null>(null);

    return (            
        <div className="flex space-x-4 w-fit">
            {/* Imagenes de costado */}
            <div className="flex flex-col justify-start items-center space-y-3">
                {data.imagenes && data.imagenes.map((imgUrl, index) => (
                    <div className="w-17.5 h-17.5 overflow-hidden rounded-[10px] flex justify-center items-center" key={index}>
                        <Image
                            key={index}
                            src={imgUrl}
                            alt={`${data.nombre} - Imagen ${index + 1}`}
                            width={70}
                            height={100}
                            className="mb-4 cursor-pointer rounded-[10px] hover:opacity-80"
                            onClick={() => setURL(imgUrl)}
                            onMouseEnter={() => setURL(imgUrl)}
                            objectFit="cover"
                            loading="lazy"
                        />
                    </div>
                ))}
            </div>
            {/* Imagen principal */}
            <div className="w-133.75 h-167.25">
                <Image
                    src={url ? url.toString() : data.imagenes?.[0] || "/placeholder.png"}
                    alt={data.nombre}
                    width={400}
                    height={400}
                    className="object-cover w-full h-full rounded-[10px] border border-gray-200"
                    loading="eager"
                />
            </div>
        </div>
    );
}