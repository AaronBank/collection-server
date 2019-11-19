/*
 * @Author: Aaron
 * @Date: 2019-11-19 17:34:55
 * @LastEditors: Aaron
 * @LastEditTime: 2019-11-19 18:51:13
 * @Description: file content
 */
const axios = require('axios')
const SUCCESS_CODE = 200

const httpFactory = (method) => {
    const instance = axios.create({
        timeout: 100000,
        responseType: 'json'
    })

    return (url, data, headers={}) => new Promise((resolve, reject) => {
        const options = {
            url,
            method,
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
                ...headers
            }
        }

        method !== 'post' ? options.params = data : options.data = data

        console.info('请求发送配置详细信息：', options)
        instance(options)
        .then((res) => {
            console.log('结果返回信息', res)
            if (res.status === SUCCESS_CODE) {
                return resolve(res.data)
            }
            console.error(`请求失败，状态${res.status}`, res)
            reject(new Error(res))
        })
        .catch(error => {
            console.error('请求发送失败，错误信息：', error)
            reject(new Error(error))
        })
    })
}

const request = { all: axios }
const requestTypes = ['get', 'post', 'put', 'delete']

requestTypes.forEach(key => request[key] = httpFactory(key))

module.exports = {
    ...request,
    all: axios
}