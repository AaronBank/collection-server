/*
 * @Author: Aaron
 * @Date: 2019-11-08 16:46:15
 * @LastEditors: Aaron
 * @LastEditTime: 2019-11-08 19:18:07
 * @Description: file content
 */
const jwtKoa  = require('koa-jwt')
const protect = require('../config/').protect

module.exports = app => {
    app.use(jwtKoa({ secret: protect.secret, passthrough: true, key: 'token' }).unless({
        path: [
            /^\/users\/login/,
            /^\/users\/register/
        ]
    }))
}