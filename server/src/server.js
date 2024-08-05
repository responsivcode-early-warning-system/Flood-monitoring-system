var mysql = require("mysql2");

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "19001",
    database: "flood_monitoring",

});

module.exports= con;