/*
 * @Author: Aaron
 * @Date: 2019-11-06 23:43:22
 * @LastEditors: Aaron
 * @LastEditTime: 2019-11-07 00:46:44
 * @Description: file content
 */
const fs = require('fs')
const { getFileName } = require('../utils/file')

function fileDisplay(app){
    const dirs = fs.readdirSync(__dirname)

    dirs.forEach(filename => {
        if (filename === 'index.js') return

        try {
            const plugin = require(`./${filename}`)
            const key = getFileName(filename)

            app[key] = plugin
        } catch (error) {
            console.error(`${filename}文件(插件)必须存在默认`, error)
        }
    })
}


module.exports = { ready: fileDisplay }