/*
 * @Author: Aaron
 * @Date: 2019-11-05 12:09:12
 * @LastEditors: Aaron
 * @LastEditTime: 2019-11-07 18:25:45
 * @Description: file content
 */
const router = require('koa-router')()
router.prefix('/users')

router.get('/login', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/register', async (ctx, next) => {
  // console.log('token1', ctx.controller)
  // const result = ctx.controller.user.register({
  //   username: '9090',
  //   password: 111
  // })
  // console.log('token', result)
  console.log(ctx.controller.user.register({
    username: '拉拉阿拉',
    password: '123123'
  }))
  ctx.success({
    username: '9090',
    password: 111
  })
})

module.exports = router
