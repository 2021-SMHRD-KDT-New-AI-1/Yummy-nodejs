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

router.get("/Post", function(request, response) {
    let id = request.query.id;
    let content = request.query.content;

    let sql = "insert into posts(post_num, member_id, post_content, post_date, post_like, post_comments) values(null, ?, ?, date_format(now(), '%y-%m-%d'), 0, 0)";
    conn.query(sql, [id, content], function(err, rows) {
        // response.render("Post", {
        //     id : id,
        //     content : content
        // })
        response.send('success');
    })
})

router.get("/Community", function(request, response) {
    let sql = "select a.post_num, a.member_id, a.post_content, a.post_date, a.post_like, count(b.post_num) post_comments from posts a left outer join comments b on a.post_num=b.post_num group by a.post_num order by a.post_num desc;"
    conn.query(sql, function(err, rows) {
        let arr = Array();
        for (let i=0;i<rows.length;i++) {
            let data = new Object();
            data.post_num = rows[i].post_num;
            data.member_id = rows[i].member_id;
            data.post_content = rows[i].post_content;
            data.post_date = rows[i].post_date;
            data.post_like = rows[i].post_like;
            data.post_comments = rows[i].post_comments;
            arr.push(data);
        }
        let jsonData = JSON.stringify(arr);
        response.send(jsonData);
    })
})

router.get("/Like", function(request, response) {
    let post_num = request.query.post_num;

    let sql = "update posts set post_like = post_like + 1 where post_num = ?";
    conn.query(sql, [post_num], function(err, rows) {
        response.send('success');
    })
})

router.get("/Comment", function(request, response) {
    let post_num = request.query.post_num;
    let sql = "select * from comments where post_num=? order by comment_num desc;"
    conn.query(sql, [post_num], function(err, rows) {
        let arr = Array();
        for (let i=0;i<rows.length;i++) {
            let data = new Object();
            data.comment_num = rows[i].comment_num;
            data.member_id = rows[i].member_id;
            data.post_num = rows[i].post_num;
            data.comment_cont = rows[i].comment_cont;
            data.comment_date = rows[i].comment_date;
            arr.push(data);
        }
        let jsonData = JSON.stringify(arr);
        response.send(jsonData);
    })
})

router.get("/Write", function(request, response) {
    let member_id = request.query.member_id;
    let post_num = request.query.post_num;
    let comment_con = request.query.comment_con;

    let sql = "insert into comments(comment_num, member_id, post_num, comment_cont, comment_date) values(null, ?, ?, ?, curdate())";
    conn.query(sql, [member_id, post_num, comment_con], function(err, rows) {
        response.send('success');
    })
})

router.get("/Food", function(request, response) {
    let food_kor_name = request.query.food_kor_name;
    let sql = "select a.food_name, a.food_img_path, a.food_ingre, a.food_favor, a.food_kcal, a.food_desc, a.food_kor_name, b.no_halar, b.no_vegan, b.no_egg, b.no_nut, b.no_fish, b.no_bean from food a left outer join notifications b on a.food_num=b.food_num where a.food_kor_name=?;";
    conn.query(sql, [food_kor_name], function(err, rows) {
        let arr = Array();
        for (let i=0;i<rows.length;i++) {
            let data = new Object();
            data.food_name = rows[i].food_name;
            data.food_img_path = rows[i].food_img_path;
            data.food_ingre = rows[i].food_ingre;
            data.food_favor = rows[i].food_favor;
            data.food_kcal = rows[i].food_kcal;
            data.food_desc = rows[i].food_desc;
            data.food_kor_name = rows[i].food_kor_name;
            data.no_halar = rows[i].no_halar;
            data.no_vegan = rows[i].no_vegan;
            data.no_egg = rows[i].no_egg;
            data.no_nut = rows[i].no_nut;
            data.no_fish = rows[i].no_fish;
            data.no_bean = rows[i].no_bean;
            arr.push(data);
        }
        let jsonData = JSON.stringify(arr);
        response.send(jsonData);
    })
})

router.get("/Update", function(request, response) {
    let member_id = request.query.member_id;
    let member_pw = request.query.member_pw;

    let sql = "update members set member_pw = ? where member_id = ?";
    conn.query(sql, [member_pw, member_id], function(err, rows) {
        response.send('success');
    })
})

router.get("/Delete", function(request, response) {
    let member_id = request.query.member_id;

    let sql = "delete from members where member_id = ?";
    conn.query(sql, [member_id], function(err, rows) {
        response.send('success');
    })
})

module.exports = router;