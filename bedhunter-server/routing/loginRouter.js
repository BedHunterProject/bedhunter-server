const express = require('express')
const router = express.Router()
const app = express();
const bodyParser = require('body-parser')
const db = require('../config/lokidb');
const uuid = require('uuid');

//session management
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
app.use(cookieParser());

// middlewares
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.json())

//db
const usersCollection = db.getCollection("users");

var session;
router.post('/', (req, res) => {

    var user = usersCollection.findOne({ 'email': req.body.email });

    if (user == null || typeof user !== 'object') {
        res.status(404); res.json({ "Error": "User not found" }); throw new Error("User not found.");
    } 
   
    if (req.body.email === user.email && req.body.password === user.password) {
        session = req.session;
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

app.get('/logout',(req,res) => {
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;