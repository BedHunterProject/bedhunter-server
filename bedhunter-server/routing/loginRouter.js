// handles login usind the previously registered userObjects

const express = require('express')
const router = express.Router()
const app = express();
const bodyParser = require('body-parser')
const db = require('../config/lokidb');
const bcrypt = require('bcrypt');
const config = require('../config/serviceConfig.json')

//session management
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
app.use(cookieParser());

// middlewares
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.json())


const usersCollection = db.getCollection("users");

// password validation with bcrypt
async function validatePassword(bodyPassword, userPassword){
    var compareResult =  await bcrypt.compare(bodyPassword, userPassword);
    console.log(compareResult);
    return compareResult;
}

// login
router.post('/', async (req, res) => {
    console.log(req.session);
    // sends error if user is already logged in
    var user = usersCollection.findOne({ 'email': req.body.email });
    if (req.session != undefined && req.session.userid === user.id){
        return res.status(409).json({"Error" : "Already logged in"}).end(); // Conflict
    }
    if (config.enableConsoleLogging){
        console.log(req.session.userid);
        console.log(user.id);
    }
    // sends error if user doesnt't exist
    if (user == null || typeof user !== 'object') {
        res.status(404); res.json({ "Error": "User not found" }); throw new Error("User not found.");
    } 
    // logging in
    if (req.body.email === user.email && await validatePassword(req.body.password, user.password)) {
        var session = req.session;
        session.userid = user.id;
        console.log(`Logged in successfully. `)
        res.json(session);
        res.status(200);
        res.end();
    }
    else {
        res.send('Invalid username or password');
    }
})

// logging out destroys the session and redirects to the home page
app.get('/logout',(req,res) => {
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;