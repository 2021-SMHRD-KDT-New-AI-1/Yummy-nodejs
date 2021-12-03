const mysql = require("mysql2");

let conn = mysql.createConnection({
    host : "project-db-stu.ddns.net",
    user : "dbdb",
    password : "123456",
    port : 3307,
    database : "dbdb"
});

conn.connect();

module.exports = conn;