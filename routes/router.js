const express = require("express");
const router = express.Router();

const conn = require("../config/DBConn.js");

router.get("/Gaip", function(request, response) {
    let id = request.query.id;
    let pw = request.query.pw;
    let nick = request.query.nick;

    let sql = "insert into customer values(?, ?, ?, '0', 0)";
    conn.query(sql, [id, pw, nick], function(err, rows) {
        response.render("Gaip", {
            id : id,
            pw : pw,
            nick : nick
        })
    })
})

module.exports = router;