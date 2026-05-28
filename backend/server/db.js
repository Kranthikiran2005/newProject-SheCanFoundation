const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "kranthi_mysql#",
  database: "shecan_db",
});

db.connect((err) => {
  if (err) {
    console.log("Database Error", err);
  } else {
    console.log("MySQL Connected");
  }
});

module.exports = db;