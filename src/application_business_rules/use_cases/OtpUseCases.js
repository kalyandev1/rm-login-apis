module.exports = class {
    getAllroles (Repository)  {
        return Repository.getAll()
    }
    addotp(rolesEntity, Repository) { 
        return Repository.add(rolesEntity)
    }

    otpcheck(otp , Repository)  {
        console.log("coming to usecases with")
        return Repository.otpchecks(otp)
   
    }

}