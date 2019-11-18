/*
 * @Author: Aaron
 * @Date: 2019-11-06 23:12:00
 * @LastEditors: Aaron
 * @LastEditTime: 2019-11-19 02:09:13
 * @Description: file content
 */
const Base = require('./base')
const pwdSecret = require('../utils/secret').pwdSecret

module.exports = app => class extends Base {
    constructor(ctx) {
        super(app, ctx, 'user')
    }

    // 验证参数及用户
    validation(data, isLogin) {
        const { username, password, code, ticket, randstr } = data
        return new Promise(async (resolve, reject) => {
            try {
                if (!ticket || !randstr) throw new Error('滑动验证失败')
                if (!username) throw new Error('用户名不能为空')
                if (!password) throw new Error('密码不能为空')
                if (!isLogin) {
                    if (!code) throw new Error('验证码不能为空')
                    const result = await this.find({where: {username}})
                    if (result.length) throw new Error('该用户名已存在')
                }
                resolve()
            } catch (error) {
                reject(error)
            }
        })
    }
    // 注册步骤
    async register(data) {
        const {ticket, randstr, username, password} = data

        await this.validation(data)
        await this.ctx.service.security.tenVerify(ticket, randstr)
        this.create({
            username,
            password: pwdSecret(password)
        })

        const token = this.ctx.service.security.getToken({username})
        
        return {
            token,
            username
        }
    }
}