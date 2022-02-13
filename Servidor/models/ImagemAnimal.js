const db = require('./db')

const ImagemAnimal = db.sequelize.define('ImagemAnimal',{
    NumeroImagem:{
        type:db.Sequelize.INTEGER,
        primaryKey:true,
    },
    IdAnimal:{
        type:db.Sequelize.INTEGER,
        primaryKey:true,
    },
    PathAnimal:{
        type:db.Sequelize.STRING(40),
    }
},{
    freezeTableName: true,
    timestamps: false,
    createdAt: false,
    updatedAt: false,
});

module.exports = ImagemAnimal