const express = require('express')
const app = express();
const db = require('../config/lokidb');
const moment = require('moment');
const logger = require('node-color-log'); //https://github.com/tigercosmos/node-color-log
const config = require('../config/serviceConfig.json')

app.use(express.json());


//session management
const cookieParser = require("cookie-parser");
require('express-session');
app.use(cookieParser());

module.exports = (req, res, next) =>  {
    return CheckIfUserLoggedIn(req, res, next);
}

function CheckIfUserLoggedIn(req, res, next) {
    if (req.session != undefined && req.session.userid != undefined) {
        var cookieExpires = req.session.cookie.expires;
        var now = Date.now();
        var diff = cookieExpires - now;

        if (config.enableSessionDataLogging) LogSessionData(cookieExpires, now, diff);
        next();
    } else {
        if (req.originalUrl == "/login" || req.originalUrl == "/register") {
            return next();
        }
        if (req.session != undefined) {
            console.log("Destroy session.");
            req.session.destroy();
        }
        
        //return res.send({"ErrorMessage": "You are unauthorized to access this page.", "ErrorCode":"4001"});
        return res.redirect("http://localhost:5000/login");
    }
}

function LogSessionData(cookieExpires, now, diff) {
    logger.color('red').log('---------SESSION DATA---------');
    logger.color('yellow').log(`Session cookie expire date: ${cookieExpires}`);
    logger.color('yellow').log(`Datetime now: ${moment(now).format('dddd, MMMM Do, YYYY h:mm:ss A')}`);
    logger.color('yellow').log(`Session is active. Token expiring in ${diff / 1000} seconds.`);
    logger.color('red').log('---------SESSION DATA---------');
}

