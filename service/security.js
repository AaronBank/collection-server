/*
 * @Author: Aaron
 * @Date: 2019-11-06 23:12:07
 * @LastEditors: Aaron
 * @LastEditTime: 2019-11-19 02:09:21
 * @Description: file content
 */
const jwt = require('jsonwebtoken')
const axios = require('axios')
const protect = require('../config/').protect
 
module.exports = app => class {
    getToken(payload) {
        return jwt.sign(payload, protect.secret, { expiresIn: protect.expiresIn })
    }

    tenVerify(ticket, randstr) {
        return new Promise(async (resolve, reject) => {
            try {
                const result = await axios.get('https://ssl.captcha.qq.com/ticket/verify', {
                    params: {
                        aid: '2057344292',
                        AppSecretKey: '0lQrAv8VW1PeMsKxJv619ww**',
                        Ticket: ticket,
                        Randstr: randstr,
                        UserIP: '120.244.230.44'
                    }
                })

                if (result.data.response !== '1') return reject(new Error('滑动验证失败'))

                resolve()
            } catch (error) {
                reject(new Error('滑动验证失败'))
            }
        })
    }
}