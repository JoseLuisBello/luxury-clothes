//***********/
//* Nombre del equipo: Equipo 1 */
//* Autor: Ramos Bello Jose Luis */
//* Fecha: 20/04/2026 */
//**********/
import { NextResponse } from "next/server";
import { ProductoService } from "@/services/administrador/administrador.service";

export async function GET(req: Request) {
  try {

    const clientes = await ProductoService.listaClientes();

    return NextResponse.json({
      success: true,
      clientes,
      total: clientes.length,
    });
  } catch (error: any) {
    console.error("Error al listar clientes:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Error al obtener clientes" },
      { status: 500 }
    );
  }
}