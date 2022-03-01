// https://www.section.io/engineering-education/how-to-setup-nodejs-express-for-react/ <--- innen nézem - bogi

const express = require('express');
const app = express();
const port = 5000;

app.listen(port, () => console.log('listening on port ' + port));

app.get('express_backend', (req, res) => {
    res.send({express: 'connected to react'})
})