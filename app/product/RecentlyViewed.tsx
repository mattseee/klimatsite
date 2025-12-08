// app/product/[id]/RecentlyViewed.tsx
'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

type ProductSummary = {
  id: number;
  name: string;
  image: string | null;
  price: number | null;
};

const STORAGE_KEY = 'recentProducts';

const formatPrice = (price: number | null) =>
  price == null ? '' : `${price.toLocaleString('ru-RU')} ₽`;

export default function RecentlyViewed({
  currentProduct,
}: {
  currentProduct: ProductSummary;
}) {
  const [items, setItems] = useState<ProductSummary[]>([]);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  // читаем / записываем localStorage
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const raw = window.localStorage.getItem(STORAGE_KEY);
    let list: ProductSummary[] = raw ? JSON.parse(raw) : [];

    // убираем текущий, если уже есть
    list = list.filter(p => p.id !== currentProduct.id);
    // добавляем в начало
    list.unshift(currentProduct);
    // лимит 12
    if (list.length > 12) list = list.slice(0, 12);

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    setItems(list);
  }, [currentProduct]);

  if (items.length <= 1) return null; // только текущий — не показываем

  const scroll = (dir: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    const delta = dir === 'left' ? -320 : 320;
    el.scrollBy({ left: delta, behavior: 'smooth' });
  };

  return (
    <section className="pt-4">
      <div className="bg-[#F7F8FB] rounded-3xl px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold">Вы смотрели</h2>
          <button className="text-xs font-semibold text-[#005BFF] hover:underline">
            Все товары
          </button>
        </div>

        <div className="relative">
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory"
          >
            {items.map(p => (
              <Link
                key={p.id}
                href={`/product/${p.id}`}
                className="min-w-[190px] max-w-[190px] snap-start flex-shrink-0 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow overflow-hidden"
              >
                <div className="relative w-full aspect-[4/5] bg-[#F7F8FB]">
                  {p.image && (
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      sizes="190px"
                      className="object-contain"
                    />
                  )}
                </div>
                <div className="p-3 space-y-1">
                  <div className="text-xs font-medium line-clamp-2">
                    {p.name}
                  </div>
                  {p.price != null && (
                    <div className="text-sm font-semibold text-gray-900">
                      {formatPrice(p.price)}
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>

          {/* стрелка вправо */}
          <button
            type="button"
            onClick={() => scroll('right')}
            className="hidden md:flex absolute top-1/2 -translate-y-1/2 right-1 h-9 w-9 items-center justify-center rounded-full bg-white shadow-md text-gray-700 hover:bg-gray-50"
          >
            ➜
          </button>
        </div>
      </div>
    </section>
  );
}
