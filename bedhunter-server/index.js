// https://www.section.io/engineering-education/how-to-setup-nodejs-express-for-react/ <--- innen nézem - bogi
// https://dev.to/nburgess/creating-a-react-app-with-react-router-and-an-express-backend-33l3
// axios, jwt token
// https://www.section.io/engineering-education/how-to-build-authentication-api-with-jwt-token-in-nodejs/

const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const { v4: uuidv4 } = require('uuid');
const bodyParser = require('body-parser');
const path = require('path');


app.use(bodyParser.json());

app.get('/', (req, res, next) => {
  res.status(200).send(`'Hello World!' Hello node! id: ${uuidv4()}`);
});  

//<<<<<<<< HEAD:bedhunter-server/index.js
// environment variable PORT, vagy 5000, ha azon nem fut semmi
//========
//>>>>>>>> 95030bfd77b4fb845232bdcf4e43024bc265a812:index.js

const { initDB } = require('./services/db')

const addRoutes = require('./routing/routing')

app.use(express.static('public'));

initDB(err, (db, myModel) => {
  if(err) {return console.err(`DB error: ${err}`)} 
  addRoutes(app, db, myModel);
  app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
/*
app.get('express_backend', (req, res) => {
    res.send({express: 'connected to react'})
})*/

