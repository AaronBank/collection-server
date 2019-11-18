/*
 * @Author: Aaron
 * @Date: 2019-11-06 23:45:18
 * @LastEditors: Aaron
 * @LastEditTime: 2019-11-19 01:25:03
 * @Description: file content
 */
const session = require('koa-session')
const md5Secret = require('../utils/secret').secret

const CONFIG = {
    key: 'koa:sess',
    maxAge: 604800000,
    overwrite: true, /** (boolean) can overwrite or not (default true)    没有效果，默认 */
    httpOnly: true, /**  true表示只有服务器端可以获取cookie */
    signed: true, /** 默认 签名 */
    rolling: true, /** 在每次请求时强行设置 cookie，这将重置 cookie 过期时间（默认：false） 【需要修改】 */
    renew: false, /** (boolean) renew session when session is nearly expired      【需要修改】*/
};

module.exports = app => {
    app.keys = [md5Secret];
    app.use(session(CONFIG, app))
}
