/*
 * @Author: Aaron
 * @Date: 2019-11-06 23:12:07
 * @LastEditors: Aaron
 * @LastEditTime: 2019-11-20 00:33:01
 * @Description: file content
 */
const nodemailer = require('nodemailer')
const { host, port, origin, password } = require('../config/').email
console.log(host, port, origin, password)
const transporter = nodemailer.createTransport({
    host,
    port,
    secureConnetion: true,
    auth: {
      user: origin,
      pass: password
    }
})

console.log('邮箱这块', transporter)
 
module.exports = app => class {
    async send(options) {
        try {
            await transporter.sendMail({
                ...options,
                from: origin,
            })
        } catch (error) {
            console.error('邮件发送失败：', error)
            throw new Error('邮件发送失败，请稍后再试')
        }
    }
}
