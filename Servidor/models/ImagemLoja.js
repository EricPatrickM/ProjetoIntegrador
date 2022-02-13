const db = require('./db')

const ImagemLoja = db.sequelize.define('ImagemLoja',{
    NumeroImagem:{
        type:db.Sequelize.INTEGER,
        primaryKey:true,
    },
    CNPJ:{
        type:db.Sequelize.STRING(50),
        primaryKey:true,
    },
    PathLoja:{
        type:db.Sequelize.STRING(40),
    }
},{
    freezeTableName: true,
    timestamps: false,
    createdAt: false,
    updatedAt: false,
});

module.exports = ImagemLoja