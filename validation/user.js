/*
 * @Author: Aaron
 * @Date: 2019-11-07 18:15:57
 * @LastEditors: Aaron
 * @LastEditTime: 2019-11-19 12:21:18
 * @Description: file content
 */
const Joi = require('@hapi/joi');

const registerSchema = Joi.object({
    username: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'cn'] } }),
    password: Joi.string().pattern(/^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)])+$).{6,20}$/),
    code: Joi.number(),
    ticket: Joi.string(),
    randstr: Joi.string(),
})

const LoginSchema = Joi.object({
    username: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'cn'] } }),
    password: Joi.string().pattern(/^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)])+$).{6,20}$/),
    ticket: Joi.string(),
    randstr: Joi.string()
})
