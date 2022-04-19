const db = require('./db')

const Animal = db.sequelize.define('Animal',{
    IdAnimal:{ 
        type:db.Sequelize.INTEGER,
        primaryKey: true,
    },
    idCliente:{
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
        type:db.Sequelize.ENUM("Padrao","Perdido","Vende-se"),
    },
    DataNascimento:{
        type:db.Sequelize.INTEGER,
    },
    Disponivel:{
        type: db.Sequelize.BOOLEAN,
    }
},{
    freezeTableName: true,
    timestamps: false,
    createdAt: false,
    updatedAt: false,
});

module.exports = Animal