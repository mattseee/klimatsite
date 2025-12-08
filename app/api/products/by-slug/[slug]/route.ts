import { NextRequest, NextResponse } from 'next/server';
import { query } from '../../../../lib/db';

type CategoryRow = { id: number };

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }  // 👈 params — Promise
) {
  try {
    const { slug } = await params;                   // 👈 обязательно await

    // 1️⃣ Получаем id категории по slug
    const categoryRows = await query<CategoryRow[]>(
      'SELECT id FROM categories WHERE slug = ? LIMIT 1',
      [slug]
    );
    const category = categoryRows[0];

    if (!category) {
      return NextResponse.json({ products: [] });
    }

    // 2️⃣ Берём товары по category_id
    const products = await query<any[]>(
      `SELECT p.*, c.name as category_name
       FROM products p
       LEFT JOIN categories c ON p.category_id = c.id
       WHERE p.category_id = ?`,
      [category.id]
    );

    return NextResponse.json({ products });
  } catch (error) {
    console.error('Error fetching products by slug:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}
