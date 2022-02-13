const db = require('./db')

const Loja = db.sequelize.define('Loja',{
    IdLoja:{
        type:db.Sequelize.INTEGER,
        primaryKey:true,
    },
    CNPJ:{
        type:db.Sequelize.STRING(18),
    },
	Nome:{
        type:db.Sequelize.STRING(50),
    },
    IdCliente:{
        type:db.Sequelize.INTEGER,
    },
    Estado:{
        type: db.Sequelize.STRING(20),
    },
    Cidade:{
        type: db.Sequelize.STRING(30),
    },
    Bairro: {
        type: db.Sequelize.STRING(30),
    },
    Rua: {
        type: db.Sequelize.STRING(50)
    },
    Numero: {
        type: db.Sequelize.INTEGER,
    },
    Complemento:{
        type:db.Sequelize.STRING(50)
    },
    Email: {
        type:db.Sequelize.STRING(50),
    },
    Descricao:{
        type: db.Sequelize.STRING(200),
    },
},{
    freezeTableName: true,
    timestamps: false,
    createdAt: false,
    updatedAt: false,
}
);

module.exports = Loja