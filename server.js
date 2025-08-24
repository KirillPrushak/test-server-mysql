import express from 'express';
import mysql from "mysql2/promise";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get("/courses", async (_, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM courses");
    res.json({ courses: rows, success: true });
  } catch (err) {
    res.status(500).json({ error: err.message, success: false });
    console.error("Ошибка при получении курсов:", err);
  }
});

const MYSQL_URL = "mysql://root:EcDYcKALedEALngttIPyFqsIYqFOzPig@caboose.proxy.rlwy.net:50875/railway";

const getDbConfig = () => {
  return {
    uri: MYSQL_URL,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  };
};

const pool = mysql.createPool(getDbConfig());

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server started on port ${PORT}`);
});
