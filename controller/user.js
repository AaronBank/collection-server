/*
 * @Author: Aaron
 * @Date: 2019-11-06 23:12:00
 * @LastEditors: Aaron
 * @LastEditTime: 2019-11-07 18:34:56
 * @Description: file content
 */
/*
 * @Author: Aaron
 * @Date: 2019-11-06 23:12:00
 * @LastEditors: Aaron
 * @LastEditTime: 2019-11-07 17:53:27
 * @Description: file content
 */
const Base = require('./base');

module.exports = app => class extends Base {
    constructor(ctx) {
        super(app, ctx, 'user')
    }

    // 验证参数及用户
    validation() {
        
    }
    // 生成JWT
    createJWT() {

    }

    register(data) {
        const user = this.validation(data)
        const token = this.createJWT(user)
        this.create(user)
        return token
    }
}