module.exports = (req, res, next) => {

    // https://www.esparkinfo.com/blog/how-to-create-middleware-in-node-js-and-express-js.html

    const path = require('path');
    const express = require('express');
    const app = express();

    /*
    module.exports.homepage = (req, res, next) => {
    >>>>>>> 28cbc3fbb2e9d08ce03c7f3fe7be06a41d1e0212
        const html = path.join('C:/Users/20g_almasib/bedhunter/bedhunter-ui/bedhunter-ui/src/pages/Home.js')
        res.sendFile(html)
    }
    */

    module.exports.homepage = function (req, res, next) {
        console.log("HOMEPAGE CALLED");
        //const html = path.join()
        console.log("response object is: " + res);
        // res.sendFile("C:/Users/20g_almasib/bedhunter/bedhunter-ui/bedhunter-ui/src/pages/Home.js");
        // console.log(html);

        app.use('/', (req, res, next) => {

            var options = {};

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
    }
}