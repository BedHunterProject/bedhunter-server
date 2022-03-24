// https://www.section.io/engineering-education/how-to-setup-nodejs-express-for-react/ <--- innen nézem - bogi
// https://dev.to/nburgess/creating-a-react-app-with-react-router-and-an-express-backend-33l3
// axios, jwt token
// https://www.section.io/engineering-education/how-to-build-authentication-api-with-jwt-token-in-nodejs/

/**
 * The request object is the object received from the client side and contains different kinds of information to be accessed and processed.
 */

const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const { v4: uuidv4 } = require('uuid');
const bodyParser = require('body-parser');
const path = require('path');
const homepage = require('./middleware/homepage')

app.use(bodyParser.json());

const addRoutes = require('./routing/routing');
addRoutes.addRoutes();

/*(req, res, next) => {
  res.status(200).send(`'Hello World!' Hello node! id: ${uuidv4()}`);
  res.send(middleware.homepage());
});  
*/

const { initDB } = require('./config/db')


app.use(express.static('public'));


/*initDB(err, (db, myModel) => {
  if(err) {return console.err(`DB error: ${err}`)} 
  //addRoutes(app, db, myModel);
  app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });
});*/


app.get('express_backend', (req, res, next) => {
    res.send({express: 'connected to react'})
})
console.log(`1 ---- Homepage is: ${homepage}`)

app.get('/', (req, res, next) => {
  console.log('Homepage called')
  app.use(homepage)
})

console.log(`2 ---- Homepage is: ${homepage}`)
//app.get('/', homepage())



/*MIDDLEWARE
app.use('/', function(req, res, next){
    
  var options = {
      
  };
   
  var fileName = 'C:/Users/20g_almasib/bedhunter/bedhunter-ui/bedhunter-ui/src/pages/Home.js';
  res.sendFile(fileName, options, function (err) {
      if (err) {
          next(err);
      } else {
          console.log('Sent:', fileName);
          next();
      }
  });
});
*/

app.listen(port, () => console.log(`Express server currently running on port ${port}`));