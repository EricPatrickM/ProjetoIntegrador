const db = require('./db')

const ImagemProduto = db.sequelize.define('imagemProduto',{
    NumeroImagem:{
        type:db.Sequelize.INTEGER,
        primaryKey:true,
    },
    IdProduto:{
        type:db.Sequelize.INTEGER,
        primaryKey:true,
    },
    PathProduto: {
        type:db.Sequelize.STRING(40),
    },
},{
    freezeTableName: true,
    timestamps: false,
    createdAt: false,
    updatedAt: false,
});

module.exports = ImagemProduto