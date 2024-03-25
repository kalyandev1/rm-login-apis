const Sequelize = require("sequelize");

const usersModel = require("./models/Users");
const otpModel = require("./models/Otp");
const sequelize = new Sequelize("rm-p", "admin", "12345678", {
  define: {
    freezeTableName: true,
  },
  host:"mysql1.crokgck2cajx.ap-south-1.rds.amazonaws.com",
  port: 3306,
  dialect: "mysql",

  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },

});

const Users = usersModel(sequelize, Sequelize);
const Otp = otpModel(sequelize, Sequelize);
module.exports = sequelize;