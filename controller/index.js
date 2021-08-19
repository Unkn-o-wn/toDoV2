const modelToDo = require('../model/toDo.js');

module.exports.getToDo = function (req, res){

    modelToDo.getToDo((data)=>{
       res.send(200, data);
    })

}

module.exports.addNewToDo = function (req,res) {
        modelToDo.createNewToDo(req.body, (result)=>{
               res.send(201, {
                   id: result.id,
                   create: result.createdAt
               });
        })
}

module.exports.editSomeToDo = function (req,res) {
    modelToDo.editSomeToDo(req.params.id, req.body.title, (edit)=>{
        res.status(200).json(edit.updatedAt).end();
    })
}

module.exports.completeToDo = function (req,res) {
    modelToDo.completeToDo(req.params.id, (complete)=>{
        res.status(200).json(complete.updatedAt).end();
    })
}

module.exports.deleteSomeToDo = function (req,res) {
    modelToDo.deleteSomeToDo(req.params.id, ()=>{
        res.status(204).end();
    });
}

