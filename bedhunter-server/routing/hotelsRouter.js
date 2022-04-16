const express = require('express')
const router = express.Router()
const app = express();
const bodyParser = require('body-parser')
const db = require('../config/lokidb');
const uuid = require('uuid');
const config = require('../config/serviceConfig.json')
const logger = require('node-color-log');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());

const hotelsCollection = db.getCollection("hotels");

// itt jelennek meg a hotelek által fladott hírdetések (db Hotels tábla)
router.get('/', (req, res) => {
    const hotelsQuery = hotelsCollection.find();
    var hotelsResponse = [];
    hotelsQuery.forEach(hotel => {
        var hotelObject = createHotelObject(hotel);
        hotelsResponse.push(hotelObject);
    });
    logger.color('red').log('hotels returning');
    res.status(200);
    res.json({
        hotels: hotelsResponse
    });
    res.end();
})

router.post('/new', (req, res) => {
    var hotel = createHotelObject(req.body);
    hotel.id = uuid.v4();
    hotelsCollection.insertOne(hotel);
    res.status(200);
    res.json(hotel);
    res.end();
})

router.route('/:hotel_id')
    .get((req, res) => {
        var hotelQuery = hotelsCollection.findOne({ 'id': req.params.hotel_id });
        var hotelObject = createHotelObject(hotelQuery)
        res.send(hotelObject);
        res.status(200);
        res.end();
    })
    .patch((req, res) => {
        if (config.enableConsoleLogging) PrintOutHotel(req.body, req.params.hotel_id);

        var hotelDoc = hotelsCollection.findOne({ 'id': req.params.hotel_id });
        if (config.enableConsoleLogging) PrintOutHotel(hotelDoc);

        if (hotelDoc.id === undefined) {
            throw new Error("Hotel not found in Db");
        }

        hotelDoc = getHotelFromRequestBody(req, hotelDoc); //updating the hotel from db

        try {
            hotelsCollection.update(hotelDoc);
            db.saveDatabase();
        } catch (err) {
            console.log(err);
        }

        res.status(204).send();
    })
    .delete((req, res) => {
        hotelsCollection.findAndRemove({ 'id': req.params.hotel_id });
        console.log(`Delete Hotel finished`);
        res.status(204);
        res.status(200);
        res.end();
    })


router.param('hotel_id', (req, res, next, hotel_id) => {
    console.log(hotel_id);
    next(); // middleware jön
})

function createHotelObject(hotel) {
    var hotelObject = {};
    hotelObject.id = hotel.id;
    hotelObject.name = hotel.name;
    hotelObject.address = hotel.address;
    hotelObject.contact_phone = hotel.contact_phone;
    hotelObject.contact_email = hotel.contact_email;
    hotelObject.category_id = hotel.category_id;
    return hotelObject;
}

function PrintOutHotel(hotel, id) {
    if (hotel.id === undefined && id != undefined) {
        console.log(id)
    } else {
        console.log(hotel.id);
    }
    console.log(hotel.name);
    console.log(hotel.address);
    console.log(hotel.contact_phone);
    console.log(hotel.contact_email);
    console.log(hotel.category_id);
}

function getHotelFromRequestBody(req, hotelDoc) {
    hotelDoc.id = req.params.hotel_id;
    hotelDoc.name = req.body.name;
    hotelDoc.address = req.body.address;
    hotelDoc.contact_phone = req.body.contact_phone;
    hotelDoc.contact_email = req.body.contact_email;
    hotelDoc.category_id = req.body.category_id;
    return hotelDoc;
}

module.exports = router