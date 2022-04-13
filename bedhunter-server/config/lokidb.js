const loki = require('lokijs');
const uuid = require('uuid');
const bcrypt = require('bcrypt');
const { hash } = require('bcryptjs');
const saltRounds = 8;

// ---------- admin jelszó hash, így kell majd a töbit is
bcrypt.genSalt(saltRounds, function(err, salt){
    bcrypt.hash("admin_vagyok", salt, function(err, hash) {
        console.log(hash)
    })
})

const db = new loki('bedhunter');
db.addCollection('users').insert([
    {id : uuid.v4(),
    email : 'admin@admin.hu',
    password : hash,
    name: 'ADMIN',
    birthdate : '2022-02-22',
    phone : '-'
}
])

db.addCollection('categories').insert([
    {id : 1, category: 'hotel'},
    {id : 2, category : 'motel'},
    {id : 3, category : 'panzio'},
    {id : 4, category : 'diakszallo'},
    {id : 5, category : 'rbnb'},
    {id : 6, category : 'camping'},
    {id : 7, category : 'hostel'},
    {id : 8, category : 'ifjusagi szallo'}])

db.addCollection('hotels').insert([
    {id : uuid.v4(),
    name : 'Hotel Dzsungel',
    address : '4431 Nyíregyháza, Blaha Lujza sétány 41',
    contact_phone : '+36 (42) 479 710',
    contact_email : 'szallas@hoteldzsungel.hu',
    category_id: 1},
    {},
    {}
])

db.addCollection('searches');

db.saveDatabase();