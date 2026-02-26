/**
 * PedidoRepository
 * Equipo: ---
 * Autor: Abdiel
 * Fecha: 2026
 */

import { pool } from "@/lib/db";

export class PedidoRepository {

  static async getDetallePedido(idPedido: number) {

    const sql = `
      SELECT
        p.id AS pedido_id,
        pr.nombre,
        dp.cantidad,
        dp.precio_unitario
      FROM "DetallePedido" dp
      JOIN "Producto" pr ON pr.id = dp.id_producto
      JOIN "Pedido" p ON p.id = dp.id_pedido
      WHERE p.id = $1
    `;

    return await pool.query(sql, [idPedido]);
  }

  static async obtenerHistorialCliente(idCliente: number) {
    const sql = `
      SELECT 
        p.id AS id_pedido,
        p.fecha,
        p.total,
  
        pr.id AS id_producto,
        pr.nombre,
        d.cantidad,
        d.precio_unitario
  
      FROM "Pedido" p
      JOIN "DetallePedido" d 
        ON p.id = d.id_pedido
      JOIN "Producto" pr
        ON pr.id = d.id_producto
  
      WHERE p.id_cliente = $1
      ORDER BY p.fecha DESC
    `;
  
    const result = await pool.query(sql, [idCliente]);
    return result.rows;
  }

  static async obtenerComprobante(idPedido: number) {

    const sql = `
      SELECT
        p.id AS pedido_id,
        p.fecha,
        p.total,
  
        c.nombre,
        c.apellidos,
        c.correo,
  
        pr.nombre AS producto,
        d.cantidad,
        d.precio_unitario
  
      FROM "Pedido" p
  
      JOIN "Cliente" c
        ON c.id = p.id_cliente
  
      JOIN "DetallePedido" d
        ON d.id_pedido = p.id
  
      JOIN "Producto" pr
        ON pr.id = d.id_producto
  
      WHERE p.id = $1
    `;
  
    return await pool.query(sql, [idPedido]);
  }
}