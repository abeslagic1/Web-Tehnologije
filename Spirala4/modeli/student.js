const Sequelize = require ( "sequelize" );

module.exports = function(sequelize){
    const Student = sequelize.define ('Student', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        ime: {
            type: Sequelize.STRING,
            allowNull: false
        },
        index:{
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        }
    })
    return Student;
};