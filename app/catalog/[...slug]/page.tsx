// app/catalog/[...slug]/page.tsx
import { getProductsByCategoryCode } from '@/app/lib/products';
import ProductCard from '@/components/ProductCard';
import Link from "next/link";
import Container from "@/components/Container";
import {
  CATEGORY_TREE,
  CategoryNode,
  findCategoryBySlugs,
  buildCategoryHrefFromChain,
} from "@/app/lib/catalogMenu";

async function fetchProductsByCategory(categoryCode: string): Promise<any[]> {
  // Просто вызываем хелпер, который ходит на /api/products/by-slug/:code
  return await getProductsByCategoryCode(categoryCode);
}

// Более строгий тип для params
interface PageParams {
  slug?: string[] | string;
}

interface PageProps {
  params: Promise<PageParams> | PageParams;
}

// Декодируем URL-encoded строки
function decodeSlug(slug: string): string {
  try {
    return decodeURIComponent(slug);
  } catch {
    return slug;
  }
}

// Извлекаем и декодируем slugs безопасным способом
function getSlugsFromParams(params: PageParams): string[] {
  if (!params?.slug) return [];
  
  let slugs: string[];
  
  if (Array.isArray(params.slug)) {
    slugs = params.slug;
  } else if (typeof params.slug === 'string') {
    slugs = [params.slug];
  } else {
    slugs = [];
  }
  
  // Декодируем каждый slug
  return slugs.map(slug => decodeSlug(slug));
}

// Компонент для отображения при отсутствии категории
function NotFoundContent({ slugs }: { slugs: string[] }) {
  return (
    <Container>
      <div className="py-16 px-4 text-center">
        <h1 className="text-2xl font-semibold mb-4">Раздел не найден</h1>
        <p className="text-gray-600 mb-6">
          Запрошенный раздел &quot;{slugs.join(" / ")}&quot; не существует
        </p>
        <Link
          href="/catalog"
          className="inline-flex items-center px-4 py-2 bg-[#FF8A3D] text-white rounded-lg hover:bg-[#FF7A2D] transition-colors"
        >
          Вернуться в каталог
        </Link>
      </div>
    </Container>
  );
}

// Функция для отладки - логируем данные
function logDebugData(slugs: string[], chain: CategoryNode[] | null) {
  console.log("=== CatalogSlugPage Debug ===");
  console.log("Slugs:", slugs);
  console.log("Chain found:", chain ? "Yes" : "No");
  console.log("Chain length:", chain?.length || 0);
  if (chain && chain.length > 0) {
    console.log("Current category:", chain[chain.length - 1]);
  }
  console.log("CATEGORY_TREE first level:", CATEGORY_TREE.map(c => c.code));
  console.log("======================");
}

