/**
 * Adrien Hernandez Sanchez
 * 2026-03-16
 * Repositorio de categorias
 */
import { pool } from "@/lib/db";

export class CategoriaRepository {
    /**
     * Obtener categorías con sus subcategorías
     * @returns Lista de categorías con sus subcategorías
     */

    static async getCategoriasConSubcategorias( id_genero: number ) {
        const { rows } = await pool.query(
            `
            SELECT 
            c.id AS id_categoria,
            c.nombre AS categoria,
            json_agg(
                jsonb_build_object(
                'id', s.id,
                'nombre', s.nombre,
                'total', s.total_productos
                )
            ) AS subcategorias
            FROM "Categoria" c
            JOIN (
            SELECT 
                s.id,
                s.nombre,
                s.id_categoria,
                COUNT(p.id) as total_productos
            FROM "Subcategoria" s
            JOIN "Producto" p ON p.id_subcategoria = s.id
            WHERE p.id_genero = $1
            GROUP BY s.id, s.nombre, s.id_categoria
            ) s ON s.id_categoria = c.id
            GROUP BY c.id, c.nombre
            ORDER BY c.id;
            `, [id_genero]
        );
        return rows;
    }
}