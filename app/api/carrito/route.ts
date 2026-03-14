/**
 * Equipo #1
 * Hernández Sánchez Adrien
 * 6 de febrero de 2026
 */
import { NextResponse } from 'next/server';
import { CarritoCompras } from "@/services/carritodecompras/carritodecompras.service";

/**
 * 
 * Obtener carrito de compras de un cliente por su ID.|
 */
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id_usuario = Number(searchParams.get('id_usuario'));
  
    const carrito = await CarritoCompras.getCart(id_usuario);
  
    return NextResponse.json({
      ok: true,
      count: carrito.length,
      data: carrito
    });

  } catch (error: any ) {
    return NextResponse.json(
      { ok: false, error: String(error) },
      { status: 500 }
    );  
  }
}

/**
 * Función para agregar un producto al carrito de compras de un cliente.
 * @param req - JSON que contiene id_usuario, id_producto, id_talla, cantidad
 * @returns boolean - True para indicar que se ha modificado 
 * la tabla de CarritoCompras
 */
export async function POST(req: Request) {
  try {
    const { id_usuario, id_producto, id_talla, cantidad } = await req.json();

    const result = await CarritoCompras.addProduct({ id_usuario, id_producto, id_talla, cantidad });

    if (!result) {
      return NextResponse.json({ ok: false, message: 'No se pudo agregar el producto al carrito' }, { status: 400 });
    }

    return NextResponse.json({ ok: result, message: 'Producto agregado al carrito' });
  } catch (error: any) {
      return NextResponse.json(
      {
        ok: false,
        error: error.message ?? 'Error interno',
      },
      { status: 500 }
    );
  }
}

/**
 * Función para eliminar un producto del carrito de compras de un cliente.
 * @param req - JSON que contiene id_usuario, id_producto, id_talla, cantidad
 * @returns boolean - True para indicar que se ha modificado 
 * la tabla de CarritoCompras
 */
export async function DELETE(req: Request) {
  try {
    const { id_usuario, id_producto, id_talla } = await req.json();
    
    const result = await CarritoCompras.deleteProduct({ id_usuario, id_producto, id_talla });

    if (!result) {
      return NextResponse.json({ ok: false, message: 'No se pudo eliminar el producto del carrito' }, { status: 400 });
    }

    return NextResponse.json({ ok: true, message: 'Producto eliminado del carrito' });

  } catch (error: any) {
      return NextResponse.json(
      {
        ok: false,
        error: error.message ?? 'Error interno',
      },
      { status: 500 }
    );
  }
}
