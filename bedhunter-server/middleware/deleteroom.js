module.exports= (objRep) => {
    const { myModel, db } = objRep;
    return (req, res, next) => {

        const deleteRoom = res.locals.todo;
        myModel.remove(deleteRoom);

        return db.saveDatabase(err => {
            if(err){
                throw err;
            }
            return res.json({
                status: 'DELETE',
                id: deleteRoom.id,
                todo: deleteRoom.todo
            });

        })
    }
}
