const db = require('./db')

const Estado = db.sequelize.define('Estado',{
    Sigla:{
        type:db.Sequelize.STRING(2),
        primaryKey:true,
    },
    Nome:{
        type:db.Sequelize.STRING(30),
    },
},{
    freezeTableName: true,
    timestamps: false,
    createdAt: false,
    updatedAt: false,
});

module.exports = Estado