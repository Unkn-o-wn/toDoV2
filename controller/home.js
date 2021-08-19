module.exports.getHome = function (req, res){

 res.render('index.ejs',{
     title: 'To Do List'
 })

}