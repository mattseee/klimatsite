"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Container from "./Container";
import MegaMenu from "./MegaMenu";
import Search from './Search';

const navLinks = [
  { href: "/about", label: "О компании" },
  { href: "/contacts", label: "Контакты" },
];

// Фразы для placeholder в поиске
const SEARCH_PLACEHOLDERS = [
  "Найти сплит системы…",
  "Найти кондиционеры…",
  "Найти вентиляцию…",
  "Найти двери…",
];

export default function Header() {
  const pathname = usePathname();
const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  // индекс текущей фразы для placeholder
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  // раз в 3 секунды меняем текст в placeholder
  useEffect(() => {
    const id = setInterval(() => {
      setPlaceholderIndex(
        (prev) => (prev + 1) % SEARCH_PLACEHOLDERS.length
      );
    }, 3000);

    return () => clearInterval(id);
  }, []);

  const [cartCount, setCartCount] = useState(0);

  // Получаем количество товаров в корзине (можно использовать localStorage или контекст)
  useEffect(() => {
    const savedItems = localStorage.getItem("cartItems");
    if (savedItems) {
      setCartCount(JSON.parse(savedItems).length);
    }
  }, []);

  return (
    <header className="sticky top-0 z-20 bg-white/95 backdrop-blur border-b border-[#EDEDED]">
      <Container>
        <div className="h-20 flex items-center justify-between gap-6">
          {/* ЛОГО — клик ведёт на главную */}
          <Link
            href="/"
            className="flex items-center text-xl font-semibold tracking-tight hover:opacity-70 transition"
          >
            ТД СТОК®
          </Link>

          {/* КАТАЛОГ + ПОИСК */}
<div className="hidden md:flex flex-1 items-center gap-4">
  {/* Обертка, чтобы по hover показывать мега-меню */}
  <div
    className="relative"
    onMouseEnter={() => setIsCatalogOpen(true)}
    onMouseLeave={() => setIsCatalogOpen(false)}
  >
    {/* Кнопка Каталог */}
    <Link
      href="/catalog"
      className="flex items-center gap-2 px-4 py-2 rounded-[10px] bg-[#FF8A3D] text-white text-sm font-medium hover:bg-[#ff7a1e] transition shadow-sm"
    >
      <CatalogIcon className="w-5 h-5" />
      Каталог
    </Link>

    {/* Мега-меню */}
    <MegaMenu open={isCatalogOpen} onClose={() => setIsCatalogOpen(false)} />
  </div>

  {/* 🔍 Новый живой поиск */}
  <div className="flex-1 flex justify-center">
    <Search />
  </div>
</div>


          {/* МЕНЮ + ИКОНКИ */}
          <div className="flex items-center gap-6">
            <nav className="hidden lg:flex items-center gap-8 text-sm font-medium">
              {navLinks.map((link) => {
                const active = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative transition ${
                      active ? "text-black" : "text-black/70"
                    } hover:text-black`}
                  >
                    {link.label}
                    {active && (
                      <span className="absolute left-0 -bottom-1 h-[2px] w-full bg-[#FF8A3D] rounded-full" />
                    )}
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-4 text-black/70">
              <IconButton>
                <UserIcon className="w-5 h-5" />
              </IconButton>
              <IconButton>
                <HeartIcon className="w-5 h-5" />
              </IconButton>

              {/* Ссылка на корзину */}
              <Link
  href="/cart"
  className="relative flex items-center p-1.5 rounded-full hover:bg-black/[0.04] transition"
>
  {/* Иконка корзины */}
  <CartIcon className="w-5 h-5" />

  {/* Если есть товары — отображаем количество */}
  {cartCount > 0 && (
    <span className="absolute -top-1 -right-1 text-[10px] leading-none bg-red-500 text-white font-medium rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-[4px]">
      {cartCount}
    </span>
  )}
</Link>

            </div>
          </div>
        </div>
      </Container>
    </header>
  );
}

function IconButton({ children }: { children: React.ReactNode }) {
  return (
    <button className="p-1.5 rounded-full hover:bg-black/[0.04] transition">
      {children}
    </button>
  );
}

/* ====== ИКОНКИ (тонкий outline) ====== */

function SearchIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <circle cx="11" cy="11" r="4.8" />
      <path d="M15 15l3.5 3.5" />
    </svg>
  );
}

function CatalogIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

function UserIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5.5 19.5C6.6 16.8 9.1 15 12 15s5.4 1.8 6.5 4.5" />
    </svg>
  );
}

function HeartIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M12 19.2l-5.2-4.7A4.3 4.3 0 016 6.1c1.3-.8 3-.7 4.2.3L12 8l1.8-1.6c1.2-1 2.9-1.1 4.2-.3a4.3 4.3 0 01.2 6.4L12 19.2z" />
    </svg>
  );
}

function CartIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <circle cx="9" cy="19" r="1.4" />
      <circle cx="17" cy="19" r="1.4" />
      <path d="M4 5h2l1.4 9.2a1.2 1.2 0 001.2 1h8.4a1.2 1.2 0 001.2-1l.9-6.7H8.1" />
    </svg>
  );
}
