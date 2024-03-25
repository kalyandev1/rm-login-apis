const Sequelize = require("sequelize");

const usersModel = require("./models/Users");
const otpModel = require("./models/Otp");
// const sequelize = new Sequelize("metalok", "postgres", "password", {
  const sequelize = new Sequelize("my_app", "my_app_role", "some_password", {

  define: {
    freezeTableName: true,
  },
  // host:"3.111.10.134",
  host:"3.111.17.212",
  port: 5432,
  dialect: "postgres",

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