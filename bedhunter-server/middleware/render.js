module.exports = (objRep, ejsTemplate) => {
    console.log('RENDER called');

    return (req, res, next) => {
        console.log('RENDER finished');
        return res.render(ejsTemplate,  res.locals );
    }
}


/** RENDER?
 * res.locals végig él, érkezik, kell next
 * globális változó? objRepo-ba bemegy (legegyszerűbb), 
 * VAGY app.locals (gyűjtőhely) keres, kell next
 * VAGY session
 * 
 * res.redirect('lista', req, res) új vonalra lép, nem lesz az előző res, req, next -- undefined lesz 
 * 
 * renderMW megjelenít dolgokat
 * ha a szerver kommunikál a klienssel akkor kell
 * 
 * body-parser:kap egy kérést amiből JSONt csinál, aztán JSONt ad vissza
 * https://stackoverflow.com/questions/50833719/sending-a-string-from-node-js-to-a-component-react-js
*/
