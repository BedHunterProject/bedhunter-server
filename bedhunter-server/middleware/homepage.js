const path = require('path');
const express = require('express');
const app = express();

/*
module.exports.homepage = (req, res, next) => {
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

    app.use('/', () => {

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