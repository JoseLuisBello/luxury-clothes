/**
 * @author Adrien Hernández Sánchez
 * Endpoint para obtener el filtro nuevo.
 */
import { NextResponse } from "next/server";
import { FilterV2Service } from "@/services/filtro_v2/filtro_v2.service";

/**
 * Endpoint para obtener los filtros de una categoría específica
 * @author Adrien Hernández Sánchez
 * @param req - Request con el ID de la categoría como query parameter
 * @returns Filtro de catalogo en formato JSON
 */
export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const id_categoria = searchParams.get("id_categoria");

        if (!id_categoria) {
            return NextResponse.json({ error: "ID de categoría es requerido" }, { status: 400 });
        }

        const filters = await FilterV2Service.getFilterByCategory(Number(id_categoria));

        return NextResponse.json({ ok: true, data: filters });
    } catch (error) {
        return NextResponse.json({ error: "Error al obtener los filtros" }, { status: 500 });
    }
}