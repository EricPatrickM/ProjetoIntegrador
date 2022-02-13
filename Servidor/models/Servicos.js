const db = require('./db')

const Servicos = db.sequelize.define('Servicos',{
    TipoServico:{
        type:db.Sequelize.STRING(20), 
        primaryKey:true
    },
    CNPJ:{
        type:db.Sequelize.STRING(50),
        primaryKey:true,
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

module.exports = Servicos