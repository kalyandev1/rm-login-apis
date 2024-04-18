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







module.exports = router