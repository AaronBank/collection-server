/*
 * @Author: Aaron
 * @Date: 2019-11-06 23:45:18
 * @LastEditors: Aaron
 * @LastEditTime: 2019-11-07 18:33:53
 * @Description: file content
 */
const helmet = require("koa-helmet")

module.exports = app => {
    app.use(helmet())
}