/*
 * @Author: Aaron
 * @Date: 2019-11-06 23:45:38
 * @LastEditors: Aaron
 * @LastEditTime: 2019-11-06 23:46:50
 * @Description: file content
 */
const errFactory = (errmsg, status) => ({
    status: status || 599,
    errmsg,
    timestamp: new Date().getTime(),
    version: '1.0.0',
    data: {}
})

module.exports = app => {
    app.use(async (ctx, next) => {
        ctx.success = data => {
          ctx.body = {
            status: 0,
            errmsg: 'success',
            timestamp: new Date().getTime(),
            version: '1.0.0',
            data,
          }
        }
        
        ctx.fail = (code = 500, errmsg = '全部失败') => {
          ctx.body = errFactory(errmsg, code)
        }

        ctx.paramFail = (errmsg = '参数错误') => {
          ctx.body = errFactory(errmsg, 505)
        }
      
        await next()
    })
}