const Sequelize = require ( "sequelize" );

module.exports = function(sequelize){
    const Tip = sequelize.define ('Tip', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        naziv: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        }
    })
    return Tip;
};