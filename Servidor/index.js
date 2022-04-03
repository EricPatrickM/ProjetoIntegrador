/*
USE ProjetoIntegrador;

CREATE TABLE Estado(
    Nome VARCHAR(30) NOT NULL,
    Sigla VARCHAR(2) NOT NULL,
    CONSTRAINT PkEstado PRIMARY KEY (Sigla)
);

CREATE TABLE Cliente (
    IdCliente INT NOT NULL AUTO_INCREMENT,
    Nome VARCHAR(50),
    Senha VARCHAR(64) NOT NULL,
    Email VARCHAR(50) NOT NULL UNIQUE,
    DataNascimento DATE,
    CodigoAcesso CHAR(64) NOT NULL,
    Administrador BOOLEAN NOT NULL DEFAULT FALSE,
    Estado VARCHAR(2),
    Cidade VARCHAR(40),
    Bairro VARCHAR(40),
    Rua VARCHAR(50),
    Numero SMALLINT,
    Complemento VARCHAR(100),
    VisibilidadeNome ENUM('0', '1', '2') NOT NULL DEFAULT '0',
    VisibilidadeEmail ENUM('0', '1', '2') NOT NULL DEFAULT '0',
    VisibilidadeDataNascimento ENUM('0', '1', '2') NOT NULL DEFAULT '0',
    VisibilidadeEstado ENUM('0', '1', '2') NOT NULL DEFAULT '0',
    VisibilidadeCidade ENUM('0', '1', '2') NOT NULL DEFAULT '0',
    VisibilidadeBairro ENUM('0', '1', '2') NOT NULL DEFAULT '0',
    VisibilidadeRua ENUM('0', '1', '2') NOT NULL DEFAULT '0',
    VisibilidadeNumero ENUM('0', '1', '2') NOT NULL DEFAULT '0',
    VisibilidadeComplemento ENUM('0', '1', '2') NOT NULL DEFAULT '0',
    VisibilidadeNumeroCelular1 ENUM('0', '1', '2') NOT NULL DEFAULT '0',
    VisibilidadeNumeroCelular2 ENUM('0', '1', '2') NOT NULL DEFAULT '0',
    Disponivel BOOLEAN NOT NULL DEFAULT TRUE,

    CONSTRAINT PkCliente PRIMARY KEY (IdCliente),
    CONSTRAINT FkClienteEstado FOREIGN KEY (Estado) 
	REFERENCES Estado(Sigla) ON UPDATE CASCADE ON DELETE CASCADE,
    
    CONSTRAINT LimiteClienteCodigoAcesso CHECK (LENGTH(CodigoAcesso)=64),
    CONSTRAINT LimiteClienteSenha CHECK (LENGTH(Senha)=64),
    CONSTRAINT LimiteClienteNumero CHECK (Numero >= 0)
);

CREATE TABLE TelefoneCliente(
    IdCliente INT NOT NULL,
    NumeroOrdem ENUM('1','2') NOT NULL,
	Numero VARCHAR(16),
    CONSTRAINT PkTelefoneCliente PRIMARY KEY (IdCliente, NumeroOrdem),
    CONSTRAINT FkTelefoneClienteIdCliente FOREIGN KEY (IdCliente)
    REFERENCES Cliente(IdCliente) ON UPDATE CASCADE ON DELETE CASCADE
);


CREATE TABLE Sugestoes (
    IdSugestao int AUTO_INCREMENT NOT NULL,
    Especie VARCHAR(40) NOT NULL,
    Raca VARCHAR(40) NOT NULL,
    CONSTRAINT PkSugestao PRIMARY KEY(IdSugestao)
);

CREATE TABLE Animal(
    IdAnimal INT AUTO_INCREMENT NOT NULL,
    IdCliente INT NOT NULL,
    Especie VARCHAR(50),
    Raca VARCHAR(50),
    Nome VARCHAR(50),
    Cor VARCHAR(30),
    Porte ENUM("Pequeno", "Medio", "Grande"),
    Status ENUM("Padrao","Perdido",),
    DataNascimento Date,
    Valor DOUBLE DEFAULT 0.00,
    Disponivel BOOLEAN NOT NULL DEFAULT TRUE,

    CONSTRAINT LimiteAnimalValor CHECK (Valor >= 0.00),
    CONSTRAINT PkAnimal PRIMARY KEY(IdAnimal),
    CONSTRAINT FkAnimalIdCliente FOREIGN KEY (IdCliente) 
    REFERENCES Cliente(IdCliente) ON UPDATE CASCADE ON DELETE CASCADE
);


CREATE TABLE Loja(
    IdLoja INT AUTO_INCREMENT NOT NULL,
	CNPJ VARCHAR(18) UNIQUE,
	Nome VARCHAR(50),
    IdCliente INT NOT NULL,
    Estado VARCHAR(2),
    Cidade VARCHAR(40),
    Bairro VARCHAR(40),
    Rua VARCHAR(50),
    Numero INT,
    Complemento VARCHAR(100),
    Email VARCHAR(50),
    Descricao VARCHAR(200),
    Disponivel BOOLEAN NOT NULL DEFAULT TRUE,

    CONSTRAINT PkLoja PRIMARY KEY (IdLoja),
    CONSTRAINT FkLojaIdCliente FOREIGN KEY (IdCliente)
    REFERENCES Cliente(IdCliente),
    CONSTRAINT FkLojaSigla FOREIGN KEY (Estado)
    REFERENCES Estado(Sigla) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE AnimalLoja(
    IdAnimal INT AUTO_INCREMENT NOT NULL,
    IdLoja INT NOT NULL,
    Especie VARCHAR(50),
    Raca VARCHAR(50),
    Nome VARCHAR(50),
    Cor VARCHAR(30),
    Porte ENUM("Pequeno", "Medio", "Grande"),
    Status ENUM("Vende-se"),
    DataNascimento Date,
    Valor DOUBLE DEFAULT 0.00,

    CONSTRAINT LimiteAnimalLojaValor CHECK (Valor >= 0.00),
    CONSTRAINT PkAnimalLoja PRIMARY KEY(IdAnimal),
    CONSTRAINT FkAnimalLojaIdCliente FOREIGN KEY (IdLoja) 
    REFERENCES Loja(IdLoja) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE TelefoneLoja(
   IdLoja INT NOT NULL,
   Numero VARCHAR(16),
   NumeroOrdem ENUM('1','2') NOT NULL,
   CONSTRAINT PkImagemLoja PRIMARY KEY (IdLoja, NumeroOrdem),
   CONSTRAINT FkTelefoneLojaIdLoja FOREIGN KEY (IdLoja) 
   REFERENCES Loja(IdLoja) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE Servicos(
    IdServico int AUTO_INCREMENT NOT NULL,
    IdLoja int NOT NULL,
    Tipo VARCHAR(50) NOT NULL,
    Descricao VARCHAR(200),
    Valor DOUBLE DEFAULT NULL,
    CONSTRAINT LimiteServicoValor CHECK (VALOR >= 0.00),
    CONSTRAINT PkServicos PRIMARY KEY (IdServico, IdLoja),
    CONSTRAINT FkServicosIdLoja FOREIGN KEY (IdLoja) 
    REFERENCES Loja(IdLoja) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Produto(
    IdProduto INT AUTO_INCREMENT NOT NULL,
    IdLoja INT NOT NULL,
    Tipo VARCHAR(30),
    Fabricante VARCHAR(50),
    Valor double DEFAULT NULL,
    Nome VARCHAR(50),
    Descricao varchar(200),

    CONSTRAINT LimiteProdutoValor CHECK (VALOR >= 0.00),
    CONSTRAINT PkProduto PRIMARY KEY (IdProduto, IdLoja),
    CONSTRAINT FkProdutoIdLoja FOREIGN KEY(IdLoja)
    REFERENCES Loja(IdLoja) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE Perdido (
    IdAnimal int NOT NULL,
    Estado VARCHAR(2) NOT NULL,
    Cidade VARCHAR(40),
    Bairro VARCHAR(40),
    Rua VARCHAR(50),
    Numero smallint,
    Data Date,

    CONSTRAINT PkPerdido PRIMARY KEY (IdAnimal),
    CONSTRAINT FkPerdidoIdAnimal FOREIGN KEY (IdAnimal)
    REFERENCES Animal(IdAnimal) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT FkPerdidoEstado FOREIGN KEY (Estado)
    REFERENCES Estado(Sigla) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE Denuncia (
    idDenuncia int AUTO_INCREMENT NOT NULL ,
    IdAnimal int,
    IdLoja int,
    IdCliente int,
    Descricao varchar(200),

    CONSTRAINT PkDenuncia PRIMARY KEY (idDenuncia),
    CONSTRAINT FkDenunciaIdAnimal FOREIGN KEY (IdAnimal)
    REFERENCES Animal(IdAnimal) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT FkDenunciaIdLoja FOREIGN KEY (IdLoja)
    REFERENCES Loja(IdLoja) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT FkDenunciaIdCliente FOREIGN KEY (IdCliente)
    REFERENCES Cliente(IdCliente) ON UPDATE CASCADE ON DELETE CASCADE
);

INSERT INTO estado (nome, sigla) 
VALUES
('Acre', 'AC'),
('Alagoas', 'AL'),
('Amazonas', 'AM'),
('Amapá', 'AP'),
('Bahia', 'BA'),
('Ceará', 'CE'),
('Distrito Federal', 'DF'),
('Espírito Santo', 'ES'),
('Goiás', 'GO'),
('Maranhão', 'MA'),
('Minas Gerais', 'MG'),
('Mato Grosso do Sul', 'MS'),
('Mato Grosso', 'MT'),
('Pará', 'PA'),
('Paraíba', 'PB'),
('Pernambuco', 'PE'),
('Piauí', 'PI'),
('Paraná', 'PR'),
('Rio de Janeiro', 'RJ'),
('Rio Grande do Norte', 'RN'),
('Rondônia', 'RO'),
('Roraima', 'RR'),
('Rio Grande do Sul', 'RS'),
('Santa Catarina', 'SC'),
('Sergipe', 'SE'),
('São Paulo', 'SP'),
('Tocantins', 'TO');
*/

