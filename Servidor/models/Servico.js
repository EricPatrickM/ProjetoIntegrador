const db = require('./db')

const Servico = db.sequelize.define('Servico',{
    IdServico:{
        type:db.Sequelize.INTEGER, 
        primaryKey:true
    },
    IdLoja:{
        type:db.Sequelize.INTEGER, 
        primaryKey:true
    },
    Tipo:{
        type:db.Sequelize.STRING(50), 
    },
    Descricao:{
        type:db.Sequelize.STRING(200),
    },
    Valor:{
        type:db.Sequelize.DOUBLE,
    }
},{
    freezeTableName: true,
    timestamps: false,
    createdAt: false,
    updatedAt: false,
});

module.exports = Servico