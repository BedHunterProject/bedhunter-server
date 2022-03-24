const uuid = require('uuid');
const express = require('express');


module.exports.addRoutes = function(app, database, myModel){
    app = express();
    const objectRepo = {
        myModel,
        database,
        uuid
    }
    console.log('------ Routing is running')
    console.log("app is: " + app);
    
    const homepage = require('../middleware/homepage.js');
    const contact = require('../middleware/contact');
    const promotions = require('../middleware/promotions');
    const rooms = require('../middleware/rooms');
    const oneRoom = require('../middleware/oneroom');
    const searching = require('../middleware/search');
    const newRoom = require('../middleware/newroom');
    const deleteRoom = require('../middleware/deleteroom');
    const errorMessage = require('../middleware/errorMessage');

<<<<<<< HEAD
app.get('/', homepage(objectRepo), renderMW(objectRepo, 'index'))
app.get('/contact', contact(objectRepo))
app.get('/promotions', promotions(objectRepo))
app.get('/rooms', rooms(objectRepo))
app.get('/rooms/:id', oneRoom(objectRepo))
app.put('/search', searching(objectRepo)) // put vagy post
app.put('/newroom', newRoom(objectRepo))
app.delete('/rooms/:id', oneRoom(objectRepo), deleteRoom(objectRepo))
/*
 * POST PATCH DELETE KELL MIDDLEWARE-BE!!!!
 */
app.get('/*', errorPage(objectRepo))

const homepage = require('../middleware/homepage');
const contact = require('../middleware/contact');
const promotions = require('../middleware/promotions');
const rooms = require('../middleware/rooms');
const oneRoom = require('../middleware/getroom');
const searching = require('../middleware/search');
const newRoom = require('../middleware/newroom');
const deleteRoom = require('../middleware/deleteroom');
const errorPage = require('../middleware/error')
}

module.exports = addRoutes;
=======
    app.get('/my', function (req, res) {
        console.log("HOMEPAGE CALLED");
        //const html = path.join()
        console.log("response object is: " + res);
        res.send("sdfasdasdasda");
        console.log(html);
    });
    /*app.get('/contact', contact(objectRepo))
    app.get('/promotions', promotions(objectRepo))
    app.get('/rooms', rooms(objectRepo))
    app.get('/rooms/:id', oneRoom(objectRepo))
    app.post('/search', searching(objectRepo))
    app.post('/newroom', newRoom(objectRepo))
    app.delete('/rooms/:id', oneRoom, deleteRoom(objectRepo))*/

    

    /* POST PATCH DELETE KELL MIDDLEWARE-BE!!!!*/
    
    //app.get('/*', errorPage(objectRepo))   
}

//module.exports = addRoutes();

>>>>>>> 28cbc3fbb2e9d08ce03c7f3fe7be06a41d1e0212

/*

app.get('/contact', function (req, res) {
    const html = path.join('C:/Users/20g_almasib/bedhunter/bedhunter-ui/bedhunter-ui/src/pages/Contact.js')
    res.sendFile(html)
})

app.get('/promotions', function (req, res) {
    const html = path.join('C:/Users/20g_almasib/bedhunter/bedhunter-ui/bedhunter-ui/src/pages/Promotions.js')
    res.sendFile(html)
})

app.get('/rooms/', function (req, res) {
    const html = path.join('C:/Users/20g_almasib/bedhunter/bedhunter-ui/bedhunter-ui/src/pages/Rooms.js')
    res.sendFile(html)
})

app.get('/singleroom', function (req, res) {
    const html = path.join('C:/Users/20g_almasib/bedhunter/bedhunter-ui/bedhunter-ui/src/pages/SingleRoom.js')
    res.sendFile(html)
}) // ez még nem működik


app.get('/style', function (req, res) {
    res.sendFile() // style.css helye kell ide
})

app.get('*', function (req, res) {
    const html = path.join('C:/Users/20g_almasib/bedhunter/bedhunter-ui/bedhunter-ui/src/pages/Error.js')
    res.sendFile(html)
})*/

