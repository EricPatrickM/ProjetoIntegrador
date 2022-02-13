const db = require('./db')

const Tipo = db.sequelize.define('Tipo',{
    IdTipo:{
        type:db.Sequelize.INTEGER, 
        primaryKey:true
    },
    Nome:{
        type:db.Sequelize.STRING(40), 
        primaryKey:true
    }
},{
    freezeTableName: true,
    timestamps: false,
    createdAt: false,
    updatedAt: false,
});

module.exports = Tipo