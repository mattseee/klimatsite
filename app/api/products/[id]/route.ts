// app/api/products/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/app/lib/db';

export async function GET(
  req: NextRequest,
  // ⬇️ тут ВАЖНО: params НЕ Promise, просто объект
  { params }: { params: { id: string } }
) {
  const idNum = Number(params.id);

  if (!Number.isFinite(idNum)) {
    return NextResponse.json(
      { error: 'Invalid product id' },
      { status: 400 }
    );
  }

  const rows = await query<any>(
    'SELECT * FROM products WHERE id = ? LIMIT 1',
    [idNum],
  );

  const product = rows[0];

  if (!product) {
    return NextResponse.json(
      { error: 'Product not found' },
      { status: 404 }
    );
  }

  return NextResponse.json(product);
}
