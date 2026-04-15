/**
 * Adrien Hernandez Sanchez
 * 2026-03-16
 * Endpoint de categorias
 */

import { NextResponse } from "next/server";
import { CategoriaService } from "@/services/pedido/categorias/categorias.service";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id_genero = Number(searchParams.get("id_genero"));

        const categorias = await CategoriaService.getCategoriasConSubcategorias(id_genero);

        if (!categorias || categorias.length === 0) {
            throw new Error("No se encontraron categorías");
        }

        return NextResponse.json(
            {
                ok: true,
                data: categorias,
            }
        );
    } catch (error) {
        console.error("Error al obtener categorías:", error);
        return NextResponse.json(
            {
                ok: false,
                message: "Error al obtener categorías",
            }
        );
    }
}