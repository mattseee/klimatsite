"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import Container from "../components/Container";

const categorySlides = [
  {
    slug: "climate",
    title: "Климатическое оборудование",
    href: "/catalog?category=climate",
    image: "/cat-climate.jpg",
    description:
      "Кондиционеры, сплит-системы и вентиляция для дома и офиса.",
  },
  {
    slug: "doors",
    title: "Двери",
    href: "/catalog?category=doors",
    image: "/cat-doors.jpg",
    description: "Входные и межкомнатные двери премиум-класса.",
  },
  {
    slug: "tile",
    title: "Плитка и отделка",
    href: "/catalog?category=tile",
    image: "/cat-tile.jpg",
    description:
      "Напольная и настенная плитка для ванных, кухонь и коридоров.",
  },
  {
    slug: "materials",
    title: "Монтажные материалы",
    href: "/catalog?category=materials",
    image: "/cat-materials.jpg",
    description: "Клеи, герметики и расходные материалы для монтажа.",
  },
];

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState(0);
  const currentCategory = categorySlides[activeCategory];

  return (
    <div className="pb-20">
      <Container>
        {/* HERO — градиентный баннер без слайдера */}
  
  <section className="relative overflow-hidden mt-8">
    
  <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] items-center">
    {/* Текстовая часть */}
    <div className="space-y-6 max-w-xl lg:ml-12 xl:ml-20">

      <h1 className="text-4xl lg:text-5xl font-semibold leading-tight">
        Оборудование и материалы для климата, дверей и отделки
      </h1>
      <p className="text-lg text-black/60">
        Подбор техники и материалов для дома и бизнеса: климатические системы,
        двери, плитка и монтажные решения в одном месте.
      </p>

      <div className="flex flex-wrap gap-3">
        <Link
          href="/catalog"
          className="inline-flex items-center justify-center px-6 py-3 rounded-[999px] bg-[#FF8A3D] text-white text-sm font-medium hover:bg-[#ff7a1f] transition shadow-sm"
        >
          Перейти в каталог
        </Link>
        <Link
          href="/contacts"
          className="inline-flex items-center justify-center px-6 py-3 rounded-[999px] border border-black/10 text-sm font-medium text-black hover:bg-black/[0.03] transition"
        >
          Получить консультацию
        </Link>
      </div>
    </div>

    {/* Визуальная часть справа */}
    <div className="relative w-full max-w-xl lg:max-w-2xl ml-auto">
      <div className="relative rounded-[32px] overflow-hidden shadow-xl bg-gradient-to-br from-[#f9f9f9] via-[#f2f2f2] to-[#e7e7e7] border border-white/70 aspect-[4/3]">
        <Image
          src="/hero-interior-doors.jpg"
          alt="Современный интерьер с дверью и климатической техникой"
          fill
          className="object-cover"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/12 via-transparent to-transparent" />
      </div>
    </div>
  </div>
