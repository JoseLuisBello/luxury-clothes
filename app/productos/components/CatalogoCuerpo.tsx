import Link from "next/link"
import ProductCard from "@/app/components/ProductCard"
import { Producto } from "@/types/producto/Producto";

export default function CatalogoCuerpo( productos: Producto[] ) {
    return (
        // {/* Contenedor principal para productos cards */}
        <div className="grid grid-cols-3 gap-3.5">
        {productos.map((producto: Producto) => (
            <Link
            key={producto.id}
            href={`/productos/${producto.id}`}
            className="hover:shadow-xl transition-shadow"
            >
            <ProductCard
                key={producto.id}
                isFavorite={false}
                showIcon={false}
                showToCart={false}
                item={producto}
            />
            </Link>
        ))}
        </div>
    );
}