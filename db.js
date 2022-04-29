const mysql = require("mysql2/promise")
require("dotenv").config()

const pool = mysql.createPool({
  connectionLimit: 5,
  host: "localhost",
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
})

module.exports = pool
