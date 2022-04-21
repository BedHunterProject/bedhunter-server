// unused

const uuid = require('uuid');
const express = require('express');
const session = require('express-session');
const router = express.Router();

module.exports.addRoutes = function(app, database, myModel){
    app = express();
    const objectRepo = {
        myModel,
        database,
        uuid
    }

    console.log("app is: " + app);

    router.get('/', (req, res)=>{
        const homepage_ = require('../bedhunter-ui/src/pages/Home');
        console.log('Homepage called');
        res.send(homepage_);
        res.render('index')
      })
      
      router.get('/login', (req, res)=>{
        console.log('Login page called');
        res.render('login')
      })
      

app.get('/*', errorMessage(objectRepo))
}
