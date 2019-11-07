/*
 * @Author: Aaron
 * @Date: 2019-11-06 23:43:22
 * @LastEditors: Aaron
 * @LastEditTime: 2019-11-07 16:49:30
 * @Description: file content
 */
const fs = require('fs')

function fileDisplay(app){
    const dirs = fs.readdirSync(__dirname)

    dirs.forEach(async filename => {
        if (filename === 'index.js') return

        try {
            const middleware = require(`./${filename}`)

            await middleware(app)
        } catch (error) {
            console.error(`${filename}文件(中间件)必须默认导出一个函数`, error)
        }
    })
}


module.exports = { ready: fileDisplay }