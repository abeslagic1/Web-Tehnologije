const Sequelize = require ( "sequelize" );

module.exports = function(sequelize){
    const Grupa = sequelize.define ('Grupa', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        naziv: {
            type: Sequelize.STRING,
            allowNull: true,
            unique: true
        },
        predmetId: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
    })
    return Grupa;
};