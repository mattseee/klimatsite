// app/product/[id]/SimilarProducts.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';

type Product = {
  id: number;
  name: string;
  image: string | null;
  price: number | null;
  article: string | null;
};

const formatPrice = (price: number | null) =>
  price == null ? '' : `${price.toLocaleString('ru-RU')} ₽`;

export default function SimilarProducts({ products }: { products: Product[] }) {
  if (!products.length) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {products.map(p => (
        <Link
          key={p.id}
          href={`/product/${p.id}`}
          className="flex flex-col rounded-3xl bg-white shadow-sm hover:shadow-md transition-shadow overflow-hidden"
        >
          <div className="relative w-full aspect-[4/5] bg-[#F7F8FB]">
            {p.image && (
              <Image
                src={p.image}
                alt={p.name}
                fill
                sizes="260px"
                className="object-contain"
              />
            )}
          </div>
          <div className="p-4 flex flex-col gap-1">
            <div className="text-[11px] text-gray-400">
              {p.article ? `Код: ${p.article}` : '\u00A0'}
            </div>
            <div className="text-sm font-medium line-clamp-2">{p.name}</div>
            {p.price != null && (
              <div className="mt-1 text-sm font-semibold text-gray-900">
                {formatPrice(p.price)}
              </div>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
}
