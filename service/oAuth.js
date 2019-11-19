/*
 * @Author: Aaron
 * @Date: 2019-11-06 23:12:07
 * @LastEditors: Aaron
 * @LastEditTime: 2019-11-19 18:54:36
 * @Description: file content
 */
const axios = require('axios')
const { post, get } = require('../utils/request')
const auth = require('../config/').user

const { github } = auth.oAuth

const getAuthorization = {
    async github(token) {
        try {
            const res = await post(github.getAccessToken, {
                client_id: github.id,
                client_secret: github.secret,
                code: token
            },{
                accept: 'application/json',
                Authorization: `token ${token}`
            })

            return res.access_token
        } catch (error) {
            console.error('获取AccessToken失败', error)
            throw new Error('授权失败')
        }
    },
    wx() {

    },
    wb() {

    },
    qq() {

    }
}

const getInformation = {
    async github(accessToken) {
        try {
            const res = await get(github.getUserInfo, {}, {
                Authorization: `token ${accessToken}`
            })
            console.log('res', res)
            return res
        } catch (error) {
            console.error('获取用户信息失败', error)
            throw new Error('授权失败')
        }
    },
    wx() {

    },
    wb() {

    },
    qq() {

    }
}

module.exports = app => class {
    async getAccessToken(token, type) {
        return await getAuthorization[type](token)
    }

    async getUserInfo(accessToken, type) {
        return await getInformation[type](accessToken)
    }
}