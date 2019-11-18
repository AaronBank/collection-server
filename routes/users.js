/*
 * @Author: Aaron
 * @Date: 2019-11-05 12:09:12
 * @LastEditors: Aaron
 * @LastEditTime: 2019-11-19 02:11:15
 * @Description: file content
 */
const router = require('koa-router')()
router.prefix('/users')

router.post('/login', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/getToken', function (ctx, next) {
  const aaa = ctx.session.token
  ctx.body = aaa
})

router.post('/register', async (ctx, next) => {
  try {
    const result = await ctx.controller.user.register(ctx.request.body)
    ctx.session.token = result.token
    ctx.success(result)
  } catch (error) {
    ctx.fail(error.message)
  }
})

module.exports = router
