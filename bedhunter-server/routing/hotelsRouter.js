const express = require('express')
const router = express.Router()

// itt jelennek meg a hotelek által fladott hírdetések (db Hotels tábla)
router.get('/', (req, res) => {
    res.send('Hotels list')
})

// ide jön majd egy ŰRLAP ami majd a db Hotels táblájába ad át adatokat, csak az ADMIN látja!!
router.get('/new', (req, res) => {
    res.send('New Hotel Form')
})

// ÚJ szoba hozzáadása, ADMIN!
router.post('/', (req, res) => {
    res.send('Create Hotel')
})

router.route('/:hotel_id')
    .get((req, res) => { // egy szobát jelenít meg
        console.log(`Get Hotel called: ${req.params.hotel_id}`);
        res.send(`Get Hotel ID: ${req.params.hotel_id}`)
    })
    .put((req, res) => { // egy szobát módosít
        console.log(`Update Hotel called: ${req.params.hotel_id}`);
        res.send(`Update Hotel ID: ${req.params.hotel_id}`)
    })
    .delete((req, res) => { // egy szobát töröl
        console.log(`Delete Hotel called: ${req.params.hotel_id}`);
        res.send(`Delete Hotel ID: ${req.params.hotel_id}`)
    })


router.param('hotel_id', (req, res, next, hotel_id) => {
    console.log(hotel_id)
    next() // middleware jön
})

module.exports = router