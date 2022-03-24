module.exports = (objRep) => {
    const {
        myModel,
        db,
        uuid
    } = objRep;
    return (req, res, next) => {
        if (typeof req.body.room === 'undefined') {
            return res.status(404).json({
                Error: 'Missing action'
            });
        }
        const newroom = {
            id: uuid.v4(),
            room: req.body.room
        }

        myModel.insert(newroom);
        return db.saveDatabase(err => {
            if (err) {
                return next(err);
            }
            return res.json({
                id: newroom.id,
                room: newroom.room
            });

        })

    }
}