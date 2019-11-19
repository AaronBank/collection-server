/*
 * @Author: Aaron
 * @Date: 2019-11-05 20:02:13
 * @LastEditors: Aaron
 * @LastEditTime: 2019-11-20 00:36:06
 * @Description: file content
 */
const envConfig = require(`./${process.env.NODE_ENV}.config`)

const { mysql, user, root } = envConfig

const config = {
    env: process.env.NODE_ENV,
    protect: {
        secret: 'bookmarks@?11344&_+!%^*',
        expiresIn: '7d'
    },
    mysql: {
        database: 'favorites',
        ...mysql
    },
    email: {
        origin: 'aarongithub@yeah.net',
        host: 'smtp.yeah.net',
        port: 465,
        password: 'Shenweikang1024'
    },
    user: {
        avatar: 'https://hexo-shen.oss-cn-beijing.aliyuncs.com/hexo/062554.png',
        oAuth: {
            github: {
                getAccessToken: 'https://github.com/login/oauth/access_token',
                getUserInfo: 'https://api.github.com/user',
                ...user.oAuth.github
            },
            wx: {
                getAccessToken: '',
                getUserInfo: '',
                ...user.oAuth.wx
            },
            wb: {
                getAccessToken: '',
                getUserInfo: '',
                ...user.oAuth.wb
            },
            qq: {
                getAccessToken: '',
                getUserInfo: '',
                ...user.oAuth.qq
            }
        }
    },
    root
}

module.exports = config
