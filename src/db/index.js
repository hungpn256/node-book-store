const mysql = require("mysql");
var connection
function handleDisconnect() {
    // connection = mysql.createConnection({
    //     host: "remotemysql.com",
    //     user: "tYttpMxSi4",
    //     password: "FM0Q5alF0P",
    //     database: "tYttpMxSi4",
    //     port: "3306"
    // });
    connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "02100120",
        database: "online_store_system",
        port: "3306"
    });
    var del = connection._protocol._delegateError;
    connection._protocol._delegateError = function (err, sequence) {
        if (err.fatal) {
            console.trace('fatal error: ' + err.message);
        }
        return del.call(this, err, sequence);
    };

    console.log('connected');
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
