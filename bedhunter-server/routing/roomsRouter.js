const express = require('express')
const router = express.Router()
const app = express();
const bodyParser = require('body-parser')
const db = require('../config/lokidb');
const uuid = require('uuid');

// middlewares
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.json())

// lokidb connection
const roomsCollection = db.getCollection("rooms");
const enableConsoleLogging = false;

router.get('/', (req, res) => {
    const roomsQuery = roomsCollection.find(); // all rooms
    var roomsResponse = [];
    roomsQuery.forEach(room => {
        var roomObject = createRoomObject(room);
        roomsResponse.push(roomObject);
    })
    res.json({
        rooms: roomsResponse
    });
})

router.post('/new', (req, res) => {
    var room = createRoomObject(req.body);
    room.id = uuid.v4();
    roomsCollection.insertOne(room);
    res.json(room);
})


router.route('/:room_id')
    .get((req, res) => {
        console.log(`Get Room: ${req.params.room_id}`);
        var roomQuery = roomsCollection.findOne({ 'id': req.params.room_id });
        console.log(`Found room is the following: \r\n ${roomQuery}`);
        var roomObject = createRoomObject(roomQuery);
        res.send(roomObject);
    })
    .patch((req, res) => {
        if (enableConsoleLogging) PrintOutRoom(req.body, req.params.room_id);
        try {
            console.log(`Updating room with ID: ${req.params.room_id}`);
            roomsCollection.findAndUpdate({'id': req.params.room_id }, (roomObject) => {
                roomObject.id = uuid.v4();
                roomObject.hotel_id = roomObject.hotel_id;
                roomObject.room_number = req.body.room_number;
                roomObject.beds_number = req.body.beds_number;
                roomObject.date_start = req.body.date_start;
                roomObject.date_end = req.body.date_end;
                roomObject.price = req.body.price;
            });
            db.saveDatabase();
        } catch (err) {
            console.log(err);
        }

        res.status(204).send();
    })
    .delete((req, res) => { // egy szobát töröl
        console.log(`Delete Room: ${req.params.room_id}`);
        roomsCollection.findAndRemove({ 'id': req.params.room_id });
        res.status(204).send();
    })


router.param('room_id', (req, res, next, room_id) => {
    console.log(room_id)
    next() // middleware jön
})

function createRoomObject(room) {
    var roomObject = {};
    roomObject.id = room.id;
    roomObject.hotel_id = room.hotel_id;
    roomObject.room_number = room.room_number;
    roomObject.beds_number = room.beds_number;
    roomObject.date_start = room.date_start;
    roomObject.date_end = room.date_end;
    roomObject.price = room.price;
    return roomObject;
}

function PrintOutRoom(room, id) {
    if (room.id === undefined && id != undefined) {
        console.log(id)
    } else {
        console.log(room.id);
    }
    console.log(room.hotel_id);
    console.log(room.room_number);
    console.log(room.beds_number);
    console.log(room.beds_number);
    console.log(room.date_start);
    console.log(room.date_end);
    console.log(room.price)
}


module.exports = router