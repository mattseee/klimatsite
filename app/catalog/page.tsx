// app/catalog/page.tsx
import Image from "next/image";
import Link from "next/link";
import Container from "../../components/Container";

const categories = [
  {
    slug: "climate",
    title: "Климатическое оборудование",
    description: "Кондиционеры, сплит-системы и вентиляция для дома и офиса.",
    image: "/cat-climate.jpg",
  },
  {
    slug: "doors",
    title: "Двери",
    description: "Входные и межкомнатные двери для квартиры и загородного дома.",
    image: "/cat-doors.jpg",
  },
  {
    slug: "tile",
    title: "Плитка и отделка",
    description: "Напольная и настенная плитка для ванных, кухонь и коридоров.",
    image: "/cat-tile.jpg",
  },
  {
    slug: "materials",
    title: "Монтажные материалы",
    description: "Клеи, герметики и расходные материалы для монтажа и ремонта.",
    image: "/cat-materials.jpg",
  },
];

export default function CatalogPage() {
  return (
    <div className="pb-20">
      <Container>
        {/* Заголовок страницы */}
        <section className="pt-10 pb-6">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3">
            Каталог товаров
          </h1>
          <p className="text-sm md:text-base text-black/60 max-w-2xl">
            Выберите категорию: климатическое оборудование, двери, плитка или
            монтажные материалы. Позже здесь можно будет подключить фильтры и
            полноценный список товаров.
          </p>
        </section>

        {/* Сетка категорий */}
        <section className="grid gap-6 md:gap-8 sm:grid-cols-2 xl:grid-cols-4">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              // пока ведём на эту же страницу с query-параметром.
              // позже можно сделать /catalog/[slug]
              href={`/catalog?category=${cat.slug}`}
              className="group rounded-2xl border border-[#EDEDED] bg-white shadow-sm hover:shadow-md transition flex flex-col overflow-hidden"
            >
              {/* Картинка */}
              <div className="relative h-40 md:h-44 bg-[#f5f5f5]">
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>

              {/* Текст */}
              <div className="p-4 md:p-5 flex-1 flex flex-col gap-2">
                <h2 className="text-sm md:text-base font-semibold">
                  {cat.title}
                </h2>
                <p className="text-xs md:text-sm text-black/60 flex-1">
                  {cat.description}
                </p>
                <span className="mt-2 text-xs md:text-sm text-[#FF8A3D] font-medium inline-flex items-center gap-1 group-hover:translate-x-1 transition">
                  Смотреть товары
                  <span aria-hidden>→</span>
                </span>
              </div>
            </Link>
          ))}
        </section>
      </Container>
    </div>
  );
}
