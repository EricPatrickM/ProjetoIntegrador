const db = require('./db')

const AnimalLoja = db.sequelize.define('AnimalLoja',{
    IdAnimal:{ 
        type:db.Sequelize.INTEGER,
        primaryKey: true,
    },
    idLoja:{
        type:db.Sequelize.INTEGER,
    },
    Especie:{
        type:db.Sequelize.STRING(50),
    },
    Raca:{
        type:db.Sequelize.STRING(50),
    },
    Nome:{ 
        type:db.Sequelize.STRING(50),
    },
    Cor:{
        type:db.Sequelize.STRING(30),
    },
    Porte:{
        type:db.Sequelize.ENUM("Pequeno", "Medio", "Grande"),
    },
    Status:{
        type:db.Sequelize.ENUM("Vende-se"),
    },
    DataNascimento:{
        type:db.Sequelize.INTEGER,
    },
    Valor: {
        type:db.Sequelize.DOUBLE
    }
},{
    freezeTableName: true,
    timestamps: false,
    createdAt: false,
    updatedAt: false,
});

module.exports = AnimalLoja