/*
--------------------
*Esqueci minha senha
*Upar na nuvem
*Atualizar o github page do projeto
*Denunciar
*Alterar dados da loja
*Alterar dados do servico
*Alterar dados da produto
*Alterar dados do AnimalLoja
*Adicionar animalLoja
*Adicionar loja
*Adicionar servico
*Adicionar produto
*Pegar info animal(mobile)
*Pegar info loja(mobile)
*Pegar pagina produto
*Pegar pagina servico
-------------------------
Popular Banco
Alterar dados do animal
Alterar dados do usuario(ver data vazia e numero da casa)
Adicionar animal

Gerar Codigo de acesso
Desativar Cliente,Loja,Animal
Pegar pagina cliente
Pegar pagina do animal
Pegar pagina da loja
Registar usuario
qrcode
Animal perdido
*/

//EXPRESS
const express = require("express");
const app = express();

//HANDLEBARS
const { engine } = require('express-handlebars');

//BODYPARSER
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

//SHA256


//ROTAS
const Cliente = require('./routes/Cliente');
const Animal = require('./routes/Animal');
//const Loja = require('./routes/Loja');
const Resources = require('./routes/Resources');
const Formulario = require('./routes/Formulario');


//SESSION
    const flash = require('connect-flash');
    const passport = require('passport');
    const session = require('express-session');
    require('./config/auth')(passport);

    function authenticationMiddleware(req, res, next){
        if(req.isAuthenticated()) return next();
        res.redirect(req._parsedOriginalUrl.pathname);
    }
