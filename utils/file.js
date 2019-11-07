/*
 * @Author: Aaron
 * @Date: 2019-11-06 23:58:53
 * @LastEditors: Aaron
 * @LastEditTime: 2019-11-07 00:01:00
 * @Description: file content
 */
// 文件名去除文件后缀
exports.getFileName = filename => filename.substring(0, filename.indexOf('.'));