const express = require('express')
const app = express();
const db = require('../config/lokidb');
const moment = require('moment');
const logger = require('node-color-log'); //https://github.com/tigercosmos/node-color-log
const config = require('../config/serviceConfig.json');
//const forbiddenRoutes = require('../data/forbiddenRoutes.json');
app.use(express.json());


//session management
const cookieParser = require("cookie-parser");
require('express-session');
app.use(cookieParser());

module.exports = (req, res, next) => {
    return checkIfUserLoggedIn(req, res, next);
}

function checkIfUserLoggedIn(req, res, next) {
    if (req.session != undefined && req.session.userid != undefined) {
        var cookieExpires = req.session.cookie.expires;
        var now = Date.now();
        var diff = cookieExpires - now;

        if (config.enableSessionDataLogging) logSessionData(cookieExpires, now, diff);
        /*var isUnauthorized = manageAdmins(req, res, next);  //disabled for the time being. ForbiddenRoutes was deleted, and it should be solved in another way.
        console.log("isUnauthorized:"+ isUnauthorized);
        if (isUnauthorized) {
            console.log("unauthorized page for the user. 409");
            return res.send({ "ErrorMessage": "You are unauthorized to access this page.", "ErrorCode": "4001" });
        }*/

        next();
    } else {
        if (req.originalUrl == "/login" || req.originalUrl == "/register") {
            return next();
        }
        if (req.session != undefined) {
            console.log("Destroy session.");
            req.session.destroy();
        }

        next(); //TODO this is only for demo purposes. It should not be here! 
        return res.send({ "ErrorMessage": "You are unauthorized to access this page.", "ErrorCode": "4001" });
        // return res.redirect("http://localhost:5000/login");
    }
}

var adminsCollection = db.getCollection("admins")
function isUserAdmin(userId) {
    var admin = adminsCollection.findOne({ 'userId': userId })
    if (admin != null && admin != undefined) {
        return true;
    }
    return false;
}

function manageAdmins(req) {
    if (!isUserAdmin(req.session.userid)) {
        var foundRouteInForbiddenList = forbiddenRoutes.find(x=> x.method == req.method && x.path == req.originalUrl);
        if (foundRouteInForbiddenList) {
            return true;
        }
        return false;
    }
    return false;
}


function logSessionData(cookieExpires, now, diff) {
    logger.color('red').log('---------SESSION DATA---------');
    logger.color('yellow').log(`Session cookie expire date: ${cookieExpires}`);
    logger.color('yellow').log(`Datetime now: ${moment(now).format('dddd, MMMM Do, YYYY h:mm:ss A')}`);
    logger.color('yellow').log(`Session is active. Token expiring in ${diff / 1000} seconds.`);
    logger.color('red').log('---------SESSION DATA---------');
}

