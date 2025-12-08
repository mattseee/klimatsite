import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parser';
import { stringify } from 'csv-stringify';

const inputFile = 'data/import/products.csv';  // Путь к исходному файлу
const outputFile = 'data/import/products_updated.csv';  // Путь к выходному файлу

// Сопоставление русских наименований столбцов с английскими
const columnMapping = {
  "Наименование": "title",
  "Артикул": "article",
  "Бренд": "brand",
  "Название категории": "categoryId", // Убедитесь, что поле categoryId существует в вашей базе данных
  "Характеристики": "characteristics",
  "Изображение": "image",
  "Видео": "video",
  "Сопут.товар": "promotional_materials",
  "Аналоги": "instructions",
  "Статья": "barcode",
  "Чертежи": "ns_code",
  "Промоматериалы": "promotional_materials",
  "Инструкции": "instructions",
  "Штрих код": "barcode",
  "НС-код": "ns_code"
};

const products = [];

// Чтение CSV
fs.createReadStream(inputFile)
  .pipe(parse({ headers: true, skip_empty_lines: true }))
  .on('data', (row) => {
    // Заменяем наименования столбцов
    const mappedRow = {};
    for (const [key, value] of Object.entries(row)) {
      const newKey = columnMapping[key] || key;  // Если для столбца нет замены, оставляем старое имя
      mappedRow[newKey] = value;
    }
    products.push(mappedRow);
  })
  .on('end', () => {
    // Запись обновленного CSV
    stringify(products, { header: true }, (err, output) => {
      if (err) {
        console.error('Ошибка при записи данных:', err);
      } else {
        fs.writeFileSync(outputFile, output);
        console.log('CSV файл успешно обновлен: ' + outputFile);
      }
    });
  });
