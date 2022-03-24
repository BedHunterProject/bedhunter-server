module.exports = (objRep) => {
    const {myModel} = objRep;
    /*
    console.log('----------------------------------------------------');
    console.log(objRep);
    console.log('----------------------------------------------------');
    console.log(myModel);
    */
    return (req,res, next) => {
        const allTodos = myModel.find();
        res.locals.todos = allTodos;
        //res.json(allTodos);
        return next();
    }
    
}
