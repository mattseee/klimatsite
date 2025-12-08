// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import "./globals.css";
import Header from "../components/Header";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: "Климат и двери — Санкт-Петербург",
  description:
    "Премиальная климатическая техника и двери с монтажом и доставкой по СПб.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        {/* тут задаём белый фон и чёрный текст на весь сайт */}
        <div className="min-h-screen bg-white text-black">
          <Header />
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
