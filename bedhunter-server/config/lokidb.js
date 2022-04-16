// DOCUMENTATIONS
// PLEASE READ BEFORE USAGE
//   https://lokijs-forge.github.io/LokiDB/api/classes/collection.html
//   https://github.com/techfort/LokiJS/tree/master/examples

const loki = require('lokijs');
const uuid = require('uuid');
const bcrypt = require('bcrypt');
const saltRounds = 8;



const db = new loki('bedhunter');

console.log("------- CREATING LOKIDB! -------");
db.addCollection('users').insert([
    {
        id: uuid.v4(),
        email: "bogialmasi@gmail.com",
        password: "mypass", // hashPW needed
        name: "Almási Bogi",
        birthdate: "2000-04-24",
        phone: '-',
    }
]);

var adminHashPassword = bcrypt.genSalt(saltRounds, function (err, salt) {
    return bcrypt.hash("admin_vagyok", salt)
})

db.addCollection('admin').insert([
    {
        id: uuid.v4(),
        email: 'admin@admin.hu',
        password: adminHashPassword,
        name: 'ADMIN',
        birthdate: '2022-02-22',
        phone: '-'
    }
])

db.addCollection('reservations');

db.addCollection('categories').insert([
    { id: 1, category: 'hotel' },
    { id: 2, category: 'motel' },
    { id: 3, category: 'panzio' },
    { id: 4, category: 'diakszallo' },
    { id: 5, category: 'rbnb' },
    { id: 6, category: 'camping' },
    { id: 7, category: 'hostel' },
    { id: 8, category: 'ifjusagi szallo' }])

db.addCollection('hotels').insert([
    {
        id: uuid.v4(),
        name: 'Hotel Dzsungel',
        address: '4431 Nyíregyháza, Blaha Lujza sétány 41',
        contact_phone: '+36 (42) 479 710',
        contact_email: 'szallas@hoteldzsungel.hu',
        category_id: 1
    },
    {
        id: uuid.v4(),
        name: 'Hotel Pangea',
        address: '4431 Nyíregyháza, Blaha Lujza sétány 15',
        contact_phone: '+36 42 200 551',
        contact_email: 'info@pangeahotel.hu',
        category_id: 1
    },
    {
        id: uuid.v4(),
        name: 'Európa Hotel és Étterem',
        address: '4400 Nyíregyháza, Hunyadi u. 2.',
        contact_phone: '+36 42 508 670',
        contact_email: 'info@europahotel.hu',
        category_id: 1
    },
    {
        id: uuid.v4(),
        name: 'Váci panzió',
        address: '4400 Nyíregyháza Váci Mihály út 16.',
        contact_phone: '(+36) 42/727-301',
        contact_email: 'vacipanzio@gmail.com',
        category_id: 3
    },
]);

db.addCollection('rooms').insert([
    {
        id: uuid.v4(),
        hotel_id: 1,
        room_number: 20,
        beds_number: 2,
        date_start: "2022-04-15", //format shuold be considered here
        date_end: "2022-04-17", //format shuold be considered here
        price: 12500
    },
    {
        id: uuid.v4(),
        hotel_id: 1,
        room_number: 51,
        beds_number: 4,
        date_start: "2022-04-22", //format shuold be considered here
        date_end: "2022-04-24", //format shuold be considered here
        price: 35000
    },
    {
        id: uuid.v4(),
        hotel_id: 3,
        room_number: 5,
        beds_number: 2,
        date_start: "2022-04-23", //format shuold be considered here
        date_end: "2022-04-24", //format shuold be considered here
        price: 22500
    },
]);


db.saveDatabase();

module.exports = db;