import { NextRequest, NextResponse } from 'next/server';
import { query } from '../../lib/db';

type ProductSearchRow = {
  id: number;
  name: string;
  article: string | null;
  price: number | null;
  image: string | null;
  brand: string | null;
  category_name: string | null;
};

type SuggestionRow = {
  id: number;
  name: string;
  last_part: string;
};

type BrandRow = {
  brand: string | null;
  total: number;
};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const raw = (searchParams.get('q') || '').trim();

    if (!raw) {
      return NextResponse.json({ suggestions: [], products: [], brands: [] });
    }

    const q = raw.toLowerCase();
    const like = `%${q}%`;

    // 1) Категории, отсортированные по релевантности
    const suggestions = await query<SuggestionRow[]>(`
      SELECT
        id,
        name,
        LOWER(SUBSTRING_INDEX(name, ' - ', -1)) AS last_part
      FROM categories
      WHERE LOWER(name) LIKE ?
      ORDER BY
        (LOWER(SUBSTRING_INDEX(name, ' - ', -1)) LIKE ?) DESC,
        LENGTH(name),
        name
      LIMIT 10
    `, [like, like]);

    // 2) Товары, отсортированные по вхождению и длине
    const products = await query<ProductSearchRow[]>(`
      SELECT
        p.id,
        p.name,
        p.article,
        p.price,
        p.image,
        p.brand,
        c.name AS category_name
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE LOWER(p.name)   LIKE ?
         OR LOWER(p.article) LIKE ?
      ORDER BY
        LOCATE(?, LOWER(p.name)),
        LENGTH(p.name)
      LIMIT 40
    `, [like, like, q]);

    // 3) Бренды, по количеству найденных товаров
    const brandsRaw = await query<BrandRow[]>(`
      SELECT
        p.brand,
        COUNT(*) AS total
      FROM products p
      WHERE (LOWER(p.name) LIKE ? OR LOWER(p.article) LIKE ?)
        AND p.brand IS NOT NULL AND p.brand <> ''
      GROUP BY p.brand
      ORDER BY total DESC
      LIMIT 8
    `, [like, like]);

    const brands = brandsRaw
      .filter(b => b.brand)
      .map(b => ({ name: b.brand as string, total: b.total }));

    return NextResponse.json({ suggestions, products, brands });
  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json(
      { suggestions: [], products: [], brands: [] },
      { status: 500 }
    );
  }
}
