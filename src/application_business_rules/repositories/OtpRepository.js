module.exports = class{
    constructor(repository){
        this.repository = repository
    }
    add(rolesEntity){
        return this.repository.add(rolesEntity)
    }

    otpchecks(otp){
        console.log("coming to repository with")
        return this.repository.otpchecks(otp)
    }

   
}