var express = require('express');
var app = express();
var router = express.Router();
var mysql = require('mysql');
var bodyParder = require('body-parser');
var cors = require('cors');
// app.use(bodyParder.urlencoded({ extended: true })); //表单请求
// app.use(bodyParder.json()); //json请求
// app.use(cors());
app.use(bodyParder.urlencoded({ extended: true }), bodyParder.json(), cors());

let option = {
    host: 'localhost',
    user: 'root',
    password: 'admin123',
    port: '3306',
    database: 'tongxun',
    connectTimeout: 5000, //连接超时
    multipleStatements: false //是否允许一个query中报包含多条sql语句
}

let pool;
repool();

function Result({ code = 1, msg = '', data = {} }) {
    this.code = code;
    this.msg = msg;
    this.data = data;
}

function repool() {
    pool = mysql.createPool({
        ...option,
        waitForConnections: true, //当无连接池可用时，等待(true)还是报错(false)
        connectionLimit: 100, //链接数限制
        queueLimit: 0 //最大连接等待数(0为不限制)
    })
    pool.on('error', err => err.code === 'PROTOCOL_CONNECTION_LOST' && setTimeout(repool, 2000))
}
module.exports = { app, router, Result, pool }