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

const addRoutes = require('./routing/routing');
addRoutes.addRoutes();
addRoutes(app, null, null);

app.get('/', (req, res, next) => {
  res.status(200).send(`'Hello World!' Hello node! id: ${uuidv4()}`);
});  


const { initDB } = require('./services/db')


app.use(express.static('public'));


/*initDB(err, (db, myModel) => {
  if(err) {return console.err(`DB error: ${err}`)} 
  //addRoutes(app, db, myModel);
  app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });
});*/


app.get('express_backend', (req, res) => {
    res.send({express: 'connected to react'})
})

//MIDDLEWARE
app.use('/', function(req, res, next){
    
  var options = {
      
  };
   
  var fileName = 'C:/Users/Greg/Downloads/bedhunter-ui-master/bedhunter/src/pages/Home.js';
  res.sendFile(fileName, options, function (err) {
      if (err) {
          next(err);
      } else {
          console.log('Sent:', fileName);
          next();
      }
  });
});