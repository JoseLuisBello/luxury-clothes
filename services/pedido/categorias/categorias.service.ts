/**
 * Adrien Hernandez Sanchez
 * 2026-03-16
 * Servicio de categorias
 */

import { CategoriaRepository } from "@/repositories/producto/categoria/categoria.repository";

export class CategoriaService {
    /**
     * Obtener categorías con sus subcategorías
     * @returns Lista de categorías con sus subcategorías
     */
    static async getCategoriasConSubcategorias(id_genero: number) {
        return await CategoriaRepository.getCategoriasConSubcategorias(id_genero);
    }
}