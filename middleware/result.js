/*
 * @Author: Aaron
 * @Date: 2019-11-06 23:45:38
 * @LastEditors: Aaron
 * @LastEditTime: 2019-11-19 01:03:20
 * @Description: file content
 */
module.exports = app => {
    app.use(async (ctx, next) => {
        ctx.success = data => {
          ctx.body = {
            status: 0,
            message: '',
            timestamp: new Date().getTime(),
            version: '1.0.0',
            data,
          }
        }
        
        ctx.fail = (message = '全部失败', status = 599) => {
          ctx.body = {
            status: status,
            message,
            timestamp: new Date().getTime(),
            version: '1.0.0',
            data: {}
          }
        }
      
        await next()
    })
}