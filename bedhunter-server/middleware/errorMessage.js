require('path');
require('express');

/*
module.exports.homepage = (req, res, next) => {
    const html = path.join('C:/Users/20g_almasib/bedhunter/bedhunter-ui/bedhunter-ui/src/pages/Home.js')
    res.sendFile(html)
}
 function (req, res, next) 
*/

module.exports.errorMessage = function(req, res, next) {
    app.get('/*', (req, res, next) => {
        console.log("ERROR PAGE CALLED");
    //const html = path.join()
    console.log("response object is: " + res);
    res.sendFile("sdfasdasdasda");
    console.log(html);
    })
    
}