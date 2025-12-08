// app/product/[id]/page.tsx

import Image from 'next/image';
import { notFound } from 'next/navigation';
import { query } from '@/app/lib/db';

import ProductTabs from '../ProductTabs';
import SimilarProducts from '../SimilarProducts';
import RecentlyViewed from '../RecentlyViewed';

type DBProduct = {
  id: number;
  name: string;
  article: string | null;
  brand: string | null;
  price: number | null;
  image: string | null;
  category_id: number | null;
  category_name?: string | null;
  characteristics?: string | null;
  article_text?: string | null;
  instructions?: string | null;
  certificates?: string | null;
  drawings?: string | null;
  promo?: string | null;
  barcode?: string | null;
};

// ---------- БАЗА ----------

async function getProduct(rawId: string): Promise<DBProduct | null> {
  // если пустая строка — выходим
  if (!rawId) return null;

  const numericId = Number(rawId);
  if (!Number.isFinite(numericId)) {
    return null;
  }

  const rows = await query<DBProduct>(
    `SELECT p.*, c.name AS category_name
     FROM products p
     LEFT JOIN categories c ON p.category_id = c.id
     WHERE p.id = ?
     LIMIT 1`,
    [numericId]
  );

  return rows[0] ?? null;
}

async function getSimilarProducts(
  categoryId: number | null,
  excludedId: number | null
): Promise<DBProduct[]> {
  if (!categoryId || !excludedId) return [];

  const rows = await query<DBProduct>(
    `SELECT p.*, c.name AS category_name
     FROM products p
     LEFT JOIN categories c ON p.category_id = c.id
     WHERE p.category_id = ? AND p.id <> ?
     LIMIT 8`,
    [categoryId, excludedId]
  );

  return rows;
}

const formatPrice = (price: number | null) =>
  price == null ? '' : `${price.toLocaleString('ru-RU')} ₽`;

// ---------- СТРАНИЦА ТОВАРА ----------

type RouteParams = { id: string };

type ProductPageProps = {
  // ВАЖНО: в Next 16 params — Promise
  params: Promise<RouteParams>;
};

export default async function ProductPage({ params }: ProductPageProps) {
  // сначала достаём id из промиса
  const { id } = await params;

  const product = await getProduct(id);

  if (!product) {
    notFound();
  }

  const similar = await getSimilarProducts(product.category_id, product.id);

  const recentSummary = {
    id: product.id,
    name: product.name,
    price: product.price,
    image: product.image,
  };

  return (
    <div className="bg-[#F7F8FB]">
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-12">
        {/* ВЕРХНИЙ БЛОК: фото + правая колонка */}
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1.3fr)]">
          {/* Фото товара */}
          <div className="bg-white rounded-3xl p-6 shadow-sm flex flex-col gap-4">
            <div className="relative w-full aspect-[4/3] rounded-3xl bg-[#F7F8FB] overflow-hidden flex items-center justify-center">
              {product.image && (
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="600px"
                  className="object-contain"
                />
              )}
            </div>
            {/* сюда можно добавить мини-превью, если позже будут доп. фото */}
          </div>

          {/* Правая колонка: инфо + бренд */}
          <div className="space-y-4">
            {/* Основная информация и покупка */}
            <div className="bg-white rounded-3xl p-6 shadow-sm space-y-4">
              <div className="text-xs text-gray-400 flex items-center justify-between gap-4">
                <div>
                  Код товара:{' '}
                  <span className="text-gray-700 font-medium">
                    {product.barcode || product.article || product.id}
                  </span>
                </div>
              </div>

              <h1 className="text-2xl lg:text-3xl font-semibold leading-snug">
                {product.name}
              </h1>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <div className="text-3xl font-semibold text-gray-900">
                  {formatPrice(product.price)}
                </div>
                <div className="text-xs text-gray-500">
                  Цены указаны для розничных клиентов
                </div>
              </div>

              {/* Краткие характеристики */}
              <div className="grid grid-cols-2 gap-4 text-xs text-gray-600 pt-4 border-t border-dashed border-gray-200">
                <div>
                  <div className="text-gray-400 mb-1">Гарантийный срок</div>
                  <div className="font-medium">2 года</div>
                </div>
                <div>
                  <div className="text-gray-400 mb-1">Бренд</div>
                  <div className="font-medium">
                    {product.brand || 'Не указан'}
                  </div>
                </div>
                <div>
                  <div className="text-gray-400 mb-1">Категория</div>
                  <div className="font-medium">
                    {product.category_name || '—'}
                  </div>
                </div>
                <div>
                  <div className="text-gray-400 mb-1">Артикул</div>
                  <div className="font-medium">{product.article || '—'}</div>
                </div>
              </div>

              {/* Кнопки */}
              <div className="flex flex-wrap gap-3 pt-4">
                <button className="flex-1 min-w-[160px] h-11 rounded-full bg-[#005BFF] text-white text-sm font-medium hover:bg-[#0047cc] transition">
                  В корзину
                </button>
                <button className="flex-1 min-w-[160px] h-11 rounded-full border border-[#E3E5EB] text-sm font-medium hover:bg-[#F5F6FA] transition">
                  Купить в 1 клик
                </button>
              </div>

              {/* Подписи под кнопками */}
              <div className="grid grid-cols-2 gap-4 pt-4 text-[11px] text-gray-500">
                <div>
                  Самовывоз:{' '}
                  <span className="text-[#005BFF]">
                    11 декабря из 1 магазина
                  </span>
                </div>
                <div>
                  Доставка:{' '}
                  <span className="text-gray-700">Сегодня, 590 ₽</span>
                </div>
              </div>
            </div>

            {/* Карточка бренда */}
            <div className="bg-white rounded-3xl p-6 shadow-sm flex items-center justify-between gap-4">
              <div>
                <div className="text-xs text-gray-400 mb-1">Бренд</div>
                <div className="text-sm font-semibold uppercase tracking-wide">
                  {product.brand || 'Не указан'}
                </div>
                <button className="mt-1 text-xs text-[#005BFF] font-medium hover:underline">
                  Все товары бренда
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ТАБЫ: описание / характеристики / документация */}
        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <ProductTabs product={product} />
        </div>

        {/* ПОХОЖИЕ ТОВАРЫ */}
        {similar.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Похожие товары</h2>
            <SimilarProducts products={similar} />
          </div>
        )}

        {/* ВЫ СМОТРЕЛИ */}
        <RecentlyViewed currentProduct={recentSummary} />
      </div>
    </div>
  );
}
