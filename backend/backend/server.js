require("dotenv").config();

const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bcrypt = require("bcryptjs");

const app = express();

app.use(cors());
app.use(express.json());

// MYSQL CONNECTION
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT),
});

db.connect((err) => {
  if (err) {
    console.log("Database connection failed:", err);
  } else {
    console.log("MySQL Connected Successfully");
  }
});

app.get("/", (req, res) => {
  res.send("KRISHIMITRA Backend Running");
});

// SIGNUP API
app.post("/api/signup", async (req, res) => {
  const {
    name,
    email,
    password,
    phone,
    location,
    experience,
    land,
    crop,
    income,
  } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      message: "Name, email and password are required",
    });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = `
      INSERT INTO users
      (name, email, password, phone, location, experience, land, crop, income)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
      sql,
      [
        name,
        email,
        hashedPassword,
        phone,
        location,
        experience,
        land,
        crop,
        income,
      ],
      (err) => {
        if (err) {
          if (err.code === "ER_DUP_ENTRY") {
            return res.status(409).json({
              message: "Email already registered",
            });
          }

          return res.status(500).json({
            message: "Signup Failed",
            error: err.message,
          });
        }

        res.status(201).json({
          message: "Signup Successful",
        });
      }
    );
  } catch (error) {
    res.status(500).json({
      message: "Server error during signup",
    });
  }
});

// LOGIN API
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM users WHERE email = ?";

  db.query(sql, [email], async (err, results) => {
    if (err) {
      return res.status(500).json({
        message: "Login Failed",
      });
    }

    if (results.length === 0) {
      return res.status(401).json({
        message: "Invalid Email or Password",
      });
    }

    const user = results[0];

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid Email or Password",
      });
    }

    delete user.password;

    res.json({
      message: "Login Successful",
      user,
    });
  });
});

// FEEDBACK API
app.post("/api/feedback", (req, res) => {
  const { name, email, rating, message } = req.body;

  const sql =
    "INSERT INTO feedback (name, email, rating, message) VALUES (?, ?, ?, ?)";

  db.query(sql, [name, email, rating, message], (err) => {
    if (err) {
      return res.status(500).json({
        message: "Failed to submit feedback",
      });
    }

    res.json({
      message: "Feedback submitted successfully",
    });
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});