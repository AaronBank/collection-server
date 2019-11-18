/*
 * @Author: Aaron
 * @Date: 2019-11-06 23:12:07
 * @LastEditors: Aaron
 * @LastEditTime: 2019-11-19 01:51:30
 * @Description: file content
 */
const nodemailer = require('nodemailer')
const { host, port, origin, password } = require('../config/').email
const transporter = nodemailer.createTransport({
    host,
    port,
    secureConnetion: true,
    auth: {
      user: origin,
      pass: password,
    },
})
 
module.exports = app => class {
    async send(options) {
        try {
            await transporter.sendMail({
                ...options,
                from: origin,
            })
        } catch (error) {
            throw new Error('邮件发送失败，请稍后再试')
        }
    }
}
