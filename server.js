const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();

// ✅ CORS
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "DELETE"],
  allowedHeaders: ["Content-Type"]
}));

app.use(express.json());

// ✅ DB CONNECTION
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Raju@21", // ✔ your password
  database: "event_system"
});

// CONNECT DB
db.connect(err => {
  if (err) {
    console.error("❌ DB ERROR:", err);
  } else {
    console.log("✅ MySQL Connected");
  }
});

// ================= TEST ROUTE =================
app.get("/test", (req, res) => {
  res.send("✅ Server Working");
});

// ================= REGISTER =================
app.post("/register", (req, res) => {
  console.log("📥 DATA:", req.body);

  const { name, college, phone, email, event, type } = req.body;

  if (!name || !college || !phone || !email || !event || !type) {
    return res.json({ message: "All fields required" });
  }

  const sql = `
    INSERT INTO students (name, college, phone, email, event, type)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(sql, [name, college, phone, email, event, type], (err) => {
    if (err) {
      console.error(err);
      return res.json({ message: "DB Error" });
    }

    res.json({ message: "✅ Registered Successfully" });
  });
});

// ================= GET =================
app.get("/students", (req, res) => {
  db.query("SELECT * FROM students ORDER BY id DESC", (err, result) => {
    if (err) {
      console.error(err);
      return res.json([]);
    }

    res.json(result);
  });
});

// ================= DELETE =================
app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;

  console.log("🔥 DELETE HIT:", id);

  db.query("DELETE FROM students WHERE id = ?", [id], (err) => {
    if (err) {
      console.error(err);
      return res.json({ message: "Delete failed" });
    }

    res.json({ message: "Deleted successfully" });
  });
});

// ================= START SERVER =================
app.listen(5000, () => {
  console.log("🚀 Server running at http://127.0.0.1:5000");
});