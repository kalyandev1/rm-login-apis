const express = require('express')
const app = express()

 const usersRoutes = require('../../interface_adapters/controllers/UsersController');
 const otpRoutes = require('../../interface_adapters/controllers/OtpController');


app.use(express.urlencoded({ limit: '50mb', extended: false }))
app.use(express.json())

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});


app.use('/api/v1/user',usersRoutes);
app.use('/api/v1/otp',otpRoutes);


app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
});
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app