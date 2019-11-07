/*
 * @Author: Aaron
 * @Date: 2019-11-06 23:45:18
 * @LastEditors: Aaron
 * @LastEditTime: 2019-11-06 23:45:25
 * @Description: file content
 */
module.exports = app => {
    app.use(async (ctx, next) => {
        const start = new Date()
        await next()
        const ms = new Date() - start
        console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
    })
}