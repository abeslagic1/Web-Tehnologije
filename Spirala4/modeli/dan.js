const Sequelize = require ( "sequelize" );

module.exports = function(sequelize){
    const Dan = sequelize.define ('Dan', {
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
    return Dan;
};