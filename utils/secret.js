/*
 * @Author: Aaron
 * @Date: 2019-11-08 16:37:38
 * @LastEditors: Aaron
 * @LastEditTime: 2019-11-19 01:24:19
 * @Description: file content
 */
const md5 = require('js-md5')
const secret = 'bookmarks@?11344&_+!%^*'

exports.secret = md5(secret)
exports.pwdSecret = pwd => md5(secret + pwd)