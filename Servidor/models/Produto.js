const db = require('./db')

const Produto = db.sequelize.define('Produto',{
    IdProduto:{
        type:db.Sequelize.INTEGER, 
        primaryKey:true
    },
    IdLoja:{
        type:db.Sequelize.INTEGER, 
        primaryKey:true
    },
    Tipo:{
        type:db.Sequelize.STRING(30), 
    },
    Fabricante:{
        type:db.Sequelize.STRING(50), 
    },
    Valor:{
        type:db.Sequelize.DOUBLE,
    },
    Nome:{
        type:db.Sequelize.STRING(50), 
    },
    Descricao:{
        type:db.Sequelize.STRING(200),
    },
},{
    freezeTableName: true,
    timestamps: false,
    createdAt: false,
    updatedAt: false,
});

module.exports = Produto