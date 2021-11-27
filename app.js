const express = require("express");
const app = express();
const router = require("./routes/router.js");
const bodyparser = require("body-parser");

app.use(bodyparser.urlencoded({extended:false}));
app.use(router);
app.listen(3002);
// 3002 -> Server, 3306 -> Mysql, 5500 -> HTML