
const express = require("express");
const app = express();
const router = require('express').Router()
const http = require('http')
const server = require('./src/frameworks_drivers/server/server')
const sequelize = require('./src/frameworks_drivers/database/sequelize')
const cors = require("cors");

const port = process.env.PORT || 3001

let myserver = http.Server(server);

app.use(cors('*'));
app.get('/',(req,res)=>{
    res.send(`<html>
    <body>
        <h1 style="color:blue;text-align: center;margin-top: 100px;"> [Version : This is AMAZING!!! Like & Subscribe!</h1>
        <div style="position: fixed;top: 50%;left: 50%;transform: translate(-50%, -50%)">
        <h1>hello world</h1>
        </div>
    </body>
   </html>`);
})

try {
    ("step1")
   
    sequelize.sync()
   
} catch (error) {
   
}
try {
    console.log("server running on ",port)

    myserver.listen(port)
} catch (error) {
    console.log('failed to start the server')
}

