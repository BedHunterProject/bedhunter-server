require('path');
require('express');

module.exports.homepage = function (req, res, next) {
    console.log("HOMEPAGE CALLED");
    //const html = path.join()
    console.log("response object is: " + res);
    res.sendFile("sdfasdasdasda");
    console.log(html);
}