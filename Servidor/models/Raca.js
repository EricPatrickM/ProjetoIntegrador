const db = require('./db')

const Raca = db.sequelize.define('Raca',{
    idRaca:{
        type: db.Sequelize.INTEGER,
        allowNull: false,
        primaryKey:true,
    },
    Nome: {
        type:db.Sequelize.STRING(20),
        allowNull: false,
        defaultValue: "RND",
    },
},{
    freezeTableName: true,
    timestamps: false,
    createdAt: false,
    updatedAt: false,
});

module.exports = Raca