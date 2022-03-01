// https://www.section.io/engineering-education/how-to-setup-nodejs-express-for-react/ <--- innen nézem - bogi

const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

app.listen(port, () => console.log('listening on port ' + port));

app.get('express_backend', (req, res) => {
    res.send({express: 'connected to react'})
})

app.get('/', function (req, res) {
    const html = path.join(__dirname, 'view/index.html')
    res.sendFile(html)
})

app.get('/style', function (req, res) {
    res.sendFile() // style.css helye kell ide
})

app.get('*', function (req, res) {
    res.redirect('/');
})