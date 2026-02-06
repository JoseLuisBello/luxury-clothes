import { NextResponse } from 'next/server';
import { ProductService } from '@/services/ProductService';

export async function GET() {
  try {
    const products = await ProductService.getCatalog();
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al obtener catálogo' },
      { status: 500 }
    );
  }
}
