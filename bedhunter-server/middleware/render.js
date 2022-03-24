module.exports = (objRep, ejsTemplate) => {
    console.log('RENDER called');

    return (req, res, next) => {
        console.log('RENDER finished');
        return res.render(ejsTemplate,  res.locals );
    }
}