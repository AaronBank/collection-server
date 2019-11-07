/*
 * @Author: Aaron
 * @Date: 2019-11-06 23:45:18
 * @LastEditors: Aaron
 * @LastEditTime: 2019-11-07 17:34:00
 * @Description: file content
 */
const fs = require('fs')
const path = require('path')
const { getFileName } = require('../utils/file')

module.exports = async app => {
    const dir = path.resolve(__dirname, '../service')
    const dirs = fs.readdirSync(dir)
    const service = {}

    dirs.forEach(filename => {
        if (filename === 'base.js') return
        const filePath = path.resolve(dir, filename)

        try {
            const Service = require(filePath)
            const key = getFileName(filename)

            service[key] = Service
        } catch (error) {
            console.error(`${filename}文件(业务层)必须默认导出一个类`, error)
        }
    })


    app.use(async (ctx, next) => {
        ctx.service = {} 
        Object.keys(service).forEach(key => {
            const Service = service[key](app)
            ctx.service[key] = new Service(ctx)
        })
        await next()
    })
}