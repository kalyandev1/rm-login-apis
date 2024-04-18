const router = require('express').Router()
const _ = require('lodash')
const moment = require('moment');
var nodemailer = require('nodemailer');
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

var transporter = nodemailer.createTransport(
    {
        secure: false,
        auth: {
            user: '',
            pass: ''
        }
    }
);
var options = {
    from: 'kalyanmetalok@gmail.com',
    to: 'kalyan@metalok.io',
    subject: "Hello this is Testing purpose mail",
    html: `<h2>Hello,</h2>
    <h2>A New form has been submitted on your website. Details below.</h1>
    <h4>Mobile Number: ${mobile},</h4>
    <h4>Email: ${email},</h4>
    <h4>Message: ${message}.</h4>`,
};
transporter.sendMail(
    options, async (error, info) =>{
        if (error) {
            console.log(error)
        }
        else { 
            
        }

    }
)
return res.status(200).json({status:200, message: "A New form has been submitted",result:result});

} catch (err) {
        res.status(500).json({
            status: "500",
            message: "Internal Server Error",
            error: err.message
        });
    }

})






module.exports = router