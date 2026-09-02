import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST || "localhost",
  port: Number(process.env.MYSQL_PORT) || 3306,
  user: process.env.MYSQL_USER || "root",
  password: process.env.MYSQL_PASSWORD || "",
  database: process.env.MYSQL_DATABASE || "esp32_controller",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export async function query<T = unknown>(sql: string, params?: unknown[]): Promise<T> {
  try {
    const [results] = await pool.execute(sql, params as any);
    return results as T;
  } catch (error) {
    console.error("[MYSQL DB QUERY ERROR]", error);
    throw error;
  }
}

export default pool;
