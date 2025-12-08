// scripts/import-products.cjs
// Импорт товаров из Excel в MySQL

const path = require("path");
const mysql = require("mysql2/promise");
const xlsx = require("xlsx");

// ⚙️ НАСТРОЙКИ MySQL (XAMPP / phpMyAdmin)
const DB_CONFIG = {
  host: "localhost",
  user: "root",        // в XAMPP по умолчанию root без пароля
  password: "",        // если ты ставил пароль — впиши здесь
  database: "klimat",  // БД, которую ты создал в phpMyAdmin
};

// Путь к файлу с товарами
const FILE_PATH = path.join(__dirname, "..", "data", "products.xlsx");

// ====== ПОМОЩНИКИ ======

/**
 * Преобразуем строку цены в число
 */
function parsePrice(value) {
  if (!value) return 0;
  const normalized = String(value).replace(/\s/g, "").replace(",", ".");
  const num = Number(normalized);
  return isNaN(num) ? 0 : num;
}

/**
 * Преобразуем "Да/Нет" в boolean для поля exclusive
 */
function parseExclusive(value) {
  if (!value) return false;
  const v = String(value).trim().toLowerCase();
  return v === "да" || v === "yes" || v === "1";
}

// Создаём slug из названия
function makeSlug(str) {
  return String(str)
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-zа-я0-9]+/gi, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// ====== ОСНОВНАЯ ЛОГИКА ======

async function main() {
  console.log("📥 Старт импорта товаров из Excel...");

  // 1. Читаем Excel
  const workbook = xlsx.readFile(FILE_PATH);
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];

  // Получаем строки как объекты.
  // !!! ВАЖНО: заголовки в таблице должны быть ровно такими:
  // "Наименование","Артикул","Бренд","Название категории",
  // "Характеристики","Изображение","Видео","Сопут.товар","Аналоги",
  // "Статья","Чертежи","Сертификаты","Промоматериалы","Инструкции",
  // "Штрих код","Цена","НС-код","Эксклюзив"
  const rows = xlsx.utils.sheet_to_json(sheet, { defval: "" });

  console.log(`Найдено строк: ${rows.length}`);

  // 2. Подключаемся к MySQL
  const connection = await mysql.createConnection(DB_CONFIG);
  console.log("✅ Подключились к базе MySQL");

  try {
    // Включаем транзакцию, чтобы импорт был цельным
    await connection.beginTransaction();

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];

      const name = row["Наименование"];
      if (!name) continue; // пропускаем пустые строки

      const article = row["Артикул"];
      const brand = row["Бренд"];
      const categoryName = row["Название категории"];
      const characteristics = row["Характеристики"];
      const image = row["Изображение"];
      const video = row["Видео"];
      const accessories = row["Сопут.товар"];
      const analogs = row["Аналоги"];
      const docs = [
        row["Статья"],
        row["Чертежи"],
        row["Сертификаты"],
        row["Промоматериалы"],
        row["Инструкции"],
      ]
        .filter(Boolean)
        .join(" | ");

      const barcode = row["Штрих код"];
      const price = parsePrice(row["Цена"]);
      const nsCode = row["НС-код"];
      const exclusive = parseExclusive(row["Эксклюзив"]);

      // 2.1. Сначала найдём/создадим категорию
      const categorySlug = makeSlug(categoryName || "прочее");

      // ищем категорию
      const [catRows] = await connection.execute(
        "SELECT id FROM categories WHERE slug = ?",
        [categorySlug]
      );

      let categoryId;
      if (catRows.length > 0) {
        categoryId = catRows[0].id;
      } else {
        const [catInsert] = await connection.execute(
          "INSERT INTO categories (name, slug, parent_id) VALUES (?, ?, NULL)",
          [categoryName || "Прочее", categorySlug]
        );
        categoryId = catInsert.insertId;
      }

      // 2.2. Вставляем товар
      const productSlug = makeSlug(name + "-" + (article || ""));

      await connection.execute(
        `INSERT INTO products
          (category_id, name, article, brand, characteristics, image, video,
           accessories, similar_products, documentation,
           barcode, price, ns_code, exclusive)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          categoryId,
          name,
          article,
          brand,
          characteristics,
          image,
          video,
          accessories,
          analogs,
          docs,
          barcode,
          price,
          nsCode,
          exclusive,
        ]
      );

      if ((i + 1) % 100 === 0) {
        console.log(`➡ Импортировано ${i + 1} строк...`);
      }
    }

    await connection.commit();
    console.log("🎉 Импорт успешно завершён!");
  } catch (err) {
    console.error("❌ Ошибка при импорте:", err);
    await connection.rollback();
  } finally {
    await connection.end();
  }
}

main().catch((e) => {
  console.error("Фатальная ошибка:", e);
  process.exit(1);
});
