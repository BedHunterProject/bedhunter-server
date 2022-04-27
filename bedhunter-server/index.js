// https://www.section.io/engineering-education/how-to-setup-nodejs-express-for-react/ <--- innen nézem - bogi
// https://dev.to/nburgess/creating-a-react-app-with-react-router-and-an-express-backend-33l3
// axios, jwt token
// https://www.section.io/engineering-education/how-to-build-authentication-api-with-jwt-token-in-nodejs/

/**
 * The request object is the object received from the client side and contains different kinds of information to be accessed and processed.
 */

// using block
const express = require('express');
const app = express();

const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const config = require('./config/serviceConfig');

require('./config/lokidb')
require('./routing/routing');
require('uuid');
require('path');
require('lokijs');

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

// https://www.codegrepper.com/code-examples/javascript/access-control-allow-origin+nodeJs
// https://web.dev/cross-origin-resource-sharing/

app.use(logger);
app.set('view engine', 'ejs');
app.use(express.static(__dirname + './public'));

// enable cors for all resources
const corsOptions = {
  origin: true,
  methods: ['GET, POST'],
  credentials: true
};

app.use(cors(corsOptions))

//session includes
app.use(session({
  secret: 'abcdefghijklmnopqrstuvxyz', // sign the session id cookie
  resave: true, // for every request we create a new Session
  saveUninitialized: true, // unmodified sessions won't be saved
  cookie: {
    maxAge: config.cookieMaxAgeInSeconds * 1000
  },
  rolling: true
}));

//middleware
const loginManagement = require('./middleware/loginManagement');
app.use(loginManagement);

//Routings
app.get('/', (req, res) => {
  console.log('Homepage called');
  res.render('index');
})

const roomsRouter = require('./routing/roomsRouter');
app.use('/rooms', roomsRouter);

const hotelsRouter = require('./routing/hotelsRouter');
app.use('/hotels', hotelsRouter);

const usersRouter = require('./routing/usersRouter');
app.use('/users', usersRouter);

const loginRouter = require('./routing/loginRouter');
app.use('/login', loginRouter);

const registerRouter = require('./routing/registerRouter');
app.use('/register', registerRouter);

const logoutRouter = require('./routing/logoutRouter');
app.use('/logout', logoutRouter)

const reservationRouter = require('./routing/reservationRouter');
app.use('/reservation', reservationRouter)

/* HOW TO USE
registration and login needed before accessing any page
users that aren't admins cannot access the /users route
TODO - find a solution for forbiddenRoutes, not let users do anything but GET methods, 
***EXCEPT*** POST in /login, /register, /reservations, and DELETE in /reservations
*/

function logger(req, res, next) {
  console.log(req.originalUrl);
  next();
}

const port = process.env.PORT || config.port;
app.listen(port, () => console.log(`Express server currently running on port ${config.port}`));