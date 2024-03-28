module.exports = class {
    getAllroles (Repository)  {
        return Repository.getAll()
    }
    add(Entity, Repository) { 
        return Repository.add123(Entity)
    }
   
}