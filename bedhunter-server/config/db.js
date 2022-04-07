// https://www.section.io/engineering-education/how-to-build-authentication-api-with-jwt-token-in-nodejs/
/** ADATBÁZIS KAPCSOLAT KIÉPÍTÉSE */
const mongoose = require('mongoose')
const express = require('express')
var config = require('./dbconfig.json')

const mysql = require('mysql');
const con = mysql.createConnection({
    host: config.host,
    port: config.port,
    database: config.database,
    user: config.user,
    password: config.password
})

con.connect((err)=>{
    console.log("MySQL connected for query!");

    /*
    const myquery = "Select * FROM users"
    var resultQuery = con.query(myquery, (err, result, fields) =>{
        if (err) throw err
        con.query(myquery, (err, result) =>{
            if (err) throw err
            console.log(result)
        })
    })
    //console.log(resultQuery);*/
})