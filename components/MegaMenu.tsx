// components/MegaMenu.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

// ВАЖНО: путь оставь такой, как у тебя реально настроен
// (в ошибке был "@/app/lib/catalogMenu")
import { CATEGORY_TREE, type CategoryNode } from "@/app/lib/catalogMenu";

// ===== Типы =====
export type CatalogItem = {
  title: string;
  slug: string;
  code: string;
  children?: CatalogItem[];
};

// преобразуем твой CATEGORY_TREE в структуру для меню
function nodeToItem(node: CategoryNode): CatalogItem {
  const slug = node.name
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-zа-я0-9]+/gi, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");

  return {
    title: node.name,
    slug,
    code: node.code,
    children: node.children?.map(nodeToItem),
  };
}

// Готовое меню из всего дерева
const CATALOG_MENU: CatalogItem[] = CATEGORY_TREE.map(nodeToItem);

// ===== Компонент =====

type MegaMenuProps = {
  open: boolean;
  onClose: () => void;
};

function buildHref(chain: CatalogItem[]): string {
  return "/catalog/" + chain.map((c) => c.slug).join("/");
}

export default function MegaMenu({ open, onClose }: MegaMenuProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = CATALOG_MENU[activeIndex] ?? CATALOG_MENU[0];

  // блокируем скролл страницы при открытом мегаменю
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/20"
          onClick={onClose}
        />
      )}

      <div
        className={`fixed left-0 top-20 z-50 w-full max-h-[calc(100vh-80px)]
        border-t border-[#EDEDED] bg-white shadow-[0_18px_40px_rgba(0,0,0,0.08)]
        transition-all duration-200 ease-out
        ${
          open
            ? "opacity-100 translate-y-0"
            : "pointer-events-none opacity-0 -translate-y-3"
        }`}
      >
        <div className="mx-auto flex max-w-7xl gap-10 px-8 py-6">
          {/* ЛЕВАЯ КОЛОНКА */}
<div className="w-72 flex-shrink-0 border-r border-[#F1F1F1] pr-6">
  <div className="text-[12px] font-medium text-black/45 mb-4 tracking-[0.16em] uppercase">
    Категории
  </div>

  <nav className="space-y-1.5">
    {CATALOG_MENU.map((item, index) => {
      const isActive = index === activeIndex;
      const count = item.children?.length ?? 0;

      return (
        <button
          key={item.slug}
          onMouseEnter={() => setActiveIndex(index)}
          className={`
            group relative flex w-full items-center justify-between
            rounded-xl px-3.5 py-2.5 text-[14px] leading-tight
            transition
            ${isActive
              ? "bg-[#FFF4EB] text-black shadow-[0_0_0_1px_rgba(0,0,0,0.02)]"
              : "text-black/75 hover:bg-black/[0.03] hover:text-black"}
          `}
        >
          {/* Левый акцент-бар */}
          <span
            className={`
              absolute left-0 top-1/2 -translate-y-1/2 h-7 w-[3px] rounded-full
              transition-opacity
              ${isActive ? "opacity-100 bg-[#FF8A3D]" : "opacity-0 group-hover:opacity-40 bg-black/20"}
            `}
          />

          {/* Название категории */}
          <span className="pl-1.5 text-left">
            {item.title}
          </span>

          {/* Кол-во подкатегорий как аккуратный бейдж */}
          {count > 0 && (
            <span
              className={`
                ml-3 inline-flex min-w-[1.6rem] justify-center px-1.5
                rounded-full text-[11px] font-semibold
                transition
                ${isActive
                  ? "bg-[#FF8A3D] text-white"
                  : "bg-black/[0.04] text-black/45 group-hover:bg-black/[0.06]"}
              `}
            >
              {count}
            </span>
          )}
        </button>
      );
    })}
  </nav>
</div> 


          {/* ПРАВАЯ ЧАСТЬ — показываем только 2-й уровень */}
          <div className="flex-1">
            {active.children?.length ? (
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
                {active.children.map((sub) => (
                  <CategoryTile
                    key={sub.slug}
                    parent={active}
                    item={sub}
                  />
                ))}
              </div>
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-black/60">
                Для раздела{" "}
                <span className="mx-1 font-medium">{active.title}</span>
                подкатегории пока не настроены.
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

// ===== Плитка 2-го уровня =====

type TileProps = {
  parent: CatalogItem;
  item: CatalogItem;
};

function CategoryTile({ parent, item }: TileProps) {
  const chain = [parent, item];

  return (
    <div
      className="group rounded-xl border border-transparent bg-[#FAFAFA]
                 px-5 py-4 transition hover:border-[#FFB27A] hover:bg-[#FFF2E6]"
    >
      {/* Заголовок плитки */}
      <Link
        href={buildHref(chain)}
        className="mb-2 flex items-center justify-between gap-2"
      >
        <span className="text-[15px] font-semibold text-black group-hover:text-[#FF6F1F]">
          {item.title}
        </span>

        <span className="text-[12px] text-black/40 group-hover:text-[#FF6F1F]">
          ➜
        </span>
      </Link>

      {/* Все подкатегории */}
      {item.children?.length > 0 && (
        <ul className="space-y-1 text-[13px] leading-tight text-black/65">
          {item.children.map((child) => (
            <li key={child.slug}>
              <Link
                href={buildHref([...chain, child])}
                className="hover:text-[#FF6F1F] transition"
              >
                {child.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

