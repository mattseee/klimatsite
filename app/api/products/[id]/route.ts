// app/api/products/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/app/lib/db';

export async function GET(
  request: NextRequest,
  context: { params: { id: string } }   
) {
  const { id } = context.params;
  const idNum = Number(id);

  if (!Number.isFinite(idNum)) {
    return NextResponse.json(
      { error: 'Invalid product id' },
      { status: 400 },
    );
  }

  try {
    const rows = await query<any>(
      'SELECT * FROM products WHERE id = ? LIMIT 1',
      [idNum],
    );

    const product = rows[0];

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 },
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error('API /products/[id] error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
