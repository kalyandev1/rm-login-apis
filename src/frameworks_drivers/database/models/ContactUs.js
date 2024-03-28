module.exports = (sequelize, type) => {
    return sequelize.define('contactus', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        mobile: {
            type: type.STRING,
            allowNull: true
        },
        email: {
            type: type.STRING,
            allowNull: true
        },  
        message: {
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