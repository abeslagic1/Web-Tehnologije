const Sequelize = require ( "sequelize" );

module.exports = function(sequelize){
    const Predmet = sequelize.define ('Predmet', {
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
    return Predmet;
};
