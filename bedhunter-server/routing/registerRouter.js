const express = require('express')
const router = express.Router()
const app = express();
const bodyParser = require('body-parser')
const db = require('../config/lokidb');
const uuid = require('uuid');
const bcrypt = require('bcrypt');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());

const usersCollection = db.getCollection("users");

function hashPassword(password) {
    const saltRounds = 8;
    hash = bcrypt.hashSync(password, saltRounds);
    console.log(`register hash : ${hash}`);
    return hash;
}

router.post('/', (req, res) => {
    var user = createUserObject(req.body)
    //validateRegistration(user)
    var isUserRegistered = isAlreadyRegistered(req.body, res)
    if( isUserRegistered ) {
        return res.status(409).json({ "Error": "Already registered" }).end(); // Conflict
    }
    user.id = uuid.v4();
    user.password = hashPassword(req.body.password);
    usersCollection.insertOne(user);
    console.log("Registered successfully.");
    db.saveDatabase();

    res.json(user);
    res.status(200);
    res.end();
})


function isAlreadyRegistered(reqBody, res) {
    var searchedUser = usersCollection.findOne({ "email": reqBody.email })
    if (searchedUser != null) {
        return true;
    }
    return false;
}




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