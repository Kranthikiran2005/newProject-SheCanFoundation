const express = require("express");
const cors = require("cors");
const db = require("./db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const SECRET_KEY = "mysupersecretkey";


// CONTACT FORM API

app.post("/api/contact", (req, res) => {
  const { name, email, message } = req.body;

  const sql =
    "INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)";

  db.query(sql, [name, email, message], (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
      });
    }

    res.json({
      success: true,
      message: "Form Submitted Successfully",
    });
  });
});


// LOGIN API

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM admins WHERE email=?";

  db.query(sql, [email], async (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
      });
    }

    if (result.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Invalid Email",
      });
    }

    const admin = result[0];

    const isMatch = await bcrypt.compare(
      password,
      admin.password
    );

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid Password",
      });
    }

    const token = jwt.sign(
      { id: admin.id },
      SECRET_KEY,
      { expiresIn: "1d" }
    );

    res.json({
      success: true,
      token,
    });
  });
});


// MIDDLEWARE

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      message: "No Token",
    });
  }

  try {
    jwt.verify(token, SECRET_KEY);
    next();
  } catch (err) {
    return res.status(401).json({
      message: "Invalid Token",
    });
  }
};


// PROTECTED ROUTE

app.get("/api/messages", verifyToken, (req, res) => {
  db.query("SELECT * FROM contacts", (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
      });
    }

    res.json(result);
  });
});


app.listen(5000, () => {
  console.log("Server running on port 5000");
});