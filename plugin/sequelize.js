/*
 * @Author: Aaron
 * @Date: 2019-11-06 20:28:02
 * @LastEditors: Aaron
 * @LastEditTime: 2019-11-19 23:12:33
 * @Description: file content
 */
const Sequelize = require('sequelize');
const config = require('../config/index').mysql;

const sequelize = new Sequelize({
    dialect: 'mysql',
    database: config.database,
    host: config.host,
    port: config.port,
    username: config.username,
    password: config.password,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    define: {
        timestamps: false
    },
    timezone: '+08:00'
});

sequelize.sync()

module.exports = sequelize
