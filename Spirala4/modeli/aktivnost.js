const Sequelize = require ( "sequelize" );


module.exports = function(sequelize){
    const Aktivnost = sequelize.define ('Aktivnost', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        naziv: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        pocetak: {
            type: Sequelize.FLOAT,
            allowNull: false
        },
        kraj:{
            type: Sequelize.FLOAT,
            allowNull: false
        }, 
        predmetId: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        danId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        tipId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        grupaId: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    })
    

    return Aktivnost;
};