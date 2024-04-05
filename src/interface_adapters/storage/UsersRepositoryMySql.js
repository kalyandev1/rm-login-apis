const sequelize = require('../../frameworks_drivers/database/sequelize')
const _ = require('lodash')
const Sequelize = require('sequelize')

module.exports = class {
    constructor() {
        this.db = sequelize
        this.model = this.db.model('users')
    }

    async add(Entity) {
        const err = []
        const { name, mobile, email, password,otp,created_date } = Entity
        if (_.isUndefined(name) || _.isNull(name)) err.push("name is required in field 'name'")
        if (err.length > 0) return err
        else {
            return await this.model.create({ name, mobile, email, password,otp,created_date }, { raw: true })
        }
    }
  
    async email(entity) {
        const {email} = entity
        return await this.model.findAll({ where: { email:email} })

    }
    
    async signupdata(Entity) {
        const err = []
        const { name, mobile, email, password,created_date } = Entity
        if (_.isUndefined(name) || _.isNull(name)) err.push("name is required in field 'name'")
        if (err.length > 0) return err
        else {
            return await this.model.create({ name, mobile, email, password,created_date }, { raw: true })
        }
    }
    async signindata(Entity) {
        const err = []
        const { email, password } = Entity
        if (_.isUndefined(email) || _.isNull(email)) err.push("email is required in field 'email'")
        if (err.length > 0) return err
        else {
            return await this.model.findAll({ where: { email,password} })
        }
    }
}

