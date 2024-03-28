module.exports = class{
    constructor(repository){
        this.repository = repository
    }
    add123(Entity){
        return this.repository.add1(Entity)
    }
   
}