//CONFIGURACAO
    //SESSION
        app.use(session({
            secret: 'teste',
            resave: false,
            saveUninitialized: false,
            cookie:{maxAge:3600000}
        }))
        app.use(passport.initialize())
        app.use(passport.session())
        app.use(flash())
        app.use((req, res, next)=>{
            res.locals.user = req.user || null;
            next();
        })
    //handlebars
        app.use(express.static(__dirname + "/public"))
        app.use(express.json())
        app.use(express.urlencoded({extended:true}))
        app.engine('handlebars', engine({ 
            extname: '.handlebars', 
            defaultLayout: "main",
            helpers:{
                FormIgualEstado: (nome, esperado)=>{
                    if(nome==esperado){
                        return "selected"
                    }
                }
            }
        }));
        app.set('view engine', 'handlebars');
        app.set("views", "./views");
    //express
        const port = 8001;
    //BodyParser
        app.use(bodyParser.urlencoded({extended:false}));
        app.use(bodyParser.json())

        //MIDDLEWARE
    //SESSION
        /*app.use((req, res, next)=>{
            res.locals.success_msg = req.flash('sucess_msg')
            res.locals.error_msg = req.flash("error_msg")
            next();
        })*/
    //VALIDACAO DE FORMULARIO
        
    //AUTENTIFICACAO

    //

//ROTAS PUBLICAS
app.get("/", function(req, res){
    try{
        res.render('Home')
    }catch(e){
        res.render('NotFound', {layout: false});
    }
});

/*app.post('/Denunciar', ()=>{
    try{
        const Denuncia = require("../models/Denuncia");
        Denuncia.create({
            IdAnimal:req.body.IdAnimal,
            IdLoja:req.body.IdLoja,
            IdCliente:req.body.IdCliente,
            Descricao:req.body.Descricao,
        })
    }catch(e){

    }
})*/

//DECLARACAO DAS ROTAS:
    //CLIENTE e login
    app.use('/Cliente', Cliente);
    
    //ANIMAL
    app.use('/Animal', Animal);
    
    //Loja
    //app.use('/Loja', Loja);
    
    //RECURSOS NECESSARIOS
    app.use('/Resources', Resources);

    //FORMULARIOS
    app.use('/Formulario', authenticationMiddleware, Formulario);

app.listen(port, ()=>{
});
