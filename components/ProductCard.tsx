// components/ProductCard.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

interface ProductCardProps {
  id: number;
  name: string;
  price: number | null;
  oldPrice?: number | null;
  imageUrl?: string | null;
  categoryId?: number | null;
  isNew?: boolean;
  isSale?: boolean;
}

export default function ProductCard({
  id,
  name,
  price,
  oldPrice,
  imageUrl,
  isNew = false,
  isSale = false,
}: ProductCardProps) {
  const [imageError, setImageError] = useState(false);

  const finalPrice = price ?? 0;
  const hasOldPrice =
    typeof oldPrice === 'number' &&
    oldPrice > 0 &&
    oldPrice > finalPrice;

  const discount =
    hasOldPrice && oldPrice
      ? Math.round(((oldPrice - finalPrice) / oldPrice) * 100)
      : 0;

  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white transition-all duration-300 hover:border-[#FF8A3D]/60 hover:shadow-lg">
      {/* БЕЙДЖИ */}
      {(isNew || (isSale && discount > 0)) && (
        <div className="pointer-events-none absolute left-2 top-2 z-10 flex flex-col gap-1">
          {isNew && (
            <span className="rounded-full bg-green-500 px-2 py-[2px] text-[11px] font-medium text-white">
              Новинка
            </span>
          )}
          {isSale && discount > 0 && (
            <span className="rounded-full bg-red-500 px-2 py-[2px] text-[11px] font-medium text-white">
              -{discount}%
            </span>
          )}
        </div>
      )}

      {/* КАРТИНКА */}
      <Link href={`/product/${id}`} className="flex-grow">
        <div className="relative block aspect-[4/3] w-full overflow-hidden bg-gray-50">
          {imageUrl && !imageError ? (
            <Image
              src={imageUrl}
              alt={name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-contain transition-transform duration-300 group-hover:scale-105"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-gray-300">
              <svg
                className="h-10 w-10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="9" cy="9" r="1.5" />
                <path d="M21 16l-4.5-4.5L9 19l-3-3L3 19" />
              </svg>
            </div>
          )}
        </div>
      </Link>

      {/* ТЕКСТ И КНОПКА */}
      <div className="flex flex-col px-4 pb-4 pt-3">
        <Link href={`/product/${id}`} className="flex-grow">
          <h3 className="line-clamp-2 text-sm font-medium text-gray-900 transition-colors group-hover:text-[#FF8A3D]">
            {name}
          </h3>
        </Link>

        {/* ЦЕНА */}
        <div className="mt-3 mb-3 flex items-baseline gap-2">
          <span className="text-lg font-bold text-gray-900">
            {finalPrice.toLocaleString('ru-RU')} ₽
          </span>
          {hasOldPrice && oldPrice && (
            <span className="text-xs text-gray-400 line-through">
              {oldPrice.toLocaleString('ru-RU')} ₽
            </span>
          )}
        </div>

        {/* КНОПКА */}
        <button
          type="button"
          className="w-full rounded-lg bg-[#FF8A3D] px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-[#FF7A2D]"
        >
          В корзину
        </button>
      </div>
    </div>
  );
}
