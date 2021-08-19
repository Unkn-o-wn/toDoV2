const key = require('./key/index.js');
const path = require('path');
const express = require('express');
const app = express();
const ejs = require('ejs');
const sequelize = require('./utils/DB.js');

const indexRouter = require('./router/index.js');
const homeRouter = require('./router/home.js');

app.engine('ejs', require('ejs-locals'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(express.json());

app.use('/api/', indexRouter);
app.use('/', homeRouter);


async function start() {
    try{
        await sequelize.sync();
        //await sequelize.();
        console.log('Connection has been established successfully.');
        app.listen(key.PORT);
    }catch (e) {
        console.error(e);
    }
}

start()



