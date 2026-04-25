//***********/
//* Nombre del equipo: Equipo 1 */
//* Autor de la clase: Ramos Bello Jose Luis */
//* Fecha: 26/02/2026 */
//**********/
import { NextResponse } from "next/server";
import { AdministradorRepository } from "@/repositories/administrador/administrador.repository";
import { getUserFromToken } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("Datos recibidos para nuevo producto:", body);

    // 1. Validación de campos requeridos
    if (!body.nombre?.trim()) {
      return NextResponse.json(
        { error: "El campo 'nombre' es requerido y no puede estar vacío" },
        { status: 400 }
      );
    }

    if (body.precio == null) {
      return NextResponse.json(
        { error: "El campo 'precio' es requerido" },
        { status: 400 }
      );
    }

    if (body.stock == null) {
      return NextResponse.json(
        { error: "El campo 'stock' es requerido" },
        { status: 400 }
      );
    }

    // 2. Validaciones de negocio
    if (typeof body.precio !== "number" || body.precio <= 0) {
      return NextResponse.json(
        { error: "El precio debe ser un número mayor a 0" },
        { status: 400 }
      );
    }

    if (typeof body.stock !== "number" || body.stock < 0) {
      return NextResponse.json(
        { error: "El stock debe ser un número mayor o igual a 0" },
        { status: 400 }
      );
    }

    // Opcional: validar longitud del nombre
    if (body.nombre.length > 255) {
      return NextResponse.json(
        { error: "El nombre del producto no puede exceder 255 caracteres" },
        { status: 400 }
      );
    }

    // 4. Crear el producto
    const result = await AdministradorRepository.crearProducto({
      ...body,
      nombre: body.nombre.trim(), // limpiar espacios
    });

    if (!result || result.rowCount === 0) {
      return NextResponse.json(
        { error: "No se pudo crear el producto" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: "Producto creado exitosamente",
        producto: result.rows[0],
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error al crear producto:", error);

    return NextResponse.json(
      { error: "Error interno del servidor al crear el producto" },
      { status: 500 }
    );
  }
}