
const Sequelize = require("sequelize");

                                //'nome do banco', 'usuario','senha'
const connection = new Sequelize('blognode','root','jfgdij47',{
    host: 'localhost',
    dialect: 'mysql',
    port: '3307',
    timezone: "-03:00"
});

module.exports = connection;

