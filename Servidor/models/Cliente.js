const db = require('./db')

//visibilidade 0=publica, 1=somente com codigo de acesso e 2= privado
const Cliente = db.sequelize.define('Cliente',{
    IdCliente:{
        type:db.Sequelize.INTEGER,
        primaryKey:true,
        autoincrement: true,
    },
    Nome:{
        type: db.Sequelize.STRING(50),
    },
    Senha:{
        type: db.Sequelize.STRING(64),//64 por conta da criptografia
    },
    Email:{
        type: db.Sequelize.STRING(50),
    },
    DataNascimento:{
        type: db.Sequelize.DATE,
    },
    CodigoAcesso:{
        type: db.Sequelize.STRING(70),
    },
    Administrador:{
        type:db.Sequelize.BOOLEAN,
    },
    Estado:{
        type: db.Sequelize.STRING(2),
    },
    Cidade:{
        type: db.Sequelize.STRING(30),
    },
    Bairro:{
        type: db.Sequelize.STRING(40),
    },
    Rua:{
        type: db.Sequelize.STRING(50),
    },
    Numero:{
        type: db.Sequelize.INTEGER,
    },
    Complemento:{
        type: db.Sequelize.STRING(50),
    },
    VisibilidadeNome:{
        type: db.Sequelize.ENUM('0','1','2'),
    },
    VisibilidadeEmail:{
        type: db.Sequelize.ENUM('0','1','2'),
    },
    VisibilidadeDataNascimento:{
        type: db.Sequelize.ENUM('0','1','2'),
    },
    VisibilidadeEstado:{
        type: db.Sequelize.ENUM('0','1','2'),
    },
    VisibilidadeCidade:{
        type: db.Sequelize.ENUM('0','1','2'),
    },
    VisibilidadeBairro:{
        type: db.Sequelize.ENUM('0','1','2'),
    },
    VisibilidadeRua:{
        type: db.Sequelize.ENUM('0','1','2'),
    },
    VisibilidadeNumero:{
        type: db.Sequelize.ENUM('0','1','2'),
    },
    VisibilidadeComplemento:{
        type: db.Sequelize.ENUM('0','1','2'),
    },
    Disponivel:{
        type: db.Sequelize.BOOLEAN,
    }
},{
    freezeTableName: true,
    timestamps: false,
    createdAt: false,
    updatedAt: false,
});

module.exports = Cliente