</section>



        {/* КАТЕГОРИИ: слайдер по категориям + квадратные кнопки */}
        <section className="py-16 space-y-10">
          {/* Большое изображение выбранной категории */}
          <div className="relative w-full rounded-[24px] bg-[#f5f5f5] border border-[#f0f0f0] aspect-[16/5] overflow-hidden">
            <Link href={currentCategory.href} className="block w-full h-full">
              <Image
                src={currentCategory.image}
                alt={currentCategory.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/5" />
              <div className="absolute left-6 bottom-6 max-w-lg text-white space-y-1">
                <div className="text-xs uppercase tracking-[0.18em] text-white/70">
                  Категория
                </div>
                <h3 className="text-xl md:text-2xl font-semibold">
                  {currentCategory.title}
                </h3>
                <p className="text-sm md:text-base text-white/80">
                  {currentCategory.description}
                </p>
              </div>
            </Link>

            {/* Стрелки переключения категории */}
            <button
              onClick={() =>
                setActiveCategory(
                  (prev) =>
                    (prev - 1 + categorySlides.length) % categorySlides.length
                )
              }
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white flex items-center justify-center shadow-sm"
            >
              ‹
            </button>
            <button
              onClick={() =>
                setActiveCategory(
                  (prev) => (prev + 1) % categorySlides.length
                )
              }
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white flex items-center justify-center shadow-sm"
            >
              ›
            </button>
          </div>

          {/* Квадратные кнопки категорий снизу */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-16 justify-items-center">
            {categorySlides.map((cat, index) => {
              const Icon =
                index === 0
                  ? ClimateIcon
                  : index === 1
                  ? DoorIcon
                  : index === 2
                  ? WrenchIcon
                  : ShieldIcon;

              const isActive = index === activeCategory;

              return (
                <Link
                  key={cat.slug}
                  href={cat.href}
                  onMouseEnter={() => setActiveCategory(index)}
                  className="group flex flex-col items-center gap-3 text-center"
                >
                  <div
                    className={`w-16 h-16 md:w-20 md:h-20 flex items-center justify-center rounded-2xl border transition shadow-sm ${
                      isActive
                        ? "border-[#FF8A3D] bg-white shadow-md scale-105"
                        : "border-[#E2E2E2] bg-white group-hover:border-[#FF8A3D]/70 group-hover:scale-105"
                    }`}
                  >
                    <Icon className="w-7 h-7 text-black/70 group-hover:text-black" />
                  </div>
                  <span className="text-sm font-medium max-w-[150px] leading-snug">
                    {cat.title}
                  </span>
                </Link>
              );
            })}
          </div>
        </section>

        {/* ДОСТАВКА / МОНТАЖ */}
        <section className="py-12 grid md:grid-cols-2 gap-10">
          <HighlightCard
            title="Доставка по СПБ"
            text="Быстрая и аккуратная доставка по Санкт-Петербургу и Ленинградской области."
          />
          <HighlightCard
            title="Монтаж под ключ"
            text="Полный комплекс работ по установке оборудования и подключению."
          />
        </section>

        {/* ПРОФЕССИОНАЛИЗМ / ПОДДЕРЖКА */}
        <section className="py-4 grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div className="rounded-[24px] bg-[#f5f5f5] border border-[#f0f0f0] aspect-square" />

          <div className="space-y-12">
            <div>
              <h3 className="text-xl font-semibold mb-2">Профессионализм</h3>
              <p className="text-sm text-black/60 max-w-sm">
                Опытные специалисты и индивидуальный подход к каждому объекту.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Поддержка</h3>
              <p className="text-sm text-black/60 max-w-sm">
                Консультации по выбору, эксплуатации и сервисному обслуживанию.
              </p>
            </div>
          </div>
        </section>

        {/* 2×2 БЛОКИ */}
        <section className="py-16">
          <div className="grid md:grid-cols-2 gap-10">
           
          </div>
        </section>
      </Container>

      {/* ФУТЕР */}
      <footer className="border-t border-[#EDEDED] mt-8">
        <Container>
          <div className="py-10 flex flex-col md:flex-row md:items-end justify-between gap-10 text-sm text-black/70">
            <div className="flex items-center gap-2 text-black/25">
              <div className="w-6 h-6 rounded-sm bg-black/10" />
              <span className="tracking-[0.25em] text-xs uppercase">
                ТД СТОК
              </span>
            </div>

            <div className="space-y-1">
              <div className="font-semibold text-black">Контакты</div>
              <div>+7 (812) 123-45-67</div>
              <div>info@climatica.ru</div>
              <div>г. Санкт-Петербург</div>
            </div>

            <div className="space-y-1">
              <div className="font-semibold text-black">Время работы</div>
              <div>Пн–Пт: 10:00–20:00</div>
              <div>Сб: 11:00–16:00</div>
              <div>Вс: выходной</div>
            </div>
          </div>
        </Container>
      </footer>
    </div>
  );
}

/* ===== ДОП.КОМПОНЕНТЫ ===== */

type HighlightProps = {
  title: string;
  text: string;
};

function HighlightCard({ title, text }: HighlightProps) {
  return (
    <div className="space-y-4">
      <div className="rounded-[24px] bg-[#f5f5f5] border border-[#f0f0f0] aspect-[4/3]" />
      <div>
        <h3 className="text-base font-semibold mb-1">{title}</h3>
        <p className="text-sm text-black/60 max-w-xs">{text}</p>
      </div>
    </div>
  );
}

function GrayBlock() {
  return (
    <div className="rounded-[24px] bg-[#f5f5f5] border border-[#f0f0f0] aspect-[4/3]" />
  );
}

/* ===== ИКОНКИ КАТЕГОРИЙ ===== */

function ClimateIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="4" y="6" width="16" height="7" rx="2" />
      <path d="M7 10h3.5M13.5 10H17" />
      <path d="M7 16h10M9 18h6" />
    </svg>
  );
}

function DoorIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="8" y="4" width="8" height="16" rx="0.8" />
      <circle cx="14.2" cy="12" r="0.7" />
    </svg>
  );
}

function WrenchIcon(props: React.SVGSVGElement) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M6 7l3.2 3.2" />
      <path d="M4.8 8.2L8 5l2.5 2.5-3.2 3.2L4 18l2-0.7 2.3-0.8" />
      <path d="M13.5 6.5l4 4" />
      <path d="M14.7 4.7a3 3 0 014.2 4.2l-2 2" />
    </svg>
  );
}

function ShieldIcon(props: React.SVGSVGElement) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 4.2l5 1.7v5.4c0 3.1-2.1 5.9-5 7.3-2.9-1.4-5-4.2-5-7.3V5.9l5-1.7z" />
      <path d="M9.8 11.4l1.7 1.7 3.1-3.1" />
    </svg>
  );
}
