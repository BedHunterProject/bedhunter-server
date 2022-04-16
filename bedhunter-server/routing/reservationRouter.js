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
const reservationsCollection = db.getCollection("reservations");
const hotelsCollection = db.getCollection("hotels");
const roomsCollection = db.getCollection("rooms");
const usersCollection = db.getCollection("users");
const enableConsoleLogging = false;

// create read delete

router.get('/', (req, res) => {
    if (reservationsCollection != null) {
        const reservationsQuery = reservationsCollection.findOne(); // all reservations
        var reservationsResponse = [];
        reservationsQuery.forEach(room => {
            var reservationObject = createReservationObject(reservation);
            reservationsResponse.push(reservationObject);
        })
        res.json({
            reservations: reservationsResponse
        });
    }
    else {
        console.log("No reservation found");
    }

})

router.post('/', (req, res, next) => {
    var reservation = createReservationObject(req.body);
    reservation.id = uuid.v4();
    reservationsCollection.insertOne(reservation);
    db.saveDatabase();
    res.status(2004)
    /* 
    TODO: give back a JSON object that reads the reservation's hotel's data and room's data
    */ 
})

router.route('/:room_id')
    .get((req, res) => {
        console.log(`Get reservation: ${req.params.reservation_id}`)
        var reservationQuery = reservationsCollection.findOne({ "id": req.params.reservation_id });
        var reservationObject = createReservationObject(reservationQuery);
        res.send(reservationObject);
    })
    .delete((req, res) => {
        console.log(`Delete reservation called: ${req.params.reservation_id}`);
        reservationsCollection.findAndRemove({ 'id': req.params.reservation_id });
        db.saveDatabase();
        res.status(204).send();
    })

function PrintOutReservation(reservation, id) {
    if (reservation.id === undefined && id != undefined) {
        console.log(id)
    } else {
        console.log(reservation.id);
    }
    console.log(reservation.booking_time);
    console.log(reservation.room_id);
    console.log(reservation.reservation_id);
}

function createReservationObject(reservation) {
    var reservationObject = {};
    reservationObject.id = reservation.id;
    reservationObject.booking_time = reservation.booking_time;
    reservationObject.room_id = reservation.room_id;
    reservationObject.user_id = reservation.user_id;
    return reservationObject;
}

module.exports = router;