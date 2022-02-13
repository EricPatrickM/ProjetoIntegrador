const db = require('./db')

const ImagemCliente = db.sequelize.define('ImagemCliente',{
    NumeroImagem:{
        type:db.Sequelize.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true,
    },
    IdCliente:{
        type:db.Sequelize.INTEGER,
        allowNull:false,
        primaryKey:true,
        references:'Cliente',
        referencesKey:'IdCliente'
    },
    PathImagem:{
        type:db.Sequelize.STRING(40),
        allowNull:false,
    }
},{
    freezeTableName: true,
    timestamps: false,
    createdAt: false,
    updatedAt: false,
});

module.exports = ImagemCliente