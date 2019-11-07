/*
 * @Author: Aaron
 * @Date: 2019-11-06 23:45:18
 * @LastEditors: Aaron
 * @LastEditTime: 2019-11-07 16:49:07
 * @Description: file content
 */
const fs = require('fs')
const path = require('path')
const { getFileName } = require('../utils/file')

module.exports = async app => {
    const dir = path.resolve(__dirname, '../model')
    const dirs = fs.readdirSync(dir)
    app.model = {}

    dirs.forEach(filename => {
        if (filename === 'base.js') return
        const filePath = path.resolve(dir, filename)

        try {
            const Model = require(filePath)
            const key = getFileName(filename)

            app.model[key] = Model(app)
        } catch (error) {
            console.error(`${filename}文件(数据层)必须默认导出一个模型`, error)
        }
    })

    app.use(async (ctx, next) => {
        ctx.model = app.model
        await next()
    })
}