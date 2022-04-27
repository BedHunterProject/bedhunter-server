// creates new userObjects that can then be used to login

const express = require('express')
const router = express.Router()
const app = express();
const bodyParser = require('body-parser')
const db = require('../config/lokidb');
const uuid = require('uuid');
const bcrypt = require('bcrypt');
const cors = require('cors');

//var corsOptions = { origin: "http://localhost:3000/"}
const corsOptions = {
    origin: true,
    methods: ['GET, POST'],
    credentials: true
  };

app.use(cors(corsOptions))

// enable cors for all resources
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());

const usersCollection = db.getCollection("users");

// creates password hash
function hashPassword(password) {
    const saltRounds = 8;
    hash = bcrypt.hashSync(password, saltRounds);
    console.log(`password hash : ${hash}`);
    return hash;
}

router.post('/', (req, res) => {
    var user = createUserObject(req.body)
    var isUserRegistered = isAlreadyRegistered(req.body, res)
    if( isUserRegistered ) {
        return res.status(409).json({ "Error": "Already registered" }).end(); // Conflict
    }
    // creates uuid and password hash
    user.id = uuid.v4();
    user.password = hashPassword(req.body.password);
    usersCollection.insertOne(user);
    console.log("Registered successfully.");
    db.saveDatabase();

    res.json(user);
    res.status(200);
    res.end();
})

// if the user is already registered, it sends true
function isAlreadyRegistered(reqBody, res) {
    var searchedUser = usersCollection.findOne({ "email": reqBody.email })
    if (searchedUser != null) {
        return true;
    }
    return false;
}


// creates a new user object
function createUserObject(user) {
    var userObject = {};
    userObject.id = user.id;
    userObject.email = user.email;
    userObject.password = user.password;
    userObject.name = user.name;
    userObject.birthdate = user.birthdate;
    userObject.phone = user.phone;
    return userObject;
}

module.exports = router;