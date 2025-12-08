import fs from 'fs';
import { PrismaClient } from '@prisma/client';
import csv from 'csv-parser';  // Используем import вместо require

const prisma = new PrismaClient();

const importData = async () => {
  const products = [];

  fs.createReadStream("C:\Users\Administrator\klimatsite\data\import\products.csv")
    .pipe(csv())
    .on("data", (row) => {
      products.push({
        title: row["Наименование"],
        slug: row["slug"], 
        price: parseFloat(row["Цена"]),
        categoryId: parseInt(row["categoryId"]),
        brand: row["Бренд"],
        article: row["Артикул"],
        characteristics: row["Характеристики"],
        image: row["Изображение"],
        video: row["Видео"],
        promotional_materials: row["Промоматериалы"],
        instructions: row["Инструкции"],
        barcode: row["Штрих код"],
        ns_code: row["НС-код"],
      });
    })
    .on("end", async () => {
      console.log("CSV file successfully processed");
      try {
        const result = await prisma.product.createMany({
          data: products,
        });
        console.log(`Inserted ${result.count} records.`);
      } catch (error) {
        console.error("Error inserting data:", error);
      }
    });
};

importData();
