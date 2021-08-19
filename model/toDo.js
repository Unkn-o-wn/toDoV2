const Sequelize = require('sequelize');
const sequelize = require('../utils/DB.js');

    const todo = sequelize.define('ToDoList', {
        id:{
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            type: Sequelize.INTEGER
        },
        done:{
            type:Sequelize.BOOLEAN,
            allowNull: false
        },
        title:{
            type:Sequelize.STRING,
            allowNull: false
        }
    })

todo.getToDo = async function (cb) {
   try {
       const allToDo = await this.findAll();
       await cb(allToDo);
      /* await this.findAll().then(data=>{cb(data)}).catch(e=>console.error(e));*/



   }catch (e) {
       console.error(e)
   }
}

todo.createNewToDo = async function (data,  cb) {
     data.done = false;
     await this.create(data)
         .then((data)=>{
        cb(data);
     }).catch(err=>{
         cb(err);
         })



}

todo.editSomeToDo = async function (idE, title,  cb) {
        try {
            const edit = await this.findByPk(idE);
            edit.title = title;
            await edit.save();
            cb(edit);
        }catch (e) {
            console.error()
        }
}

todo.completeToDo = async function (idE, cb) {
    try {
        const complete = await this.findByPk(idE);
        complete.done = true;
        await complete.save();
        cb(complete);
    }catch (e) {
        console.error()
    }
}

todo.deleteSomeToDo = async function (idR, cb){
      try {
          const deleteItem = await this.destroy({
              where: {
                  id: idR
              }
          })
          cb(deleteItem);
      }  catch (e) {
          console.error(e)
      }
}

module.exports = todo