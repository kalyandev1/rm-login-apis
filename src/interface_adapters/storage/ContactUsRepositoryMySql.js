const sequelize = require('../../frameworks_drivers/database/sequelize')
const _ = require('lodash')
const Sequelize = require('sequelize')

module.exports = class {
    constructor() {
        this.db = sequelize
        this.model = this.db.model('contactus')
    }

    async add1(Entity) {
        const err = []
        const { mobile, email, message,created_date } = Entity
        if (_.isUndefined(email) || _.isNull(email)) err.push("email is required in field 'email'")
        if (err.length > 0) return err
        else {
            return await this.model.create({ mobile, email, message,created_date }, { raw: true })
        }
    }
  
}

