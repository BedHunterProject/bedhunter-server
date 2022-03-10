// https://www.section.io/engineering-education/how-to-setup-nodejs-express-for-react/ <--- innen nézem - bogi
// https://dev.to/nburgess/creating-a-react-app-with-react-router-and-an-express-backend-33l3
// axios, jwt token
// https://www.section.io/engineering-education/how-to-build-authentication-api-with-jwt-token-in-nodejs/


const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
/*
<<<<<<<< HEAD:bedhunter-server/index.js
// environment variable PORT, vagy 5000, ha azon nem fut semmi
========
>>>>>>>> 95030bfd77b4fb845232bdcf4e43024bc265a812:index.js*/
const path = require('path');

app.listen(port, () => console.log('listening on port ' + port));

/*
app.get('express_backend', (req, res) => {
    res.send({express: 'connected to react'})
})

/*
app.get('/', function (req, res) {
    const html = path.join('C:/Users/20g_almasib/bedhunter/bedhunter-ui/bedhunter-ui/src/pages/Home.js')
    res.sendFile(html)
})

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

/*
app.get('/style', function (req, res) {
    res.sendFile() // style.css helye kell ide
})


app.get('*', function (req, res) {
    const html = path.join('C:/Users/20g_almasib/bedhunter/bedhunter-ui/bedhunter-ui/src/pages/Error.js')
    res.sendFile(html)
})*/