/*
 * @Author: Aaron
 * @Date: 2019-11-06 21:22:38
 * @LastEditors: Aaron
 * @LastEditTime: 2019-11-19 23:36:54
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
        },
        avatar: {
            type: Sequelize.STRING,
            allowNull: false
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        githubId: {
            type: Sequelize.STRING,
            allowNull: true
        },
        wxId: {
            type: Sequelize.STRING,
            allowNull: true
        },
        wbId: {
            type: Sequelize.STRING,
            allowNull: true
        },
        qqId: {
            type: Sequelize.STRING,
            allowNull: true
        }
    });
}