const router = require('express').Router()
const _ = require('lodash')
const moment = require('moment');

const nodemailer = require('nodemailer');

const OtpUseCases = require('../../application_business_rules/use_cases/OtpUseCases')
const OtpRepositoryMySql = require('../storage/OtpRepositoryMySql')
const OtpRepository = require('../../application_business_rules/repositories/OtpRepository')

const otpRepository = new OtpRepository(new OtpRepositoryMySql())
const otpUseCases = new OtpUseCases()

const UsersUseCases = require('../../application_business_rules/use_cases/UsersUseCases')
const UsersRepositoryMySql = require('../storage/UsersRepositoryMySql')
const UsersRepository = require('../../application_business_rules/repositories/UsersRepository')

const usersRepository = new UsersRepository(new UsersRepositoryMySql())
const usersUseCases = new UsersUseCases()


router.post('/getotp', async (req, res) => {

try{
    var {email} = req.body
    var dt = moment().format()
    var checkemail = await usersUseCases.checkemail({email}, usersRepository)
    if (checkemail.length > 0) {
    res.status(202).json({ status: 202, message: 'Your email already exists'
})
}else{
    var otp = Math.floor(Math.random() * 100000);
    var result = await otpUseCases.addotp({otp,email,created_date:dt}, otpRepository)
    if (_.isArray(result))
            res.status(203).json({ status: 203, message: 'something went wrong..!'
      })
        else {
           const transporter = nodemailer.createTransport({
               service: 'gmail',
               secure: false,
               auth: {
                   user: 'no-reply@evaidya.com',
                   pass: 'ehealthaccess',
               },
           });
           transporter.sendMail({
               from: 'no-reply@evaidya.com',
               to: email, 
               cc: 'vamshijustin25@gmail.com',
               subject: `Hello this is testing purpose mail`, 
               text: "Dear user, use this One Time Password " + otp + " This OTP will be valid for the next 10 mins."
           }).then(result => {
              
           }).catch(err => {
               console.log(err);
               return res.status(400).json({
                   code: "error",
                   message: err
               })
           })
            res.status(200).json({
                status: 200,
                message: 'otp has been sent to your email id..!',
                // roles: result
            })
           
           }
}
 
 
} catch (err) {
    res.status(500).json({
        status: "500",
        message: "Internal Server Error",
        error: err.message
    });
}
})

router.post('/validateotp', async (req, res) => {

    var dt = moment().format()

    const { name, mobile, email,password,otp } = req.body
    console.log('kalyan @@', otp)
    try{
    const result = await otpUseCases.otpcheck(otp, otpRepository)
  
    if (result.length > 0) {

    const givenTimestamp = result[0].created_date;
console.log('givenTimestamp')
 
    var currentTime = moment();
    
    var differenceInMinutes = currentTime.diff(givenTimestamp, 'minutes');


    if (differenceInMinutes <= 10) {

        const result = await usersUseCases.addRoles({name, mobile, email,password,otp,created_date:dt}, usersRepository)

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            secure: false,
            auth: {
                user: 'vamshijustin25@gmail.com',
                pass: 'Vadloori@25',
            },
        });
        transporter.sendMail({
            from: 'vamshijustin25@gmail.com',
            to: email, 
            cc: 'vamshijustin25@gmail.com',
            subject: `Hello this is testing purpose mail`, 
            text: "Your Registration successfully Completed..!"
        }).then(result => {
           
        }).catch(err => {
            console.log(err);
            return res.status(400).json({
                code: "error",
                message: err
            })
        })
        return res.status(200).json({ status:200, message: 'Your Registration successfully Completed..!'})

} else {
    return res.status(201).json({ status:201, message: 'OTP is Expired.!' })

}

    } else {
        return res.status(203).json({
            status: 203,
            message: 'Please enter valid OTP..!',
        })
    }

} catch (err) {
    res.status(500).json({
        status: "500",
        message: "Internal Server Error",
        error: err.message 
    });
}
})








module.exports = router