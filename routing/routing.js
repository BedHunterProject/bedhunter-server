const uuid = require('uuid');
const express = require('express');


function addRoutes(app, database, myModel){
    app = express();
    const objectRepo = {
        myModel,
        database,
        uuid
    }
    
    console.log("app is: " + app);
    
    const homepage = require('../middleware/homepage.js');
    /*const contact = require('../middleware/contact');
    const promotions = require('../middleware/promotions');
    const rooms = require('../middleware/rooms');
    const oneRoom = require('../middleware/oneroom');
    const searching = require('../middleware/search');
    const newRoom = require('../middleware/newroom');
    const deleteRoom = require('../middleware/deleteroom');*/

    app.get('/my', function (req, res, next) {
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

module.exports = addRoutes();


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

