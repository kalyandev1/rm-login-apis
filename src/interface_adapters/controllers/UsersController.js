const router = require('express').Router()
const _ = require('lodash')
const moment = require('moment');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken')
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


const jwtKey = "It's a secret"
const jwtExpirySeconds = 600

router.post('/requestotp', async (req, res) => {
    const { email} = req.body
    var dt = moment().format()
    console.log('kalyan @@')
    try{
    var checkemail = await usersUseCases.checkemail({email}, usersRepository)
    if (checkemail.length > 0) {

        var otp = Math.floor(Math.random() * 100000);

        var otpresp = await otpUseCases.addotp({otp,email,created_date:dt}, otpRepository)

        if (_.isArray(otpresp))
                res.status(203).json({ status: 203, message: 'Data Not Inserted..!'
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
                   cc: 'kalyanwd25@gmail.com',
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
            }

        return res.status(200).json({
            status: 200,
            message: 'OTP has been sent to your email id..!'
        })
    } else {
        return res.status(202).json({
            status: 202,
            message: 'this email address does not exist..!'
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

router.get('/userotplogin/:otp', async (req, res) => {
    const {otp} = req.params

    try{
        const result = await otpUseCases.otpcheck(otp, otpRepository)
  
        if (result.length > 0) {
    
        const givenTimestamp = result[0].created_date;
     
        const currentTime = moment();
        
        const differenceInMinutes = currentTime.diff(givenTimestamp, 'minutes');
    
        if (differenceInMinutes <= 10) {
        
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
                to: result[0].email, 
                cc: 'kalyanwd25@gmail.com',
                subject: `Hello this is testing purpose mail`, 
                text: "You are successfully logged in..!"
            }).then(result => {
            }).catch(err => {
                console.log(err);
                return res.status(400).json({
                    code: "error",
                    message: err
                })
            })

            var email =result[0].email
            var userres = await usersUseCases.checkemail({email}, usersRepository)

            const token = jwt.sign({ userres }, jwtKey, {
                algorithm: "HS256",
                expiresIn: jwtExpirySeconds,
            })
            console.log("token:", token)
            return res.status(200).json({
                status: 200,
                message: 'You are successfully logged in..!',
                token: { "token": token }
            })
    
    } else {
        return res.status(201).json({ status: 201, message: 'OTP is Expired.!' })
    
    }
        }else{
            res.status(202).json({
                status: 202,
                message: "Plese enter valid otp",
            });

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