const mysql = require("mysql2");

let conn = mysql.createConnection({
    host : "project-db-stu.ddns.net",
    user : "team_g_1",
    password : "smhrd1",
    port : 3307,
    database : "campus_g_1_1012"
});

conn.connect();

module.exports = conn;