// scripts/cleanupDescriptions.cjs
// Запуск: node scripts/cleanupDescriptions.cjs          (боевой режим)
//         node scripts/cleanupDescriptions.cjs --dry    (только посмотреть, без UPDATE)

const mysql = require('mysql2/promise');

// 👇 подставь свои значения, как в других скриптах
const connectionConfig = {
  host: '127.0.0.1',           // можно 'localhost'
  user: 'klimat_user',
  password: 'klimat_pass_123',
  database: 'klimat',
  charset: 'utf8mb4_general_ci',
};

// Функция очистки HTML описания
function cleanDescription(raw) {
  if (!raw) return null;
  let s = String(raw);

  // 1) Нормализуем сущности
  s = s
    .replace(/&laquo;/gi, '«')
    .replace(/&raquo;/gi, '»')
    .replace(/&quot;/gi, '"')
    .replace(/&ndash;/gi, '–')
    .replace(/&mdash;/gi, '—')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&bull;/gi, '•');

  // 2) Удаляем полностью пустые абзацы <p>   </p>
  s = s.replace(/<p>(\s|&nbsp;|<br\s*\/?>)*<\/p>/gi, '');

  // 3) <br> -> перевод строки
  s = s.replace(/<br\s*\/?>/gi, '\n');

  // 4) между </p><p> вставляем пустую строку
  s = s.replace(/<\/p>\s*<p>/gi, '\n\n');

  // 5) убираем сами <p> и </p>
  s = s.replace(/<\/?p[^>]*>/gi, '');

  // 6) приводим переводы строк в порядок (3+ → 2)
  s = s.replace(/\n{3,}/g, '\n\n');

  // 7) чистим хвосты пробелов
  s = s
    .split('\n')
    .map(line => line.trimEnd())
    .join('\n');

  // 8) лишние двойные пробелы
  s = s.replace(/[ \t]{2,}/g, ' ').trim();

  return s || null;
}

async function main() {
  const DRY_RUN = process.argv.includes('--dry');

  console.log('=== ОЧИСТКА ОПИСАНИЙ ТОВАРОВ ===');
  console.log('Режим:', DRY_RUN ? 'DRY-RUN (без UPDATE)' : 'БОЕВОЙ');

  const conn = await mysql.createConnection(connectionConfig);

  try {
    // Берём только товары, где есть article_text
    const [rows] = await conn.execute(
      `SELECT id, article_text
       FROM products
       WHERE article_text IS NOT NULL AND article_text <> ''`
    );

    console.log(`Найдено записей с описанием: ${rows.length}`);

    let changedCount = 0;

    for (const row of rows) {
      const { id, article_text } = row;

      const cleaned = cleanDescription(article_text);

      // НИЧЕГО не поменялось
      if (cleaned === article_text) continue;

      changedCount++;

      // Для наглядности — покажем первые несколько
      if (changedCount <= 10) {
        console.log('------------------------------');
        console.log(`ID: ${id}`);
        console.log('БЫЛО:');
        console.log(article_text);
        console.log('СТАЛО:');
        console.log(cleaned);
      }

      if (!DRY_RUN) {
        await conn.execute(
          `UPDATE products
           SET article_text = ?
           WHERE id = ?`,
          [cleaned, id]
        );
      }
    }

    console.log('------------------------------');
    console.log(`Всего изменённых записей: ${changedCount}`);
    if (DRY_RUN) {
      console.log('Так как режим DRY-RUN — в БД НИЧЕГО не записано.');
    } else {
      console.log('Обновление БД завершено.');
    }
  } catch (err) {
    console.error('Ошибка при очистке описаний:', err);
  } finally {
    await conn.end();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
