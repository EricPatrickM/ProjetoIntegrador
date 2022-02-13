const db = require('./db')

const Animal = db.sequelize.define('Animal',{
    IdAnimal:{ 
        type:db.Sequelize.INTEGER,
        primaryKey: true,
    },
    Raca:{
        type:db.Sequelize.INTEGER,
    },
    idCliente:{
        type:db.Sequelize.INTEGER,
    },
    Nome:{ 
        type:db.Sequelize.STRING(50),
    },
    Cor:{
        type:db.Sequelize.STRING(15),
    },
    Porte:{
        type:db.Sequelize.ENUM("Pequeno", "Medio", "Grande"),
    },
    Status:{
        type:db.Sequelize.ENUM("Padrao","Perdido","Vende-se"),
    },
    Idade:{
        type:db.Sequelize.INTEGER,
    },
    Valor: {
        type:db.Sequelize.DOUBLE
    },
},{
    freezeTableName: true,
    timestamps: false,
    createdAt: false,
    updatedAt: false,
});

module.exports = Animal