/*
 * @Author: Aaron
 * @Date: 2019-11-06 21:22:38
 * @LastEditors: Aaron
 * @LastEditTime: 2019-11-07 00:47:40
 * @Description: file content
 */
const Sequelize = require('sequelize');

module.exports = app => {
    return app.sequelize.define('user', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: true,
            autoIncrement: true,
        },
        username: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
        }
    });
}