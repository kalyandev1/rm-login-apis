
const express = require("express");
const app = express();
const router = require('express').Router()
// const http = require('http')
const https = require('https')

const server = require('./src/frameworks_drivers/server/server')
const sequelize = require('./src/frameworks_drivers/database/sequelize')
const cors = require("cors");
let fs = require('fs');
const port = process.env.PORT || 3001

// let myserver = http.Server(server);

app.use(cors('*'));

var options = {
    key: fs.readFileSync('./certificates/privatekey.key'),
    cert: fs.readFileSync('./certificates/certificate.crt.crt')
};
  
    // key: fs.readFileSync('./certificates/server.key'),
    // cert: fs.readFileSync('./certificates/servercrt.crt'),  
let myserver = https.Server(options, server);
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
  


