// app/lib/types/database.ts
export interface Category {
  id: number;
  name: string;
}

export interface Product {
  id: number;
  name: string;
  article?: string | null;
  article_text?: string | null;
  barcode?: string | null;
  brand?: string | null;
  category_id?: number | null;
  price?: number | null;
  image?: string | null;
  exclusive?: number | null; // 0 или 1
  analogs?: string | null; // JSON строка
  characteristics?: string | null; // JSON строка
  certificates?: string | null;
  drawings?: string | null;
  instructions?: string | null;
  nsm_code?: string | null;
  promo?: string | null;
  related?: string | null; // JSON строка
  video?: string | null;
  created_at: string;
}

// Для парсинга JSON полей
export interface ProductCharacteristics {
  [key: string]: string | number | boolean;
}

export interface ProductWithCategory extends Product {
  category_name?: string;
}