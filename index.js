// https://www.section.io/engineering-education/how-to-setup-nodejs-express-for-react/ <--- innen nézem - bogi
// https://dev.to/nburgess/creating-a-react-app-with-react-router-and-an-express-backend-33l3

const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

app.listen(port, () => console.log('listening on port ' + port));

app.get('express_backend', (req, res) => {
    res.send({express: 'connected to react'})
})

app.get('/', function (req, res) {
    const html = path.join('../client/bedhunter/src/pages/Home.js')
    res.sendFile(html)
})

app.get('/contact', function (req, res) {
    const html = path.join('../client/bedhunter/src/pages/Contact.js')
    res.sendFile(html)
})

app.get('/promotions', function (req, res) {
    const html = path.join('../client/bedhunter/src/pages/Promotions.js')
    res.sendFile(html)
})

app.get('/rooms/', function (req, res) {
    const html = path.join('../client/bedhunter/src/pages/Rooms.js')
    res.sendFile(html)
})

app.get('/singleroom', function (req, res) {
    const html = path.join('../client/bedhunter/src/pages/SingleRoom.js')
    res.sendFile(html)
}) // ez még nem működik

/*
app.get('/style', function (req, res) {
    res.sendFile() // style.css helye kell ide
})
*/

app.get('*', function (req, res) {
    const html = path.join('../client/bedhunter/src/pages/Error.js')
    res.sendFile(html)
})