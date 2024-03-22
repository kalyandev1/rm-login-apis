module.exports = class {
    getAllroles (Repository)  {
        return Repository.getAll()
    }
    addRoles(Entity, Repository) { 
        return Repository.add(Entity)
    }
    checkemail(entity,Repository){
        return Repository.email(entity)

    }
}