/*
 * @Author: Aaron
 * @Date: 2019-11-06 23:45:18
 * @LastEditors: Aaron
 * @LastEditTime: 2019-11-07 17:33:20
 * @Description: file content
 */
const fs = require('fs')
const path = require('path')
const { getFileName } = require('../utils/file')

module.exports = async app => {
    const dir = path.resolve(__dirname, '../controller')
    const dirs = fs.readdirSync(dir)
    const controllers = {}

    dirs.forEach(filename => {
        if (filename === 'base.js') return
        const filePath = path.resolve(dir, filename)

        try {
            const Controller = require(filePath)
            const key = getFileName(filename)

            controllers[key] = Controller
        } catch (error) {
            console.error(`${filename}文件(控制层)必须默认导出一个类`, error)
        }
    })

    app.use(async (ctx, next) => {
        ctx.controller = {}
        Object.keys(controllers).forEach(key => {
            const Controller = controllers[key](app)
            ctx.controller[key] = new Controller(ctx)
        })

        await next()
    })
}