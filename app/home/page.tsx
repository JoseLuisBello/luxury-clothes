/**
 * Página principal de la tienda de ropa de lujo
 * @author Diaz Antonio Luis Pedro
 * @author Hernandez Sanchez Adrien
 * @date 22/04/2026
 * Ultima modificacion: 27/04/2026
 */

"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Carrusel from "../components/Carousel";
import ProductCard from "../components/ProductCard";
import Link from "next/link"
import { Producto } from "@/types/producto/Producto";
import { ChevronLeft, ChevronRight } from "lucide-react";


export default function Home() {
  const router = useRouter();
  const [categorias, setCategorias] = useState<any[]>([]);
  const [productos, setProductos] = useState<Producto[]>([]);
  const [marcas, setMarcas] = useState<any[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const productosPorSlide = 3;
  const totalSlides = Math.ceil(productos.length / productosPorSlide);

  // consulta de 10 productos al azar
  useEffect(() => {
    fetch("/api/producto/random?limit=10")
      .then(res => res.json())
      .then(data => setProductos(data.data));
  }, []);


  //consulta de todas las marcas
  useEffect(() => {
    fetch("/api/marcas")
      .then(res => res.json())
      .then(data => setMarcas(data.data));
  }, []);

  const siguiente = () => {
    setCurrentSlide((prev) =>
      prev === totalSlides - 1 ? 0 : prev + 1
    );
  };

  const anterior = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? totalSlides - 1 : prev - 1
    );
  };

  return (
    <div className="min-h-screen bg-white text-gray-800">

      {/* seccion del carrucel, slogan, direccionamiento a productos */}
      <div className="relative w-full h-190 flex items-center justify-center">
        {/* implementacion de carruselde 5 imagenes de productos */}
        <Carrusel productos={productos} />
      </div>

      <div className="p-24 h-full w-full">
        {/* Productos destacados */}
        <div className="border">
          {/* handler y titulo */}
          <div className="flex items-center justify-between">
            <p>Productos destacados</p>

            <div className="flex items-center gap-2">
              <p>Ver todo</p>
              <button className="rounded-full border" onClick={anterior}>
                <ChevronLeft size={25} />
              </button>
              <button className="rounded-full border" onClick={siguiente}>
                <ChevronRight size={25} />
              </button>
            </div>
          </div>
          {/* Productos */}
          <div className="overflow-hidden w-full">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                width: `${totalSlides * 100}%`,
                transform: `translateX(-${currentSlide * (100 / totalSlides)}%)`,
              }}
            >
              {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                <div
                  key={slideIndex}
                  className="grid grid-cols-3 gap-6 shrink-0"
                  style={{
                    width: `${100 / totalSlides}%`,
                  }}
                >
                  {productos
                    .slice(
                      slideIndex * productosPorSlide,
                      (slideIndex + 1) * productosPorSlide
                    )
                    .map((producto) => (
                      <Link
                        href={`/productos/${producto.id}`}
                        key={producto.id}
                      >
                        <ProductCard
                          item={producto}
                          showIcon={false}
                          showToCart={false}
                        />
                      </Link>
                    ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      
    </div>
  );
}
