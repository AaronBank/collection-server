/*
 * @Author: Aaron
 * @Date: 2019-11-05 12:09:12
 * @LastEditors: Aaron
 * @LastEditTime: 2019-11-07 18:31:06
 * @Description: file content
 */
const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const helmet = require("koa-helmet");
const plugin = require('./plugin/')
const middleware = require('./middleware/')

const index = require('./routes/index')
const users = require('./routes/users')

plugin.ready(app)

// error handler
onerror(app)
// helmet
app.use(helmet());
// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

middleware.ready(app)

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
