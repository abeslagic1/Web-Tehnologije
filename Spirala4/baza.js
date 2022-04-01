const Sequelize = require('sequelize');
const sequelize = new Sequelize('wt2017047', 'root', 'root',{
    host:'localhost',
    dialect:'mysql'
});

const modeli = [
	require('./modeli/predmet.js'),
    require('./modeli/aktivnost.js'),
    require('./modeli/grupa.js'),
    require('./modeli/dan.js'),
    require('./modeli/tip.js'),
    require('./modeli/student.js'),
];

for (const model of modeli) {
	model(sequelize);
}

const {Predmet, Aktivnost, Grupa, Dan, Tip, Student} = sequelize.models;
Aktivnost.belongsTo(Predmet, {
    foreignKey: "predmetId",
    as: "predmet"
});

Aktivnost.belongsTo(Grupa,{
    foreignKey: "grupaId",
    as: "grupa"
});

Aktivnost.belongsTo(Dan,{
    foreignKey: "danId",
    as: "dan"
});

Aktivnost.belongsTo(Tip,{
    foreignKey: "tipId",
    as: "tip"
});

Student.belongsToMany(Grupa,{
    through: "student_grupa",
    as: "grupe"  
});

Grupa.belongsToMany(Student,{
    through: "student_grupa",
    as: "studenti"
});

Grupa.hasMany(Aktivnost,{
    as: "aktivnosti",
    foreignKey: "grupaId"
})


Grupa.belongsTo(Predmet, {
    foreignKey: "predmetId",
    as: "predmet"
});


sequelize.sync({alter:true});
module.exports = sequelize;