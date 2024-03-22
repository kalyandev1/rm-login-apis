module.exports = (sequelize, type) => {
    return sequelize.define('otp', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        email: {
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