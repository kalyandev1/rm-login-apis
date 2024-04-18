const router = require('express').Router()
const _ = require('lodash')
const moment = require('moment');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken')

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
                    user: 'kalyanmetalok@gmail.com',
                    pass: 'ehealthaccess',
                   },
               });
               transporter.sendMail({
                   from: 'kalyanmetalok@gmail.com',
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



router.post('/signup', async (req, res) => {


    const { name, mobile, email,password } = req.body
    var dt = moment().format()

    try{    

        var checkemail = await usersUseCases.checkemail({email}, usersRepository)
        if (checkemail.length > 0) {
        res.status(202).json({ status: 202, message: 'Your email already exists'
    })
    }else{

        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: 'kalyanmetalok@gmail.com',
                pass: 'mkmvhzrhyiofifoa'
            }
           });
           transporter.sendMail({
               from: 'kalyanmetalok@gmail.com',
               to: email, 
               cc: '',
               subject: `Login Credentials`, 
               text: "Dear User, Your login credentials Uesr Name is : "+email+" and You'r Password is : " + password + "Metalok pvt ltd"
           }).then(async (result)=> {
      
        const result1 = await usersUseCases.signup({name, mobile, email,password,created_date:dt}, usersRepository)
        if (_.isObject(result1)){
        return  res.status(200).json({ status:200, message: 'Your Registration successfully Completed..!'})

        }else{
            return  res.status(201).json({ status:201, message: 'Your Registration faild..!'})

        }
           }).catch(err => {
               console.log(err);
               return res.status(400).json({
                   code: "error",
                   message: err
               })
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


router.post('/signin', async (req, res) => {
    var {email,password} = req.body

    try{
     
        var result = await usersUseCases.signin({email,password}, usersRepository)
        console.log('first',result)
        if (result.length > 0) {
        
            const token = jwt.sign({ result }, jwtKey, {
                algorithm: "HS256",
                expiresIn: jwtExpirySeconds,
            })
            console.log("kalyan..:", token)
            return res.status(200).json({
                status: 200,
                message: 'You are successfully logged in..!',
                result:result,
                token: token,

            })
    
 }else{
            res.status(202).json({
                status: 202,
                message: "Plese enter valid details",
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