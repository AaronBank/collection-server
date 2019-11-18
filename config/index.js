/*
 * @Author: Aaron
 * @Date: 2019-11-05 20:02:13
 * @LastEditors: Aaron
 * @LastEditTime: 2019-11-19 01:49:58
 * @Description: file content
 */
const envConfig = require(`./${process.env.NODE_ENV}.config`)

const config = {
    env: process.env.NODE_ENV,
    protect: {
        secret: 'bookmarks@?11344&_+!%^*',
        expiresIn: '7d'
    },
    mysql: {
        database: 'favorites',
        ...envConfig.mysql
    },
    email: {
        origin: 'aaronmyemail@yeah.net',
        host: 'smtp.exmail.qq.com',
        port: 465,
        password: '123456'
    }
}

module.exports = config
