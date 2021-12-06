const express = require("express");
const router = express.Router();

const conn = require("../config/DBConn.js");

router.get("/Register", function(request, response) {
    console.log("dfdf");
    let id = request.query.id;
    let pw = request.query.pw;
    let name = request.query.name;
    let halar = request.query.halar;
    let vegan = request.query.vegan;
    let egg = request.query.egg;
    let nut = request.query.nut;
    let fish = request.query.fish;
    let bean = request.query.bean;

    let sql = "insert into members(member_id, member_pw, member_name, halar, vegan, egg, nut, fish, bean) values(?, ?, ?, ?, ?, ?, ?, ?, ?)";
    conn.query(sql, [id, pw, name, halar, vegan, egg, nut, fish, bean], function(err, rows) {
        response.render("Register", {
            id : id,
            pw : pw,
            name : name,
            halar : halar,
            vegan : vegan,
            egg : egg,
            nut : nut,
            fish : fish,
            bean : bean
        })
    })
})

router.get("/DoubleCheck", function(request, response) {
    let sql = "select member_id from members;"
    conn.query(sql, function(err, rows) {
        let arr = Array();
        for (let i=0;i<rows.length;i++) {
            let data = new Object();
            data.member_id = rows[i].member_id;
            arr.push(data);
        }
        let jsonData = JSON.stringify(arr);
        response.send(jsonData);
    })
})

router.get("/Login", function(request, response) {
    let sql = "select * from members;"
    conn.query(sql, function(err, rows) {
        let arr = Array();
        for (let i=0;i<rows.length;i++) {
            let data = new Object();
            data.member_id = rows[i].member_id;
            data.member_pw = rows[i].member_pw;
            data.member_name = rows[i].member_name;
            data.halar = rows[i].halar;
            data.vegan = rows[i].vegan;
            data.egg = rows[i].egg;
            data.nut = rows[i].nut;
            data.fish = rows[i].fish;
            data.bean = rows[i].bean;
            arr.push(data);
        }
        let jsonData = JSON.stringify(arr);
        response.send(jsonData);
    })
})

module.exports = router;