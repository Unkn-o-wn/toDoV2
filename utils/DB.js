const Sequelize = require('sequelize');
const key = require('../key/index.js');
const sequelize = new Sequelize(key.DB_NAME, key.ADMIN_NAME, key.PASSWORD_A, {
    host: 'localhost',
    dialect: 'mysql'
});



    module.exports = sequelize