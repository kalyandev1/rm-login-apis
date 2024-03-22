module.exports = (sequelize, type) => {
    return sequelize.define('users', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        name: {
            type: type.STRING,
            allowNull: true
        },
        mobile: {
            type: type.STRING,
            allowNull: true
        },
        email: {
            type: type.STRING,
            allowNull: true
        },  
        password: {
            type: type.STRING,
            allowNull: true
        }, 
        otp: {
            type: type.STRING,
            allowNull: true
        },  
        created_date: {
            type: type.STRING,
            allowNull: true
        }
    },{
        freezTableName: true,
        updatedAt: false,
        createdAt: false
    })
}