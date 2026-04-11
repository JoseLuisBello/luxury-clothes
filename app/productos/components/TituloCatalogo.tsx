import Image from "next/image";

export default function TituloCatalogo({
    title,
    count,
} : { title: string; count: number }) {
    return (
        // {/* titulo y apartado de filtro */}
        <div className="flex w-full justify-between mb-4">
        <div className="text-3xl font-medium">
            <p>{title} ({count}) </p>
        </div>

        <div className="flex items-center space-x-2">
            <div className="text-xl">
            <p>Mostrar Filtros</p>
            </div>

            <div>
            <Image
                src="/assets/images/filter.svg"
                alt="Filtros"
                width={27}
                height={27}
            />
            </div>
        </div>
        </div>
    );
}