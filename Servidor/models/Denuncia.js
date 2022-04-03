const db = require('./db')

const Denuncia = db.sequelize.define('Denuncia',{
    IdDenuncia:{
        type:db.Sequelize.INTEGER, 
        primaryKey:true
    },
    IdAnimal:{
        type:db.Sequelize.INTEGER, 
    },
    IdLoja:{
        type:db.Sequelize.INTEGER, 
    },
    IdCliente:{
        type:db.Sequelize.INTEGER, 
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

module.exports = Denuncia