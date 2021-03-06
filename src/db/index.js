const mysql = require("mysql");
var connection
function handleDisconnect() {
    connection = process.env.NODE_ENV === 'production' ? mysql.createConnection({
        host: "remotemysql.com",
        user: "tYttpMxSi4",
        password: "FM0Q5alF0P",
        database: "tYttpMxSi4",
        port: "3306"
    }) : mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "02100120",
        database: "online_store_system",
        port: "3306"
    });;
    // connection = mysql.createConnection({
    //     host: "localhost",
    //     user: "root",
    //     password: "02100120",
    //     database: "online_store_system",
    //     port: "3306"
    // });
    connection.connect(function (err) {
        if (err) throw err;
        console.log("Connected!!!")
    });
    connection.on('error', function (err) {
        console.log('db error', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
            handleDisconnect();                         // lost due to either server restart, or a
        } else {                                      // connnection idle timeout (the wait_timeout
            throw err;                                  // server variable configures this)
        }
    });
}
handleDisconnect()

module.exports = connection;