export default async function CatalogSlugPage({ params }: PageProps) {
  // Обрабатываем Promise для Next.js 15+
  const resolvedParams = params instanceof Promise ? await params : params;
  
  // Извлекаем и декодируем slugs
  const slugs = getSlugsFromParams(resolvedParams);
  
  // Получаем цепочку категорий
  let chain: CategoryNode[] | null = null;
  try {
    chain = findCategoryBySlugs(slugs);
  } catch (error) {
    console.error("Error finding category:", error);
    logDebugData(slugs, null);
    return <NotFoundContent slugs={slugs} />;
  }

  // Отладочные логи
  logDebugData(slugs, chain);

  // Если категория не найдена
  if (!chain || chain.length === 0) {
    return <NotFoundContent slugs={slugs} />;
  }

  const current = chain[chain.length - 1];
  const children = current.children || [];
  const level = chain.length;

  // Загружаем товары, если нет подкатегорий
  const products = children.length === 0 ? await fetchProductsByCategory(current.code) : [];

  // Генерируем хлебные крошки
  const breadcrumbs = chain.map((node, index) => {
    const href = buildCategoryHrefFromChain(chain!.slice(0, index + 1));
    const isLast = index === chain!.length - 1;
    
    return {
      ...node,
      href,
      isLast,
    };
  });

  return (
    <Container>
      <div className="py-8 md:py-10">
        {/* Хлебные крошки */}
        <nav 
          className="mb-6 md:mb-8 text-xs text-gray-500 flex flex-wrap items-center gap-1 md:gap-2"
          aria-label="Хлебные крошки"
        >
          <Link 
            href="/catalog" 
            className="hover:text-black transition-colors"
            aria-label="Каталог"
          >
            Каталог
          </Link>
          
          {breadcrumbs.map((item, index) => (
            <span key={item.code} className="flex items-center">
              <span className="mx-1 md:mx-2">/</span>
              {item.isLast ? (
                <span 
                  className="text-black font-medium"
                  aria-current="page"
                >
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="hover:text-black transition-colors"
                  aria-label={`Перейти в ${item.name}`}
                >
                  {item.name}
                </Link>
              )}
            </span>
          ))}
        </nav>

        {/* Заголовок */}
        <header className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-semibold mb-2">
            {current.name}
          </h1>
          
          {level === 1 && (
            <p className="text-sm md:text-base text-gray-600">
              Выберите раздел: водоснабжение, кондиционирование, осушение и т.д.
            </p>
          )}
          
          {level === 2 && (
            <p className="text-sm md:text-base text-gray-600">
              Выберите группу товаров в разделе «{current.name}».
            </p>
          )}
          
          {level >= 3 && (
            <p className="text-sm md:text-base text-gray-600">
              Товары категории «{current.name}»
            </p>
          )}
        </header>

        {/* Основной контент */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Левая панель */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="sticky top-8">
              <h2 className="text-xs font-medium text-gray-400 mb-4 uppercase tracking-wider">
                {children.length > 0 ? "Разделы" : "Текущий раздел"}
              </h2>
              <ul className="space-y-2">
                {children.length > 0 ? (
                  children.map((child) => {
                    const href = buildCategoryHrefFromChain([...chain!, child]);
                    return (
                      <li key={child.code}>
                        <Link
                          href={href}
                          className="block text-sm text-gray-700 hover:text-[#FF8A3D] py-1.5 transition-colors"
                          aria-label={`Перейти в ${child.name}`}
                        >
                          {child.name}
                        </Link>
                      </li>
                    );
                  })
                ) : (
                  <li>
                    <span className="block text-sm text-gray-900 py-1.5 font-medium">
                      {current.name}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">
                      {products.length > 0 ? `${products.length} товаров` : "Нет товаров"}
                    </p>
                  </li>
                )}
              </ul>
            </div>
          </aside>

          {/* Основной контент */}
          <main className="flex-1">
            {children.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                {children.map((child) => {
                  const href = buildCategoryHrefFromChain([...chain!, child]);
                  const hasSubcategories = child.children && child.children.length > 0;
                  
                  return (
                    <Link
                      key={child.code}
                      href={href}
                      className="group block rounded-xl md:rounded-2xl border border-gray-100 bg-white hover:border-[#FF8A3D]/20 hover:bg-[#FFF4EB] transition-all duration-300 overflow-hidden shadow-sm hover:shadow-md"
                      aria-label={`Перейти в ${child.name}`}
                    >
                      {/* Плейсхолдер для изображения */}
                      <div className="aspect-[4/3] bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center group-hover:from-[#FF8A3D]/5 group-hover:to-[#FF8A3D]/10 transition-colors">
                        <div className="text-xs text-gray-400 group-hover:text-[#FF8A3D]">
                          нет изображения
                        </div>
                      </div>
                      
                      <div className="p-4 md:p-6">
                        <h3 className="text-sm md:text-base font-medium text-gray-900 mb-2 line-clamp-2">
                          {child.name}
                        </h3>
                        {hasSubcategories ? (
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500">
                              {child.children!.length} подкатегорий
                            </span>
                            <span className="text-xs font-medium text-[#FF8A3D] group-hover:translate-x-1 transition-transform">
                              Перейти →
                            </span>
                          </div>
                        ) : (
                          <div className="h-6"></div> 
                        )}
                      </div>
                    </Link>
                  );
                })}
              </div>
            ) : (
              // Блок с товарами
              <div className="bg-white rounded-xl p-4 md:p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-medium text-gray-900">
                    Товары в категории «{current.name}»
                  </h3>
                  {products.length > 0 && (
                    <span className="text-sm text-gray-500">
                      {products.length} товаров
                    </span>
                  )}
                </div>
                
                {products.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {products.map((product) => (
                      <ProductCard
                        key={product.id}
                        id={product.id}
                        name={product.name}
                        price={product.price || 0}
                        oldPrice={product.old_price || undefined}
                        imageUrl={product.image || undefined}
                        categoryId={product.category_id || 0}
                        isNew={product.exclusive === 1}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 border border-gray-200 rounded-lg">
                    <div className="text-4xl mb-4">📦</div>
                    <p className="text-gray-600 mb-2">Товары в этой категории скоро появятся</p>
                    <p className="text-sm text-gray-500">
                      Свяжитесь с менеджером для уточнения наличия
                    </p>
                  </div>
                )}
              </div>
            )}
          </main>
        </div>
      </div>
    </Container>
  );
}

// Функция для генерации статических параметров
export async function generateStaticParams() {
  // Функция для рекурсивного получения всех путей
  function getAllPaths(node: CategoryNode, parentSlugs: string[] = []): { slug: string[] }[] {
    const currentSlugs = [...parentSlugs, node.code];
    const paths = [{ slug: currentSlugs }];
    
    if (node.children) {
      for (const child of node.children) {
        paths.push(...getAllPaths(child, currentSlugs));
      }
    }
    
    return paths;
  }
  
  // Генерируем пути для всех категорий
  const allPaths: { slug: string[] }[] = [];
  
  CATEGORY_TREE.forEach(category => {
    allPaths.push(...getAllPaths(category));
  });
  
  return allPaths;
}

// Метаданные для SEO
export async function generateMetadata({ params }: PageProps) {
  const resolvedParams = params instanceof Promise ? await params : params;
  const slugs = getSlugsFromParams(resolvedParams);
  let title = "Каталог товаров";
  let description = "Каталог климатического оборудования и систем водоснабжения";
  
  try {
    const chain = findCategoryBySlugs(slugs);
    if (chain && chain.length > 0) {
      const current = chain[chain.length - 1];
      title = `${current.name} | Каталог`;
      description = `Каталог ${current.name} - качественное оборудование по выгодным ценам`;
    }
  } catch (error) {
    // Используем значения по умолчанию
  }
  
  return {
    title,
    description,
  };
}