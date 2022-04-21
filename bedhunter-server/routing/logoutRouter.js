const express = require('express')
const router = express.Router()
const logger = require('node-color-log'); //https://github.com/tigercosmos/node-color-log
const config = require('../config/serviceConfig.json')

require('express-session');

// logging out, used in loginRouter
router.post('/', (req, res) => {
    if (config.enableSessionDataLogging) logger.color("yellow").log("Destroying session data.")
    req.session.destroy((err) => {
      if (err) {
        res.status(400).send('Unable to log out')}
    });

    console.log(req.session);
    return res.status(204).end();
})

module.exports = router;