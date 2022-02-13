const db = require('./db')

const TelefoneCliente = db.sequelize.define('TelefoneCliente',{
    IdCliente:{
        type: db.Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
	Numero:{
        type:db.Sequelize.STRING(15),
        primaryKey:true,
    },
},{
    freezeTableName: true,
    timestamps: false,
    createdAt: false,
    updatedAt: false,
});

module.exports = TelefoneCliente