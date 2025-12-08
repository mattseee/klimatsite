'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

type Suggestion = {
  id: number;
  name: string;
  last_part?: string;
};

type Product = {
  id: number;
  name: string;
  article: string | null;
  price: number | null;
  image: string | null;
  brand: string | null;
  category_name: string | null;
};

type Brand = {
  name: string;
  total: number;
};

type SearchResponse = {
  suggestions: Suggestion[];
  products: Product[];
  brands: Brand[];
};

export default function Search() {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<SearchResponse>({
    suggestions: [],
    products: [],
    brands: [],
  });

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const queryLower = query.toLowerCase();

  // Закрытие по клику вне
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Debounce-поиск
  useEffect(() => {
    if (!query.trim()) {
      setData({ suggestions: [], products: [], brands: [] });
      return;
    }

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/search?q=${encodeURIComponent(query.trim())}`);
        if (!res.ok) {
          setData({ suggestions: [], products: [], brands: [] });
          return;
        }
        const json = (await res.json()) as SearchResponse;
        setData(json);
      } catch (e) {
        console.error('Search fetch error', e);
        setData({ suggestions: [], products: [], brands: [] });
      } finally {
        setLoading(false);
      }
    }, 250);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [query]);

  const prettyPrice = (price: number | null) =>
    price == null ? '' : `${price.toLocaleString('ru-RU')} ₽`;

  // Подсветка совпадения в тексте
  const highlight = (text: string) => {
    const idx = text.toLowerCase().indexOf(queryLower);
    if (idx === -1 || !queryLower) return text;
    const before = text.slice(0, idx);
    const match = text.slice(idx, idx + query.length);
    const after = text.slice(idx + query.length);
    return (
      <>
        {before}
        <span className="bg-yellow-100">{match}</span>
        {after}
      </>
    );
  };

  // Категории для блока "Категории" (берём первые 3)
  const categoryCards = data.suggestions.slice(0, 3).map(cat => {
    const productForImage = data.products.find(
      p => p.category_name === cat.name
    );
    return { cat, productForImage };
  });

  // Первые товары (6 штук)
  const productCards = data.products.slice(0, 6);

  // Бренды (из API)
  const brandCards = data.brands.slice(0, 4);

  return (
    <div className="relative w-full max-w-5xl mx-auto" ref={containerRef}>
      <input
        type="text"
        value={query}
        onChange={e => {
          setQuery(e.target.value);
          if (!open) setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        placeholder="Найдите бак, насос, клапан…"
        className="w-full rounded-[10px] border border-[#E7E7E7] px-4 py-2 text-sm outline-none bg-white shadow-sm"
      />

      {open && query.trim() && (
        <div className="
      absolute left-1/2 -translate-x-1/2
      mt-2 w-[1100px] max-w-[96vw]
      rounded-3xl bg-white shadow-2xl border border-gray-100
      z-50 overflow-hidden">
          {/* Внутренний контент как отдельная страничка */}
          <div className="flex gap-8 p-6 max-h-[75vh] overflow-y-auto">
            {/* ЛЕВАЯ КОЛОНКА — подсказки запросов */}
            <div className="w-1/4 min-w-[230px] space-y-3">
              <div className="text-xs font-semibold text-gray-400">
                Запросы
              </div>

              {loading && (
                <div className="text-xs text-gray-400">Ищу…</div>
              )}

              {!loading && data.suggestions.length === 0 && (
                <div className="text-xs text-gray-400">
                  Ничего не найдено
                </div>
              )}

              <ul className="space-y-1 text-sm">
                {data.suggestions.slice(0, 8).map(s => (
                  <li
                    key={s.id}
                    className="cursor-pointer rounded-lg px-2 py-1 hover:bg-gray-50"
                  >
                    {highlight(s.name)}
                  </li>
                ))}
              </ul>
            </div>

            {/* ПРАВАЯ ОБЛАСТЬ — Категории / Товары / Бренды */}
            <div className="flex-1 space-y-8">
              {/* КАТЕГОРИИ */}
              {categoryCards.length > 0 && (
                <section className="space-y-3">
                  <div className="text-xs font-semibold text-gray-400">
                    Категории
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {categoryCards.map(({ cat, productForImage }) => (
                      <div
                        key={cat.id}
                        className="flex items-center gap-3 rounded-2xl border border-gray-100 px-3 py-3 hover:shadow-md transition-shadow cursor-pointer"
                      >
                        <div className="relative w-14 h-14 rounded-xl bg-gray-50 overflow-hidden flex-shrink-0">
                          {productForImage?.image && (
                            <Image
                              src={productForImage.image}
                              alt={cat.name}
                              fill
                              sizes="80px"
                              className="object-contain"
                            />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium line-clamp-2">
                            {highlight(cat.name)}
                          </div>
                          {/* В будущем можно подставить реальное количество товаров */}
                          <div className="text-xs text-gray-400 mt-0.5">
                            Категория каталога
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* ТОВАРЫ */}
              <section className="space-y-3">
                <div className="text-xs font-semibold text-gray-400">
                  Товары
                </div>

                {loading && (
                  <div className="text-xs text-gray-400">
                    Загружаем товары…
                  </div>
                )}

                {!loading && productCards.length === 0 && (
                  <div className="text-xs text-gray-400">
                    Товаров не найдено
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {productCards.map(product => (
                    <Link
                      key={product.id}
                      href={`/product/${product.id}`} // если у тебя другой путь к товару — поправь здесь
                      className="flex flex-col rounded-2xl border border-gray-100 p-3 hover:shadow-md transition-shadow bg-white"
                      onClick={() => setOpen(false)}
                    >
                      <div className="relative w-full aspect-[3/4] bg-gray-50 rounded-xl overflow-hidden">
                        {product.image && (
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            sizes="200px"
                            className="object-contain"
                          />
                        )}
                      </div>

                      <div className="mt-2 text-[11px] text-gray-400 line-clamp-1">
                        {product.category_name}
                      </div>
                      <div className="text-sm font-medium line-clamp-2">
                        {highlight(product.name)}
                      </div>
                      {product.article && (
                        <div className="text-[10px] text-gray-400 mt-0.5">
                          Арт. {product.article}
                        </div>
                      )}
                      {product.price != null && (
                        <div className="mt-1 text-sm font-semibold text-gray-900">
                          {prettyPrice(product.price)}
                        </div>
                      )}
                    </Link>
                  ))}
                </div>
              </section>

              {/* БРЕНДЫ */}
              {brandCards.length > 0 && (
                <section className="space-y-3">
                  <div className="text-xs font-semibold text-gray-400">
                    Бренды
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {brandCards.map(brand => (
                      <div
                        key={brand.name}
                        className="flex items-center justify-center rounded-2xl border border-gray-100 px-4 py-2 bg-gray-50 text-sm font-medium text-gray-700"
                      >
                        {brand.name}
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* ССЫЛКА "ПОСМОТРЕТЬ ВСЕ РЕЗУЛЬТАТЫ" */}
              <div className="pt-2">
                <button
                  type="button"
                  className="mx-auto flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700"
                >
                  ПОСМОТРЕТЬ ВСЕ РЕЗУЛЬТАТЫ
                  <span className="text-[12px]">➜</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
