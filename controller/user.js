/*
 * @Author: Aaron
 * @Date: 2019-11-06 23:12:00
 * @LastEditors: Aaron
 * @LastEditTime: 2019-11-19 23:36:08
 * @Description: file content
 */
const Base = require('./base')
const pwdSecret = require('../utils/secret').pwdSecret
const { avatar } = require('../config/').user

module.exports = app => class extends Base {
    constructor(ctx) {
        super(app, ctx, 'user')
    }

    // 验证参数及用户
    validation(data, isLogin) {
        const { username, password, code, ticket, randstr, name } = data
        return new Promise(async (resolve, reject) => {
            try {
                if (!ticket || !randstr) throw new Error('滑动验证失败')
                if (!username) throw new Error('账号不能为空')
                if (!name) throw new Error('用户名称不能为空')
                if (!password) throw new Error('密码不能为空')
                if (!isLogin) {
                    if (!code) throw new Error('验证码不能为空')
                    const result = await this.findOne({username})
                    if (result) throw new Error('该账号已存在')
                }
                resolve()
            } catch (error) {
                reject(error)
            }
        })
    }
    // 注册步骤
    async register(data) {
        const {ticket, randstr, username, password, name} = data

        await this.validation(data)
        await this.ctx.service.security.tenVerify(ticket, randstr)
        this.create({
            username,
            password: pwdSecret(password),
            name,
            avatar
        })

        const token = this.ctx.service.security.getToken({username})
        
        return {
            token,
            username
        }
    }
    // github 授权登陆
    async github(token) {
        const accessToken = await this.ctx.service.oAuth.getAccessToken(token, 'github')
        const userInfo = await this.ctx.service.oAuth.getUserInfo(accessToken, 'github')

        return userInfo
    }
    // 验证是否需要绑定账号
    async isBind(user) {
        console.log('user', user)
        try {
            return !!await this.findOne({
                [user.source]: user.id
            })
        } catch (error) {
            throw new Error('服务器错误，请稍后再试')
        }
    }
}