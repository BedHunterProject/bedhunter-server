const express = require('express')
const router = express.Router()
const app = express();
const bodyParser = require('body-parser')
const db = require('../config/lokidb');
const uuid = require('uuid');

//session management
const cookieParser = require("cookie-parser");
const session = require('express-session');
app.use(cookieParser());

// middlewares
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.json())

/** SESSION MANAGEMENT */
app.use(session({
    secret: 'testing the session', // sign the session id cookie
    resave: false, // for every request we create a new Session
    saveUninitialized: false, // unmodified sessions won't be saved
    cookie: {maxAge: 1000 * 30}
  }));

//db
const usersCollection = db.getCollection("users");

router.post('/', (req, res) => {

    var user = usersCollection.findOne({ 'email': req.body.email });

    var session;
    if (req.body.email === user.email && req.body.password === user.password) {
        session = req.session;
        //session.userid = user.name;
        console.log(`Logged in successfully. SessionID: ${req.session}`)
        res.json(session.cookie.expires);
    }
    else {
        res.send('Invalid username or password');
    }

    //login granted
    //send back random session ID for cookie
    //save sessionId with expiry in DB

    
})

app.get('/logout',(req,res) => {
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;