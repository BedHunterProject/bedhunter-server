const express = require('express')
const router = express.Router()
const app = express();
const bodyParser = require('body-parser')
const db = require('../config/lokidb');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const hotelsCollection = db.getCollection("hotels");

// itt jelennek meg a hotelek által fladott hírdetések (db Hotels tábla)
router.get('/', (req, res) => {
    console.log(`/hotels/ was called.`);
    const hotelsQuery = hotelsCollection.find();
    var hotelsResponse = [];
    hotelsQuery.forEach(hotel => {
        var hotelObject = createHotelObject(hotel);
        hotelsResponse.push(hotelObject);
    });
    res.json({
        hotels: hotelsResponse
    });
})

// ide jön majd egy ŰRLAP ami majd a db Hotels táblájába ad át adatokat, csak az ADMIN látja!!
router.get('/new', (req, res) => {
    res.send('New Hotel Form');
})

// ÚJ szoba hozzáadása, ADMIN!
router.post('/', (req, res) => {
    res.send('Create Hotel');
})

router.route('/:hotel_id')
    .get((req, res) => {
        console.log(`Get Hotel called: ${req.params.hotel_id}`);
        var hotelQuery = hotelsCollection.findOne({'id': req.params.hotel_id});
        console.log(`Found hotel is the following: \r\n ${hotelQuery}`);
        var hotelObject = createHotelObject(hotelQuery)
        res.send(hotelObject);
    })
    .put((req, res) => {
        console.log(`Update Hotel called: ${req.params.hotel_id}`);
        res.send(`Update Hotel ID: ${req.params.hotel_id}`);
    })
    .delete((req, res) => {
        console.log(`Delete Hotel called: ${req.params.hotel_id}`);
        res.send(`Delete Hotel ID: ${req.params.hotel_id}`);
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

module.exports = router