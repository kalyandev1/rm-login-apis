module.exports = class{
    constructor(repository){
        this.repository = repository
    }
    add(Entity){
        return this.repository.add(Entity)
    }
    email(entity){
        return this.repository.email(entity)

    }
    signupdata(Entity){
        return this.repository.signupdata(Entity)
    }
    signindata(Entity){
        return this.repository.signindata(Entity)
    }
}