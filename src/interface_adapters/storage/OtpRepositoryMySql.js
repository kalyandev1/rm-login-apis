const sequelize = require('../../frameworks_drivers/database/sequelize')
const _ = require('lodash')
const Sequelize = require('sequelize')

module.exports = class {
    constructor() {
        this.db = sequelize
        this.model = this.db.model('otp')
    }

    async add(rolesEntity) {
        const {email,otp,created_date } = rolesEntity
            return await this.model.create({ email,otp,created_date }, { raw: true })
    }
    async otpchecks(otp) {
        console.log(otp,'is ur otp')
        return await this.model.findAll({ where: { otp: otp } })
    }
}
