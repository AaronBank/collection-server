/*
 * @Author: Aaron
 * @Date: 2019-11-06 23:21:20
 * @LastEditors: Aaron
 * @LastEditTime: 2019-11-19 01:21:22
 * @Description: file content
 */
class Base {
    constructor(app, ctx, modelName) {
        this.ctx = ctx
        this.app = app
        const key = modelName.substring(0, 1).toUpperCase() + modelName.substring(1)
        this.Model = app.model[key]
    }
    async create(data) {
        return await this.Model.create(data)
    }
    async find(data) {
        return await this.Model.findAll(data)
    }
    async findId(id) {
        return await this.Model.findById(id)
    }
    async findPaging() {
        return await this.Model.findAndCountAll(data)
    }
    async update(id, data) {
        if (typeof id === 'object') 
            return await this.Model.upert(data)
        const model = this.findId(id)
        return await model.upert(data)
    }
    async destroy(data) {
        return await this.Model.destroy(data)
    }
}

module.exports = Base;