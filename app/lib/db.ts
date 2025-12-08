// lib/db.ts
import mysql from 'mysql2/promise';

// Тип для результатов запроса
export type QueryResult<T = any> = [T[], any];

// Создаем пул соединений
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'klimat',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export async function query<T = any>(
  sql: string,
  params: any[] = []
): Promise<T[]> {
  // ВАЖНО: заменяем undefined -> null,
  // чтобы mysql2 не ругался "Bind parameters must not contain undefined"
  const safeParams = params.map((p) => (p === undefined ? null : p));

  try {
    console.log('SQL:', sql.trim().replace(/\s+/g, ' '));
    console.log('PARAMS:', safeParams);

    const [rows] = await pool.execute(sql, safeParams);
    return rows as T[];
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
}