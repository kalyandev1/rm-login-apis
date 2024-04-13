const router = require('express').Router()
const _ = require('lodash')
const moment = require('moment');
// const nodemailer = require('nodemailer');
var nodemailer = require('nodemailer');

const jwt = require('jsonwebtoken')


const ContactUsUseCases = require('../../application_business_rules/use_cases/ContactUsUseCases')
const ContactUsRepositoryMySql = require('../storage/ContactUsRepositoryMySql')
const ContactUsRepository = require('../../application_business_rules/repositories/ContactUsRepository')

const contactRepository = new ContactUsRepository(new ContactUsRepositoryMySql())
const contactUseCases = new ContactUsUseCases()

// router.post('/addcontactss', async (req, res) => {
//     const {mobile,email,message} = req.body
//     var dt = moment().format()

//     try{
        
// const result = await contactUseCases.add({mobile,email,message,created_date:dt}, contactRepository)
// console.log('first',result.length)
//     // if(result.length0){
//         console.log('5432',result)

//         const transporter = nodemailer.createTransport({
//             service: 'gmail',
//             // secure: false,
//             auth: {
//                 user: 'no-replyevaidya.com',
//                 pass: 'ehealthaccess',
//             },
//         });
//         transporter.sendMail({
//             from: 'kalyanmetalok@gmail.com',
//             to: email, 
//             cc: 'metaloksolutin@gmail.com, kalyanwd25@gmail.com',
//             subject: `Hello t'his is testing purpose mail`, 
//             text: "Dear user," + mobile + email + message +" thanks"
//         }).then(result => {
//            console.log('testing',result)
//         }).catch(err => {
//             console.log(err);
//             return res.status(400).json({
//                 code: "error",
//                 message: err
//             })
//         })
//                res.status(200).json({
//                         status: "200",
//                         message: "done",
//                     });
           
// } catch (err) {
//     res.status(500).json({
//         status: "500",
//         message: "Internal Server Error",
//         error: err.message
//     });
// }
// })

// router.post('/addcontact11s', async (req, res) => {
//     // var {email} = req.body
//     var dt = moment().format()

//     try{
        
// // const result = await contactUseCases.add({mobile,email,message,created_date:dt}, contactRepository)
// // console.log('first',result.length)
// //     // if(result.length0){
// //         console.log('5432',result)

//         const transporter = nodemailer.createTransport({
//             // host: 'smtp.outlook.com',
//             // port: 587,
//             // secure: true, // use SSL
//             // auth: {
//             //     user: 'kalyan@metalok.io', // SMTP username
//             //     pass: 'Metalok@123' // SMTP password
//             // }
//             service: 'gmail',
//             secure: false,
//             auth: {
//                 user: 'no-replyevaidya.com',
//                 pass: 'ehealthaccess',
//             },

//         });
//         transporter.sendMail({
//             from: 'kalyan@metalok.io',
//             to: 'kalyanwd25@gmail.com', 
//             cc: '',
//             subject: `Hello t'his is testing purpose mail`, 
//             text: "Dear user thanks"
//         }).then(result => {
//            console.log('testing',result)
//         }).catch(err => {
//             console.log(err);
//             return res.status(400).json({
//                 code: "error",
//                 message: err
//             })
//         })
//                res.status(200).json({
//                         status: "200",
//                         message: "done",
//                     });
           
// } catch (err) {
//     res.status(500).json({
//         status: "500",
//         message: "Internal Server Error",
//         error: err.message
//     });
// }
// })


// router.post('/addcontacts', async(req,res)=>{

// // Create the transporter with the required configuration for Outlook
// // change the user and pass !
// var transporter = nodemailer.createTransport({
//     host: "smtp-mail.outlook.com", // hostname
//     secureConnection: false, // TLS requires secureConnection to be false
//     port: 587, // port for secure SMTP
//     tls: {
//        ciphers:'SSLv3'
//     },
//     auth: {
//         user: 'priyanka@metalok.io',
//         pass: 'priya@1508'
//     }
// });

// // setup e-mail data, even with unicode symbols
// var mailOptions = {
//     from: 'priyanka@metalok.io', // sender address (who sends)
//     to: 'kalyan@metalok.io', // list of receivers (who receives)
//     subject: 'Hello ', // Subject line
//     text: 'Hello world ', // plaintext body
//     html: '<b>Hello world </b><br> This is the first email sent with Nodemailer in Node.js' // html body
// };

// // send mail with defined transport object
// transporter.sendMail(mailOptions, function(error, info){
//     if(error){
//         return console.log(error);
//     }
// return res.json({ data:info.response})
//     console.log('Message sent: ' + info.response);
// });

// })


router.post('/addcontacts', async (req, res) => {
    const {mobile,email,message} = req.body
    var dt = moment().format()

    try{
    
const result = await contactUseCases.add({mobile,email,message,created_date:dt}, contactRepository)


var transporter = nodemailer.createTransport(
    {
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: 'kalyanmetalok@gmail.com',
            pass: 'mkmvhzrhyiofifoa'
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
            // console.log("kalyan...",info)
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


// router.post('/addcontacts', async (req, res) => {
//     var transporter = nodemailer.createTransport(
//         {
//             host: "smtp.office365.com",
//             port: 587,
//             secure: false,
//             auth: {
//                 user: 'kalyan@metalok.io',
//                 pass: 'hvvmxkkmjknrpltf'
//             }
//         }
//     );

//     var options = {
//         from: 'kalyan@metalok.io',
//         to: 'nagamani@metalok.io',
//         subject: "Testing node emails",
//         html: `<h1>Hello, welcome to our application</h1>
//          <img src='cid:food' width='200px'>
//          <button>Click Here</button>
//         `,
//         attachments: [
//             {
//                 filename: 'food.jpeg',
//                 path: "https://images.pexels.com/photos/421809/pexels-photo-421809.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//                 cid: 'food'
//             }
//         ]
//     };

//     transporter.sendMail(
//         options, function (error, info) {
//             if (error) {
//                 console.log(error);
//                 res.status(500).send("Error sending email");
//             }
//             else {
//                 console.log("Email sent: " + info.response);
//                 res.status(200).send("Email sent successfully");
//             }
//         }
//     );
// });








module.exports = router