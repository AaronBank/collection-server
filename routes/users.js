/*
 * @Author: Aaron
 * @Date: 2019-11-05 12:09:12
 * @LastEditors: Aaron
 * @LastEditTime: 2019-11-20 00:51:31
 * @Description: file content
 */
const router = require('koa-router')()
const root = require('../config/').root
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

router.get('/email', async (ctx, next) => {
  const result = await ctx.service.email.send({
    to: '18301496816@163.com',
    subject: 'Collect注册验证码',
    text: 'Hi',
    html: `
      <h2>Hi 😈<h2>
      <blockquote>
        <h4>🤧您正在使用此邮箱注册或绑定<a href="${root}">Collect</a>站点账号，</h4>
        <h4>👉验证码为：${123456}</h4>
        <h4>👹若不是您本人所为，请忽略此邮件。</h4>
      </blockquote>
    `,
  })
})

// OAuth 对接github
router.get('/github', async (ctx, next) => {
  const requestToken = ctx.request.query.code
  const user = await ctx.controller.user.github(requestToken)
  const userInfo = {
    id: user.id,
    name: user.name,
    avatar: user.avatar_url,
    source: 'github'
  }
  // const isBind = await ctx.controller.user.isBind(userInfo)

  // console.log('isBind', isBind)

  return ctx.success(user)

  // if (isBind) return ctx.response.redirect(root)

  // ctx.session.bindInfo = userInfo

  // return next()
}, async ctx => {
  ctx.response.redirect(`${root}/binding`)
})

// OAuth 对接微信
router.get('/wx', async (ctx, next) => {
  console.log('ctx.session.userInfo', ctx.session.bindInfo)
  ctx.body = '对接微信登陆'
})

// OAuth 对接微博
router.get('/wb', async (ctx, next) => {
  ctx.body = '对接微博登陆'
})

// OAuth 对接qq
router.get('/qq', async (ctx, next) => {
  ctx.body = '对接QQ登陆'
})

// 获取绑定信息
router.get('/binding', async (ctx, next) => {
  const bindInfo = ctx.session.bindInfo
  ctx.success(bindInfo)
})

// 绑定用户
router.post('/binding', async (ctx, next) => {
  await ctx.controller.user.binding(ctx.session.bindInfo)
  ctx.session.bindInfo = null
  ctx.success('绑定成功')
})

module.exports = router
