/*
 * @Author: Aaron
 * @Date: 2019-11-05 20:02:13
 * @LastEditors: Aaron
 * @LastEditTime: 2019-11-06 23:00:31
 * @Description: file content
 */
const envConfig = require(`./${process.env.NODE_ENV}.config`)

const config = {
    env: process.env.NODE_ENV,
    mysql: {
        database: 'favorites',
        ...envConfig.mysql
    }
}

module.exports = config
