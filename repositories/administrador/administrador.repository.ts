//***********/
//* Nombre del equipo: Equipo 1 */
//* Autor de la clase: Ramos Bello Jose Luis */
//* Fecha: 23/02/2026 */
//**********/
import { pool } from '@/lib/db';
import { QueryResult } from 'pg';

interface ProductoInput {
  nombre?: string;
  precio?: number;
  stock?: number;
  estaActivo?: boolean;
  marca?: string;
  categorias?: string[] | number[] | null;
}

export class AdministradorRepository {

  //************************************/
  // Eliminar producto
  //************************************/

  static async desactivarProducto(id: number): Promise<QueryResult> {
    return pool.query(
      `UPDATE "Producto"
       SET estaActivo = false
       WHERE id = $1 AND estaActivo = true
       RETURNING id`,
      [id]
    );
  }

  //************************************/
  // Agregar producto
  //************************************/

  static async crearProducto(data: ProductoInput): Promise<QueryResult> {
    const {
      nombre,
      precio,
      stock,
      estaActivo = true,
      marca = null,
      categorias = null,
    } = data;

    return pool.query(
      `INSERT INTO "Producto" (nombre, precio, stock, estaActivo, marca, categorias)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id, nombre, precio, stock, estaActivo, marca, categorias`,
      [nombre, precio, stock, estaActivo, marca, categorias]
    );
  }

  //************************************/
  // Modificar producto
  //************************************/

  static async actualizarProducto(id: number, data: ProductoInput): Promise<QueryResult> {
    if (Object.keys(data).length === 0) {
      throw new Error("No se enviaron campos para actualizar");
    }
    const fields: string[] = [];
    const values: any[] = [];
    let paramIndex = 1;
    if (data.nombre !== undefined) {
      fields.push(`nombre = $${paramIndex++}`);
      values.push(data.nombre);
    }
    if (data.precio !== undefined) {
      fields.push(`precio = $${paramIndex++}`);
      values.push(data.precio);
    }
    if (data.stock !== undefined) {
      fields.push(`stock = $${paramIndex++}`);
      values.push(data.stock);
    }
    if (data.estaActivo !== undefined) {
      fields.push(`estaActivo = $${paramIndex++}`);
      values.push(data.estaActivo);
    }
    if (data.marca !== undefined) {
      fields.push(`marca = $${paramIndex++}`);
      values.push(data.marca);
    }
    if (data.categorias !== undefined) {
      fields.push(`categorias = $${paramIndex++}`);
      values.push(data.categorias);
    }

    values.push(id);

    const query = `
      UPDATE "Producto"
      SET ${fields.join(", ")}
      WHERE id = $${paramIndex} AND estaActivo = true
      RETURNING id, nombre, precio, stock, estaActivo, marca, categorias
    `;

    return pool.query(query, values);
  }

  //************************************/
  // Lista de Clientes
  //************************************/

  static async obtenerClientesActivos(): Promise<QueryResult> {
    return pool.query(
      `SELECT id, nombre 
       FROM "Cliente"
       WHERE estaActivo = true
       ORDER BY nombre ASC`
    );
  }

  //************************************/
  // Historial de ventas
  //************************************/

  static async obtenerHistorialVentas(): Promise<QueryResult> {
    return pool.query(
      `SELECT 
         pr.id AS id_producto,
         pr.nombre AS nombre_producto,
         SUM(dp.cantidad) AS cantidad_total_vendida,
         COUNT(DISTINCT p.id) AS numero_pedidos
       FROM "DetallePedido" dp
       JOIN "Producto" pr ON dp.id_producto = pr.id
       JOIN "Pedido" p ON dp.id_pedido = p.id
       WHERE p.estado NOT IN ('cancelado')  -- Opcional: excluir cancelados
       GROUP BY pr.id, pr.nombre
       ORDER BY cantidad_total_vendida DESC`
    );
  }
}