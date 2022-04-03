const db = require('./db')

const TelefoneCliente = db.sequelize.define('TelefoneCliente',{
    IdCliente:{
        type: db.Sequelize.INTEGER,
        primaryKey:true,
    },
	Numero:{
        type:db.Sequelize.STRING(16),
        primaryKey:true,
    },
    NumeroOrdem:{
        type: db.Sequelize.ENUM('1','2'),
    },
},{
    freezeTableName: true,
    timestamps: false,
    createdAt: false,
    updatedAt: false,
});

module.exports = TelefoneCliente