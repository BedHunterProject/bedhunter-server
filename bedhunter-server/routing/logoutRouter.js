const express = require('express')
const router = express.Router()
const logger = require('node-color-log'); //https://github.com/tigercosmos/node-color-log
const config = require('../config/serviceConfig.json')

require('express-session');


router.post('/', (req, res) => {
    if (config.enableSessionDataLogging) logger.color("yellow").log("Destroying session data.")
    req.session.destroy();

    console.log(req.session);
    res.status(204);
})

module.exports = router;