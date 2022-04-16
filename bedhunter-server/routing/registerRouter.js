const express = require('express')
const router = express.Router()
const app = express();
const bodyParser = require('body-parser')
const db = require('../config/lokidb');
const uuid = require('uuid');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());

const usersCollection = db.getCollection("users");

router.post('/', (req, res) => {
    var user = createuserObject(req.body)
    user.id = uuid.v4();
    usersCollection.insertOne(user);
    console.log("Registrated successfully.");
    db.saveDatabase();
    
    res.json(user);
    res.status(200);
    res.end();
})

function createuserObject(user){
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