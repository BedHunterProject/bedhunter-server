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
const enableConsoleLogging = false;

router.get('/', (req, res) => {
    const usersQuery = usersCollection.find();
    var usersResponse = [];
    usersQuery.forEach(user => {
        var userObject = createuserObject(user);
        usersResponse.push(userObject);
    })
    res.json({
        users: usersResponse
    });
})

router.post('/register', (req, res) => {
    var user = createuserObject(req.body)
    user.id = uuid.v4();
    usersCollection.insertOne(user);
    db.saveDatabase();
    res.json(user);
})

router.route('/:user_id')
    .get((req, res) => {
        console.log(`Get User: ${req.params.user_id}`)
        var userQuery = usersCollection.findOne({"id": req.params.user_id});
        var userObject = createuserObject(userQuery);
        res.send(userObject);
    })
    .patch((req, res) => {
        if (enableConsoleLogging) PrintOutuser(req.body, req.params.user_id);
        try {
            console.log(`Updating user with ID: ${req.params.user_id}`);
            usersCollection.findAndUpdate({'id': req.params.user_id }, (userObject) => {
                userObject.id = uuid.v4();
                userObject.email = req.body.email;
                userObject.password = req.body.password;
                userObject.name = req.body.name;
                userObject.birthdate = req.body.birthdate;
                userObject.phone = req.body.phone;
            });
            db.saveDatabase();
        } catch (err) {
            console.log(err);
        }

        res.status(204).send();
    })
    .delete((req, res) => {
        console.log(`Delete User called: ${req.params.user_id}`);
        usersCollection.findAndRemove({ 'id': req.params.user_id });
        db.saveDatabase();
        res.status(204).send();
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

module.exports = router