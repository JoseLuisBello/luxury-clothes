// components/AddToCartButton.tsx
"use client";

import { useState } from "react";

export default function AddToCartButton({
    id_producto,
    id_Talla,
    id_usuario,
    onClick,
} : {
    id_producto: number;
    id_Talla: number;
    id_usuario: number;
    onClick: (seleccina : boolean) => void;
}) {
  const [loading, setLoading] = useState(false);

    const handleAddToCart = async () => {
        setLoading(true);
        if (!id_Talla) {
            onClick(true);
            setLoading(false);
            return;
        }

        try {
            const res = await fetch("/api/carrito", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id_usuario: id_usuario,
                    id_producto: id_producto,
                    id_talla: id_Talla,
                    cantidad: 1
                }),
            });

            if (res.status === 401) {
                window.location.href = "/auth/login";
                return;
            }

            if (!res.ok) {
                throw new Error("Error al agregar al carrito");
            }

            console.log("Producto agregado");
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

  return (
    <button
      onClick={handleAddToCart}
      className="bg-black text-white py-2 px-4 rounded-[28px] w-full h-16 hover:opacity-60"
    >
      {loading ? "Agregando..." : "Agregar al carrito"}
    </button>
  );
}