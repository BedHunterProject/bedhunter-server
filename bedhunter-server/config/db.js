// https://www.section.io/engineering-education/how-to-build-authentication-api-with-jwt-token-in-nodejs/
/** ADATBÁZIS KAPCSOLAT KIÉPÍTÉSE */
require('dotenv').config();
var config = require('./dbconfig.json')
var loki = require('lokijs')
var db = new loki('db.json')

module.exports = db;

/*

const mysql = require('mysql');
const con = mysql.createConnection({
    host: config.host,
    port: config.port,
    database: config.database,
    user: config.user,
    password: config.password
})

let sql = "SELECT * FROM rooms WHERE hotel_id = 3;"
con.query(sql, function(err, result) {
    console.log("Connected to MySQL")
    if (err) throw err;
    console.log(result);
})
*/
