
const mysql = require('mysql2/promise');
require('dotenv').config();

const db = mysql.createPool({
    host: 'localhost',
    user: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: 'todo-app',
});

module.exports = db;

