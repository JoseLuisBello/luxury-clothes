// # Gestion de productos guardados (Ver, aumentar, agregar a carrito, comprar, eliminar)
/**
 * Equipo #1
 * Valeriano López Magali Natividad
 * 10 de Abril de 2026
*/

"use client";

import { useEffect, useRef, useState } from "react";
import ProductCard from "@/app/components/ProductCard";
import { ListaDeDeseos } from "@/types/listadedeseos/ListaDeDeseos";
import { exec } from "child_process";

export default function ListadeseosPage() {
  const [products, setProducts] = useState<ListaDeDeseos[]>([]);
  const [loading, setLoading] = useState(true);

  //obtener el id del producto a eliminar
  const [productIdToRemove, setProductIdToRemove] = useState<number | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    loadWishlist();
  }, []);

  const loadWishlist = async () => {
    try {
      const res = await fetch("/api/listadeseos", {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        });
        // const { data } = await fetch("/api/listadeseos?clientId=1").then((res) => res.json()); 
        const { data } = await res.json();

        setProducts(data);
      } catch (error) {
        console.error("Error cargando wishlist:", error);
      } finally {
        setLoading(false);
      }
    };

    //loadWishlist();
    
    const handleRemoveFavorite = (productId: number) => {
      if(productIdToRemove) removeFavorite(productIdToRemove);
      setProductIdToRemove(productId);

      timerRef.current = setTimeout(() => {
        removeFavorite(productId);
      }, 5000);
    };

    const removeFavorite = async (productId: number) => {
    try {
      const res = await fetch("/api/listadeseos", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ productId }),
      });
      console.log("TOKEN:", localStorage.getItem("token"));

      if (res.ok) {
        setProducts((prev) => prev.filter((p) => p.id !== productId));
      } else {
        console.error("Error eliminando producto de favoritos");
      }
    } catch (error) {
      console.error("Error eliminando producto de favoritos:", error);
    }
  };

  const handleUndo = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setProductIdToRemove(null);
  };

  if (loading) {
    return (
      <div className="p-10">
        <p>Cargando favoritos... </p>
      </div>
    );
  }

  return (
    <div className="pl-16 pt-12 pr-16 pb-12">
      <h1 className=" mb-6 font-normal text-xl">
        Favoritos 
      </h1>

      {products.length === 0 ? (
        <p>No tienes productos en tu lista de deseos</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              showToCart={true}
              showIcon={true}
              onRemoveFavorite={removeFavorite}
            />
          ))}
        </div>
      )}
    </div>
  );
}