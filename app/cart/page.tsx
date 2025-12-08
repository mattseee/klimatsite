// app/cart/page.tsx
import Image from "next/image";
import Link from "next/link";
import Container from "../../components/Container";

type CartItem = {
  id: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
};

const mockCart: CartItem[] = [
  {
    id: 1,
    name: "Сплит-система Mitsubishi Electric 2,5 кВт",
    image: "/hero-1.jpg",
    price: 78900,
    quantity: 1,
  },
  {
    id: 2,
    name: "Входная дверь Sigma, цвет графит",
    image: "/hero-2.jpg",
    price: 91800,
    quantity: 2,
  },
];

function calcTotal(cart: CartItem[]) {
  const itemsTotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const delivery = 0; // пока бесплатно :)
  return { itemsTotal, delivery, total: itemsTotal + delivery };
}

export default function CartPage() {
  const cartItems = mockCart; // потом заменишь на реальные данные из БД / API
  const { itemsTotal, delivery, total } = calcTotal(cartItems);

  const totalCount = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const isEmpty = cartItems.length === 0;

  return (
    <div className="pb-20">
      <Container>
        <h1 className="text-3xl md:text-4xl font-semibold mb-8">Корзина</h1>

        {isEmpty ? (
          <div className="max-w-xl py-16 text-center mx-auto space-y-4">
            <div className="text-lg font-medium">
              В корзине пока нет товаров
            </div>
            <p className="text-sm text-black/60">
              Добавьте оборудование и материалы в корзину из каталога.
            </p>
            <Link
              href="/catalog"
              className="inline-flex px-6 py-3 rounded-[10px] bg-[#FF8A3D] text-white text-sm font-medium hover:bg-[#ff7a1e] transition"
            >
              Перейти в каталог
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-[minmax(0,2fr)_360px] gap-10 items-start">
            <div className="space-y-6">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 md:gap-6 rounded-2xl border border-[#EDEDED] bg-white p-4 md:p-5 items-center"
                >
                  <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-xl overflow-hidden bg-[#f5f5f5] shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 space-y-2">
                    <div className="text-sm md:text-base font-medium">
                      {item.name}
                    </div>
                    <div className="text-xs text-black/60">
                      Кол-во: {item.quantity} шт.
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <div className="text-base md:text-lg font-semibold">
                      {(item.price * item.quantity).toLocaleString("ru-RU")} ₽
                    </div>
                    <button className="text-xs text-black/50 hover:text-black underline underline-offset-4">
                      Удалить
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Сайдбар "Итого" */}
            <aside className="rounded-2xl border border-[#EDEDED] bg-white p-6 space-y-4">
              <div className="text-lg font-semibold">Итого</div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-black/70">
                  <span>
                    Товары ({totalCount} шт.)
                  </span>
                  <span>{itemsTotal.toLocaleString("ru-RU")} ₽</span>
                </div>
                <div className="flex justify-between text-black/70">
                  <span>Доставка</span>
                  <span>
                    {delivery === 0
                      ? "По Санкт-Петербургу и ЛО"
                      : `${delivery.toLocaleString("ru-RU")} ₽`}
                  </span>
                </div>
              </div>

              <div className="border-t border-[#F0F0F0] pt-4 flex justify-between items-center">
                <span className="text-sm text-black/70">К оплате</span>
                <span className="text-xl font-semibold">
                  {total.toLocaleString("ru-RU")} ₽
                </span>
              </div>

              <button className="w-full mt-2 px-4 py-3 rounded-[10px] bg-black text-white text-sm font-medium hover:bg-black/90 transition">
                Оформить заказ
              </button>

              <Link
                href="/catalog"
                className="block text-center text-xs text-black/60 hover:text-black underline underline-offset-4"
              >
                Продолжить покупки
              </Link>
            </aside>
          </div>
        )}
      </Container>
    </div>
  );
}
