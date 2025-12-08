'use client';

import { useState } from 'react';

type ProductTabsProps = {
  product: {
    article_text?: string | null;       // описание
    characteristics?: string | null;    // характеристики
    instructions?: string | null;       // ссылка на инструкцию (pdf)
    certificates?: string | null;       // ссылка на сертификаты (pdf)
  };
};

const TABS = ['Описание', 'Характеристики', 'Документация'] as const;
type TabKey = (typeof TABS)[number];

export default function ProductTabs({ product }: ProductTabsProps) {
  const [active, setActive] = useState<TabKey>('Описание');

  const renderHtml = (html?: string | null) => {
    if (!html) {
      return <p className="text-sm text-gray-500">Информация отсутствует.</p>;
    }
    return (
      <div
        className="prose prose-sm max-w-none prose-p:mb-2 prose-ul:list-disc prose-li:ml-4"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  };

  const renderDocs = () => {
    const docs = [
      {
        key: 'instructions',
        label: 'Инструкция по эксплуатации',
        url: product.instructions,
      },
      {
        key: 'certificates',
        label: 'Сертификаты',
        url: product.certificates,
      },
    ].filter(doc => !!doc.url);

    if (!docs.length) {
      return <p className="text-sm text-gray-500">Документация пока не загружена.</p>;
    }

    return (
      <div className="space-y-3">
        {docs.map(doc => (
          <a
            key={doc.key}
            href={doc.url!}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between rounded-2xl border border-gray-100 bg-white px-5 py-3 shadow-sm hover:border-[#005BFF] hover:shadow-md transition"
          >
            <div className="flex items-center gap-3">
              {/* Иконка документа */}
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F5F6FA] text-[#005BFF]">
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.6}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M7 3h7l5 5v13H7z" />
                  <path d="M14 3v5h5" />
                  <path d="M10 13h4" />
                  <path d="M10 17h4" />
                </svg>
              </span>

              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-900 group-hover:text-[#005BFF]">
                  {doc.label}
                </span>
                <span className="text-xs text-gray-500">PDF-файл, откроется в новой вкладке</span>
              </div>
            </div>

            <span className="text-xs font-medium text-[#005BFF] group-hover:underline">
              Открыть
            </span>
          </a>
        ))}
      </div>
    );
  };

  return (
    <div>
      {/* Кнопки табов как раньше */}
      <div className="mb-4 flex border-b border-gray-100 text-sm font-medium">
        {TABS.map(tab => {
          const isActive = active === tab;
          return (
            <button
              key={tab}
              type="button"
              onClick={() => setActive(tab)}
              className={`relative mr-8 pb-2 transition-colors ${
                isActive ? 'text-gray-900' : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              {tab}
              {isActive && (
                <span className="absolute inset-x-0 bottom-0 h-[2px] rounded-full bg-[#005BFF]" />
              )}
            </button>
          );
        })}
      </div>

      {/* Содержимое табов */}
      <div className="text-sm text-gray-800">
        {active === 'Описание' && renderHtml(product.article_text)}
        {active === 'Характеристики' && renderHtml(product.characteristics)}
        {active === 'Документация' && renderDocs()}
      </div>
    </div>
  );
}
