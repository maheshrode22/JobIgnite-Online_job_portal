require("dotenv").config();
let mysql = require("mysql2");

let conn = mysql.createConnection({
    host: process.env.db_host || "localhost",
    user: process.env.db_username || "root",
    password: process.env.db_password || "",
    database: process.env.db_dbname || "jobIgnite"
});

conn.connect((err) => {
    if (err) {
        console.error("❌ Database is not connected: " + err.message);
    } else {
        console.log("✅ Database is connected");
    }
});

module.exports = conn;
