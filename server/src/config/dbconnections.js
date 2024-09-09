const mysql = require('mysql2');

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "19001",
    database: "flood_monitoring",

})
module.exports = db