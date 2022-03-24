module.exports = (objRep) => {
    console.log('GETROOM called');

    const {myModel} = objRep;
    return (req, res, next) => {
        
        const oneRoom = myModel.findOne({id: req.params.tid}) // a kérés params objektje
        if( !oneRoom ){
            return res.status(404).json({Error: 'Missing action'})
        }
        res.locals.room = oneRoom; // globális változó amibe minden belekerülhet
        console.log('GETROOM finished');
        return next(); // az utolsó dolgot mindig return-el hívjuk meg, ha return-el visszaküldjük akkor befejeztük a response-t
    }
}