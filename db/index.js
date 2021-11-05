const mysql = require("mysql");

var connection = mysql.createConnection({
    host: "remotemysql.com",
    user: "tYttpMxSi4",
    password: "FM0Q5alF0P",
    database: "tYttpMxSi4",
    port: "3306"
});
module.exports = connection;
