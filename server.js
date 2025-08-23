import express from "express";
import mysql from "mysql2/promise";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const PORT = 3000;

console.log(process.env.prod_user);

app.use;
cors({
  origin: ["https://test-course-app.netlify.app", "http://localhost:3000"],
  credentials: true,
});
// app.use(cors());
app.use(bodyParser.json());

const dbConfig = {
  host: "caboose.proxy.rlwy.net",
  port: 50875,
  user: "root",
  password: "EcDYcKALedEALngttIPyFqsIYqFOzPig",
  database: "railway",
};

const pool = mysql.createPool(dbConfig);

export async function getCourses() {
  try {
    const [rows] = await pool.query("SELECT * FROM courses");
    console.log("Courses:", rows);
    return rows;
  } catch (err) {
    console.error("Ошибка при получении курсов:", err);
    throw err;
  }
}

app.get("/courses", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM courses");
    res.json({ courses: rows, success: true });
  } catch (err) {
    res.status(500).json({ error: err.message, success: false });
    console.error("Ошибка при получении курсов:", err);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

process.on("SIGTERM", () => {
  console.log("Received SIGTERM, shutting down gracefully");
  process.exit(0);
});

process.on("SIGINT", () => {
  console.log("Received SIGINT, shutting down gracefully");
  process.exit(0);
});
