/**
 * Equipo #1
 * Hernández Sánchez Adrien
 * 6 de febrero de 2026
 */
import { NextResponse } from 'next/server';
import { CarritoCompras } from "@/services/CarritoCompras";


export async function PUT(
  req: Request,
  { params }: { params: { productoId: string } }
) {
  try {
    const { clienteId, cantidad, flag } = await req.json();
    const productoId = Number(params.productoId);

    if (flag === 'increase') {
        await CarritoCompras.increaseQuantityProduct(clienteId, productoId, cantidad);
    } else if (flag === 'decrease') {
        await CarritoCompras.decreaseQuantityProduct(clienteId, productoId, cantidad);
    } else {
        throw new Error('Flag inválida. Debe ser "increase" o "decrease".');
    }

    return NextResponse.json({
      ok: true,
      message: 'Cantidad actualizada',
    });

  } catch (error: any) {
    console.error('PUT /api/carrito/[productoId]', error);

    return NextResponse.json(
      {
        ok: false,
        error: error.message ?? 'Error al actualizar cantidad',
      },
      { status: 500 }
    );
  }
}


export async function DELETE(
  req: Request,
  { params }: { params: { productoId: string } }
) {
  try {
    const { clienteId } = await req.json();
    const productoId = Number(params.productoId);

    await CarritoCompras.deleteProduct(clienteId, productoId);

    return NextResponse.json({
      ok: true,
      message: 'Producto eliminado del carrito',
    });
  } catch (error: any) {
    console.error('DELETE /api/carrito/[productoId]', error);

    return NextResponse.json(
      {
        ok: false,
        error: error.message ?? 'Error al eliminar producto del carrito',
      },
      { status: 500 }
    );
  }
}

