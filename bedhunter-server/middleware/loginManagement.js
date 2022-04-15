const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const db = require('../config/lokidb');
const uuid = require('uuid');

app.use(express.json());

const usersCollection = db.getCollection("users");

//session management
const cookieParser = require("cookie-parser");
const session = require('express-session');
app.use(cookieParser());

module.exports = (req, res, next) => {
    console.log('LoginManagement called');

    

    if (req.session != undefined) {
        console.log(req.session);
    }

    next();
}

