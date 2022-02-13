const db = require('./db')

//visibilidade 0=publica, 1=somente com codigo de acesso e 2= privado
const Cliente = db.sequelize.define('Cliente',{
    IdCliente:{
        type:db.Sequelize.INTEGER,
        primaryKey:true,
        /*allowNull:false,
        autoIncrement:true,*/
    },
    Nome:{
        type: db.Sequelize.STRING(50),
        //allowNull:false,
    },
    Senha:{
        type: db.Sequelize.STRING(64),//64 por conta da criptografia
        //allowNull:false,
    },
    Email:{
        type: db.Sequelize.STRING(50),
        //allowNull:false,
    },
    DataNascimento:{
        type: db.Sequelize.DATE,
        //allowNull:false,
    },
    CodigoAcesso:{
        type: db.Sequelize.STRING(70),
        //allowNull:false,
    },
    Administrador:{
        type:db.Sequelize.BOOLEAN,
        //allowNull:false,
        //defaultValue: false,
    },
    Estado:{
        type: db.Sequelize.STRING(2),
        //allowNull:true,
    },
    Cidade:{
        type: db.Sequelize.STRING(30),
        //allowNull:true,
    },
    Bairro:{
        type: db.Sequelize.STRING(40),
        //allowNull:true,
    },
    Rua:{
        type: db.Sequelize.STRING(50),
        //allowNull:true,
    },
    Numero:{
        type: db.Sequelize.INTEGER,
        //allowNull:true,
    },
    Complemento:{
        type: db.Sequelize.STRING(50),
        //allowNull:true,
    },
    VisibilidadeNome:{
        type: db.Sequelize.ENUM('0','1','2'),
        /*allowNull:false,
        defaultValue:'0',*/
    },
    VisibilidadeEmail:{
        type: db.Sequelize.ENUM('0','1','2'),
        /*allowNull:false,
        defaultValue:'0',*/
    },
    VisibilidadeDataNascimento:{
        type: db.Sequelize.ENUM('0','1','2'),
        /*allowNull:false,
        defaultValue:'0',*/
    },
    VisibilidadeEstado:{
        type: db.Sequelize.ENUM('0','1','2'),
        /*allowNull:false,
        defaultValue:'0',*/
    },
    VisibilidadeCidade:{
        type: db.Sequelize.ENUM('0','1','2'),
        /*allowNull:false,
        defaultValue:'0',*/
    },
    VisibilidadeBairro:{
        type: db.Sequelize.ENUM('0','1','2'),
        /*allowNull:false,
        defaultValue:'0',*/
    },
    VisibilidadeRua:{
        type: db.Sequelize.ENUM('0','1','2'),
        /*allowNull:false,
        defaultValue:'0',*/
    },
    VisibilidadeNumero:{
        type: db.Sequelize.ENUM('0','1','2'),
        /*allowNull:false,
        defaultValue:'0',*/
    },
    VisibilidadeComplemento:{
        type: db.Sequelize.ENUM('0','1','2'),
        /*allowNull:false,
        defaultValue:'0',*/
    },
    Disponivel:{
        type: db.Sequelize.BOOLEAN,
        /*allowNull:false,
        default:true,*/
    }
},{
    freezeTableName: true,
    timestamps: false,
    createdAt: false,
    updatedAt: false,
});

module.exports = Cliente