/**
 * Equipo #1
 * Hernández Sánchez Adrien
 * 6 de febrero de 2026
 */

import { pool } from '@/lib/db';

export class Producto {

  /**
   * Retrieves all products, optionally filtered by gender, category, subcategory, or brand.
   * 
   * @param param0 - Object containing optional filter parameters:
   *   - id_genero?: number - Filter by gender ID.
   *   - id_categoria?: number - Filter by category ID.
   *   - id_subcategoria?: number - Filter by subcategory ID.
   *   - id_marca?: number - Filter by brand ID.
   * @returns Promise resolving to an array of products with basic details.
   */
  static async getAllProducts( {
    id_genero,
    id_categoria,
    id_subcategoria,
    id_marca
  }: {
    id_genero?: number;
    id_categoria?: number;
    id_subcategoria?: number;
    id_marca?: number;
  }) {

    const conditions: string[] = [];
    const values: any[] = [];

    if (id_genero) {
      values.push(id_genero);
      conditions.push(`P.id_genero = $${values.length}`);
    }

    if (id_categoria) {
      values.push(id_categoria);
      conditions.push(`P.id_categoria = $${values.length}`);
    }

    if (id_subcategoria) {
      values.push(id_subcategoria);
      conditions.push(`P.id_subcategoria = $${values.length}`);
    }

    if (id_marca) {
      values.push(id_marca);
      conditions.push(`P.id_marca = $${values.length}`);
    }

    const whereClause = conditions.length
      ? `AND ${conditions.join(' AND ')}`
      : '';

    const query = `
      SELECT DISTINCT ON (P.id)
        P.id,
        P.nombre,
        P.precio,
        M.nombre AS marca,
        I.url AS imagen_url
      FROM "Producto" P
      INNER JOIN "Marca" M ON P.id_marca = M.id
      INNER JOIN "ImagenProducto" I ON P.id = I.id_producto
      WHERE P.activo = true 
      ${whereClause}
      ORDER BY P.id
      `
    const { rows } = await pool.query(query, values);

    return rows;
  }

  static async productDetails(productId: number){
    const { rows } = await pool.query(
      `
      SELECT
        P.id AS id,
        P.nombre AS nombre,
        P.precio AS precio,
        P.stock AS stock,
        M.nombre AS marca,
        array_agg(I.url) AS imagenes
      FROM "Producto" P
      LEFT JOIN "ImagenProducto" I ON P.id = I.id_producto
      LEFT JOIN "Marca" M ON P.id_marca = M.id
      WHERE P.id = $1
      GROUP BY P.id, P.nombre, P.precio, P.stock, M.nombre;

      `,
      [productId]
    );

    return rows[0];
  }
}
