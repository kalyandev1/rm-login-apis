const router = require('express').Router()
const _ = require('lodash')
const moment = require('moment');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken')


const ContactUsUseCases = require('../../application_business_rules/use_cases/ContactUsUseCases')
const ContactUsRepositoryMySql = require('../storage/ContactUsRepositoryMySql')
const ContactUsRepository = require('../../application_business_rules/repositories/ContactUsRepository')

const contactRepository = new ContactUsRepository(new ContactUsRepositoryMySql())
const contactUseCases = new ContactUsUseCases()

router.post('/addcontacts', async (req, res) => {
    const {mobile,email,message} = req.body
    var dt = moment().format()

    try{
        
const result = await contactUseCases.add({mobile,email,message,created_date:dt}, contactRepository)
console.log('first',result.length)
    // if(result.length0){
        console.log('5432',result)

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            // secure: false,
            auth: {
                user: 'no-reply@evaidya.com',
                pass: 'ehealthaccess',
            },
        });
        transporter.sendMail({
            from: 'no-reply@evaidya.com',
            to: email, 
            cc: 'metaloksolution@gmail.com, kalyanwd25@gmail.com',
            subject: `Hello t'his is testing purpose mail`, 
            text: "Dear user," + mobile + email + message +" thanks"
        }).then(result => {
           console.log('testing',result)
        }).catch(err => {
            console.log(err);
            return res.status(400).json({
                code: "error",
                message: err
            })
        })
               res.status(200).json({
                        status: "200",
                        message: "done",
                    });
           
} catch (err) {
    res.status(500).json({
        status: "500",
        message: "Internal Server Error",
        error: err.message
    });
}
})

module.exports = router