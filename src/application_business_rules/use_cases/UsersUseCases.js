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
    signup(Entity, Repository) { 
        return Repository.signupdata(Entity)
    }
    signin(Entity, Repository) { 
        return Repository.signindata(Entity)
    }
    
}