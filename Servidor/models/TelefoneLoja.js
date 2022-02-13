const db = require('./db')

const TelefoneLoja = db.sequelize.define('TelefoneLoja',{
    CNPJ:{
        type:db.Sequelize.STRING(50),
        primaryKey:true,
    },
    Numero:{
        type:db.Sequelize.STRING(15),
        primaryKey:true,
    }
},{
    freezeTableName: true,
    timestamps: false,
    createdAt: false,
    updatedAt: false,
});

module.exports = TelefoneLoja