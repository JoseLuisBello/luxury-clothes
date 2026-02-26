/**
 * PedidoService
 * Equipo: 1
 * Autor: Abdiel
 * Fecha: 26/02/2026
 */

import { PedidoRepository } from "@/repositories/pedido/PedidoRepository";

export class PedidoService {
  static async getDetalle(idPedido: number) {
    const result = await PedidoRepository.getDetallePedido(idPedido);
    if (result.rows.length === 0) {
      throw new Error("Pedido no encontrado");
    }
    return result.rows;
  }

  static async obtenerHistorialCliente(idCliente: number) {
    return await PedidoRepository.obtenerHistorialCliente(idCliente);
  }

  
  static async obtenerComprobante(idPedido: number) {
    const result = await PedidoRepository.obtenerComprobante(idPedido);
    if (result.rows.length === 0) {
      throw new Error("Pedido no encontrado");
    }
    return result.rows;
  }
}