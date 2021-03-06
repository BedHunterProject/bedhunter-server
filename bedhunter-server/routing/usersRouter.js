// creates new userObjects as register

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

// show all users, only the admin can see this
router.get('/', (req, res) => {
    const usersQuery = usersCollection.find();
    var usersResponse = [];
    usersQuery.forEach(user => {
        var userObject = createUserObject(user);
        usersResponse.push(userObject);
    })
    res.json({
        users: usersResponse
    });
})

router.post('/register', (req, res) => {
    var user = createUserObject(req.body)
    user.id = uuid.v4();
    // hashPW needed
    usersCollection.insertOne(user);
    db.saveDatabase();
    res.json(user);
})

router.route('/:user_id')
    // shows one user
    .get((req, res) => {
        console.log(`Get User: ${req.params.user_id}`)
        var userQuery = usersCollection.findOne({"id": req.params.user_id});
        var userObject = createUserObject(userQuery);
        res.send(userObject);
    })
    // updates one user
    .patch((req, res) => {
        if (enableConsoleLogging) PrintOutUser(req.body, req.params.user_id);
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
    // deletes one user
    .delete((req, res) => {
        console.log(`Delete User with id: ${req.params.user_id}`);
        usersCollection.findAndRemove({ 'id': req.params.user_id });
        db.saveDatabase();
        res.status(204).send();
    })


function createUserObject(user){
    var userObject = {};
    userObject.id = user.id;
    userObject.email = user.email;
    userObject.password = user.password;
    userObject.name = user.name;
    userObject.birthdate = user.birthdate;
    userObject.phone = user.phone;
    return userObject;
}

function PrintOutUser(user, id) {
    if (user.id === undefined && id != undefined) {
        console.log(id)
    } else {
        console.log(user.id);
    }
    console.log(user.name);
    console.log(user.address);
    console.log(user.contact_phone);
    console.log(user.contact_email);
    console.log(user.category_id);
}

module.exports = router