const db = require('./db')

const TelefoneLoja = db.sequelize.define('TelefoneLoja',{
    IdLoja:{
        type:db.Sequelize.INTEGER,
        primaryKey:true,
    },
    NumeroOrdem:{
        type: db.Sequelize.ENUM('1','2'),
        primaryKey:true,
    },
    Numero:{
        type:db.Sequelize.STRING(16),
    }
},{
    freezeTableName: true,
    timestamps: false,
    createdAt: false,
    updatedAt: false,
});

module.exports = TelefoneLoja