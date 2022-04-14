const express = require('express')
const router = express.Router()

// itt jelennek meg a hotelek által fladott hírdetések (db ROOMS tábla)
router.get('/', (req, res) => {
    res.send('Rooms list')
})

// ide jön majd egy ŰRLAP ami majd a db ROOMS táblájába ad át adatokat, csak az ADMIN látja!!
router.get('/new', (req, res) => {
    res.send('New Room Form')
})

// ÚJ szoba hozzáadása, ADMIN!
router.post('/', (req, res) => {
    res.send('Create Room')
})

router.route('/:room_id')
    .get((req, res) => { // egy szobát jelenít meg
        console.log(`Get room called: ${req.params.room_id}`);
        res.send(`Get Room ID: ${req.params.room_id}`)
    })
    .put((req, res) => { // egy szobát módosít
        console.log(`Update called: ${req.params.room_id}`);
        res.send(`Update Room ID: ${req.params.room_id}`)
    })
    .delete((req, res) => { // egy szobát töröl
        console.log(`Delete room called: ${req.params.room_id}`);
        res.send(`Delete Room ID: ${req.params.room_id}`)
    })


router.param('room_id', (req, res, next, room_id) => {
    console.log(room_id)
    next() // middleware jön
})

module.exports = router