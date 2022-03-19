/*
BANCO DE DADOS
CREATE DATABASE ProjetoIntegrador;
USE ProjetoIntegrador;

CREATE TABLE Estado(
    Nome VARCHAR(30),
    Sigla VARCHAR(2) NOT NULL,
    CONSTRAINT PkEstado PRIMARY KEY (Sigla)
);

CREATE TABLE Cliente (
    IdCliente INT NOT NULL AUTO_INCREMENT,
    Nome VARCHAR(50) NOT NULL,
    Senha VARCHAR(64) NOT NULL,
    Email VARCHAR(50) NOT NULL,
    DataNascimento DATE NOT NULL,
    CodigoAcesso CHAR(64) NOT NULL,
    Administrador BOOLEAN NOT NULL DEFAULT FALSE,
    Estado VARCHAR(2),
    Cidade VARCHAR(30),
    Bairro VARCHAR(40),
    Rua VARCHAR(50),
    Numero SMALLINT,
    Complemento VARCHAR(50),
    VisibilidadeNome ENUM('0', '1', '2') NOT NULL DEFAULT '0',
    VisibilidadeEmail ENUM('0', '1', '2') NOT NULL DEFAULT '0',
    VisibilidadeDataNascimento ENUM('0', '1', '2') NOT NULL DEFAULT '0',
    VisibilidadeEstado ENUM('0', '1', '2') NOT NULL DEFAULT '0',
    VisibilidadeCidade ENUM('0', '1', '2') NOT NULL DEFAULT '0',
    VisibilidadeBairro ENUM('0', '1', '2') NOT NULL DEFAULT '0',
    VisibilidadeRua ENUM('0', '1', '2') NOT NULL DEFAULT '0',
    VisibilidadeNumero ENUM('0', '1', '2') NOT NULL DEFAULT '0',
    VisibilidadeComplemento ENUM('0', '1', '2') NOT NULL DEFAULT '0',
    Disponivel BOOLEAN NOT NULL DEFAULT TRUE,

    CONSTRAINT PkCliente PRIMARY KEY (IdCliente),
    CONSTRAINT FkClienteEstado FOREIGN KEY (Estado) REFERENCES Estado(Sigla),
    CONSTRAINT LimiteClienteCodigoAcesso CHECK (LENGTH(CodigoAcesso)=64),
    CONSTRAINT LimiteClienteSenha CHECK (LENGTH(Senha)=64),
    CONSTRAINT LimiteClienteNumero CHECK (Numero >= 0)
);

CREATE TABLE TelefoneCliente(
    IdCliente INT,
	Numero VARCHAR(15),
    CONSTRAINT PkTelefoneCliente PRIMARY KEY (IdCliente, Numero),
    CONSTRAINT FkTelefoneClienteIdCliente FOREIGN KEY (IdCliente)
    REFERENCES Cliente(IdCliente)
);


CREATE TABLE ImagemCliente(
    NumeroImagem INT AUTO_INCREMENT NOT NULL,
    IdCliente INT NOT NULL,
    PathImagem VARCHAR(40) NOT NULL,
    
    CONSTRAINT PkImagemCliente PRIMARY KEY(NumeroImagem, IdCliente),
    CONSTRAINT FkImagemClienteIdCliente FOREIGN KEY (IdCliente)
    REFERENCES Cliente(IdCliente)
);


CREATE TABLE Sugestoes (
    IdSugestao int AUTO_INCREMENT,
    Especie VARCHAR(40) NOT NULL,
    Raca VARCHAR(40) NOT NULL,
    CONSTRAINT PkSugestao PRIMARY KEY(IdSugestao)
);

CREATE TABLE Animal(
    IdAnimal INT AUTO_INCREMENT NOT NULL,
    idCliente INT NOT NULL,
    Especie VARCHAR(50),
    Raca VARCHAR(50),
    Nome VARCHAR(50),
    Cor VARCHAR(15),
    Porte ENUM("Pequeno", "Medio", "Grande"),
    Status ENUM("Padrao","Perdido","Vende-se"),
    Idade TINYINT,
    Valor DOUBLE DEFAULT 0.00,
    
    CONSTRAINT LimiteAnimalValor CHECK (Valor >= 0.00),
    CONSTRAINT PkAnimal PRIMARY KEY(IdAnimal),
    CONSTRAINT FkAnimalIdCliente FOREIGN KEY (IdCliente) REFERENCES Cliente(IdCliente)
);

CREATE TABLE ImagemAnimal(
	NumeroImagem INT AUTO_INCREMENT,
    IdAnimal INT,
    PathImagem VARCHAR(40),
    CONSTRAINT PkImagemAnimal PRIMARY KEY (NumeroImagem, IdAnimal),
    CONSTRAINT FkImagemAnimalIdAnimal FOREIGN KEY (IdAnimal)
    REFERENCES Animal(IdAnimal)
);

CREATE TABLE Loja(
    IdLoja INT AUTO_INCREMENT NOT NULL,
	CNPJ VARCHAR(18),
	Nome VARCHAR(50),
    IdCliente INT,
    Estado VARCHAR(2),
    Cidade VARCHAR(40),
    Bairro VARCHAR(40),
    Rua VARCHAR(50),
    Numero INT,
    Complemento VARCHAR(100),
    Email VARCHAR(50),
    Descricao VARCHAR(200),

    CONSTRAINT PkLoja PRIMARY KEY (IdLoja),
    CONSTRAINT FkLojaIdCliente FOREIGN KEY (IdCliente)
    REFERENCES Cliente(IdCliente),
    CONSTRAINT FkLojaEstado FOREIGN KEY (Estado)
    REFERENCES Estado(Sigla)
);


CREATE TABLE ImagemLoja(
   NumeroImagem INT AUTO_INCREMENT,
   CNPJ VARCHAR(18),
   PathImagem VARCHAR(40),
   CONSTRAINT PkImagemLoja PRIMARY KEY (NumeroImagem, CNPJ),
   CONSTRAINT FkImagemLojaCNPJ FOREIGN KEY (CNPJ) 
   REFERENCES Loja(CNPJ)
);

CREATE TABLE TelefoneLoja(
   CNPJ VARCHAR(18),
   Numero VARCHAR(15),
   CONSTRAINT PkImagemLoja PRIMARY KEY (CNPJ, Numero),
   CONSTRAINT FkTelefoneLojaCNPJ FOREIGN KEY (CNPJ) 
   REFERENCES Loja(CNPJ)
);

CREATE TABLE Servicos(
   TipoServico VARCHAR(20) NOT NULL,
   CNPJ VARCHAR(18),
   Descricao VARCHAR(200),
   Valor DOUBLE DEFAULT 0.00,
   CONSTRAINT LimiteServicoValor CHECK (VALOR >= 0.00), 
   CONSTRAINT PkServicos PRIMARY KEY (CNPJ, TipoServico),
   CONSTRAINT FkServicosCNPJ FOREIGN KEY (CNPJ) 
   REFERENCES Loja(CNPJ)
);

CREATE TABLE ImagemServico(
    NumeroImagem int AUTO_INCREMENT,
    CNPJ varchar(18),
    TipoServico varchar(20),
    PathImagem varchar(40),
    
    CONSTRAINT FkImagemServicoCNPJ FOREIGN KEY (CNPJ, TipoServico)
    REFERENCES Servicos(CNPJ, TipoServico),
    CONSTRAINT PkImagemProduto PRIMARY KEY (NumeroImagem, CNPJ, TipoServico)
);

CREATE TABLE TipoProduto(
   IdTipo INT NOT NULL AUTO_INCREMENT,
   Nome VARCHAR(40),
   CONSTRAINT PkTipoProdutoIdTipo PRIMARY KEY (IdTipo)
);

CREATE TABLE Produto(
    IdProduto int AUTO_INCREMENT,
    CNPJ VARCHAR(18),
    Tipo VARCHAR(30),
    Fabricante VARCHAR(50),
    Valor double,
    Nome VARCHAR(50),

    CONSTRAINT PkProduto PRIMARY KEY (IdProduto),
    CONSTRAINT FkProdutoCNPJ FOREIGN KEY(CNPJ)
    REFERENCES Loja(CNPJ)
);

CREATE TABLE ImagemProduto(
    NumeroImagem INT,
    IdProduto INT,
    PathImagem VARCHAR(40),
    
    CONSTRAINT FkImagemProdutoIdProduto FOREIGN KEY (IdProduto)
    REFERENCES Produto(IdProduto),
    CONSTRAINT PkImagemProduto PRIMARY KEY (NumeroImagem, IdProduto)
);

CREATE TABLE Perdido (
    IdAnimal INT,
    Estado VARCHAR(2),
    Cidade VARCHAR(30),
    Bairro VARCHAR(30),
    Rua VARCHAR(50),
    Numero int,
    Data Date,

    CONSTRAINT PkPerdido PRIMARY KEY (IdAnimal),
    CONSTRAINT FkPerdidoIdAnimal FOREIGN KEY (IdAnimal)
    REFERENCES Animal(IdAnimal),
    CONSTRAINT FkPerdidoEstado FOREIGN KEY (Estado)
    REFERENCES Estado(Sigla)
);

CREATE TABLE Denuncia (
    idDenuncia int,
    IdAnimal int,
    CNPJ VARCHAR(18),
    IdCliente int,
    Descricao varchar(200),

    CONSTRAINT PkDenuncia PRIMARY KEY (idDenuncia),
    CONSTRAINT FkDenunciaIdAnimal FOREIGN KEY (IdAnimal)
    REFERENCES Animal(IdAnimal),
    CONSTRAINT FkDenunciaIdLoja FOREIGN KEY (CNPJ)
    REFERENCES Loja(CNPJ),
    CONSTRAINT FkDenunciaIdCliente FOREIGN KEY (IdCliente)
    REFERENCES Cliente(IdCliente)
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
USE ProjetoIntegrador;

CREATE TABLE Estado(
    Nome VARCHAR(30),
    Sigla VARCHAR(2) NOT NULL,
    CONSTRAINT PkEstado PRIMARY KEY (Sigla)
);

CREATE TABLE Cliente (
    IdCliente INT NOT NULL AUTO_INCREMENT,
    Nome VARCHAR(50) NOT NULL,
    Senha VARCHAR(64) NOT NULL,
    Email VARCHAR(50) NOT NULL,
    DataNascimento DATE NOT NULL,
    CodigoAcesso CHAR(64) NOT NULL,
    Administrador BOOLEAN NOT NULL DEFAULT FALSE,
    Estado VARCHAR(2),
    Cidade VARCHAR(30),
    Bairro VARCHAR(40),
    Rua VARCHAR(50),
    Numero SMALLINT,
    Complemento VARCHAR(50),
    VisibilidadeNome ENUM('0', '1', '2') NOT NULL DEFAULT '0',
    VisibilidadeEmail ENUM('0', '1', '2') NOT NULL DEFAULT '0',
    VisibilidadeDataNascimento ENUM('0', '1', '2') NOT NULL DEFAULT '0',
    VisibilidadeEstado ENUM('0', '1', '2') NOT NULL DEFAULT '0',
    VisibilidadeCidade ENUM('0', '1', '2') NOT NULL DEFAULT '0',
    VisibilidadeBairro ENUM('0', '1', '2') NOT NULL DEFAULT '0',
    VisibilidadeRua ENUM('0', '1', '2') NOT NULL DEFAULT '0',
    VisibilidadeNumero ENUM('0', '1', '2') NOT NULL DEFAULT '0',
    VisibilidadeComplemento ENUM('0', '1', '2') NOT NULL DEFAULT '0',
    Disponivel BOOLEAN NOT NULL DEFAULT TRUE,

    CONSTRAINT PkCliente PRIMARY KEY (IdCliente),
    CONSTRAINT FkClienteEstado FOREIGN KEY (Estado) REFERENCES Estado(Sigla),
    CONSTRAINT LimiteClienteCodigoAcesso CHECK (LENGTH(CodigoAcesso)=64),
    CONSTRAINT LimiteClienteSenha CHECK (LENGTH(Senha)=64),
    CONSTRAINT LimiteClienteNumero CHECK (Numero >= 0)
);

CREATE TABLE TelefoneCliente(
    IdCliente INT,
	Numero VARCHAR(15),
    CONSTRAINT PkTelefoneCliente PRIMARY KEY (IdCliente, Numero),
    CONSTRAINT FkTelefoneClienteIdCliente FOREIGN KEY (IdCliente)
    REFERENCES Cliente(IdCliente)
);


CREATE TABLE Sugestoes (
    IdSugestao int AUTO_INCREMENT,
    Especie VARCHAR(40) NOT NULL,
    Raca VARCHAR(40) NOT NULL,
    CONSTRAINT PkSugestao PRIMARY KEY(IdSugestao)
);

CREATE TABLE Animal(
    IdAnimal INT AUTO_INCREMENT NOT NULL,
    idCliente INT NOT NULL,
    Especie VARCHAR(50),
    Raca VARCHAR(50),
    Nome VARCHAR(50),
    Cor VARCHAR(15),
    Porte ENUM("Pequeno", "Medio", "Grande"),
    Status ENUM("Padrao","Perdido","Vende-se"),
    Idade TINYINT,
    Valor DOUBLE DEFAULT 0.00,
    
    CONSTRAINT LimiteAnimalValor CHECK (Valor >= 0.00),
    CONSTRAINT PkAnimal PRIMARY KEY(IdAnimal),
    CONSTRAINT FkAnimalIdCliente FOREIGN KEY (IdCliente) REFERENCES Cliente(IdCliente)
);


CREATE TABLE Loja(
    IdLoja INT AUTO_INCREMENT NOT NULL,
	CNPJ VARCHAR(18),
	Nome VARCHAR(50),
    IdCliente INT,
    Estado VARCHAR(2),
    Cidade VARCHAR(40),
    Bairro VARCHAR(40),
    Rua VARCHAR(50),
    Numero INT,
    Complemento VARCHAR(100),
    Email VARCHAR(50),
    Descricao VARCHAR(200),

    CONSTRAINT PkLoja PRIMARY KEY (IdLoja),
    CONSTRAINT FkLojaIdCliente FOREIGN KEY (IdCliente)
    REFERENCES Cliente(IdCliente),
    CONSTRAINT FkLojaEstado FOREIGN KEY (Estado)
    REFERENCES Estado(Sigla)
);

CREATE TABLE TelefoneLoja(
   IdLoja int,
   Numero VARCHAR(15),
   CONSTRAINT PkImagemLoja PRIMARY KEY (IdLoja, Numero),
   CONSTRAINT FkTelefoneLojaCNPJ FOREIGN KEY (IdLoja) 
   REFERENCES Loja(IdLoja)
);

CREATE TABLE Servicos(
   TipoServico VARCHAR(20) NOT NULL,
   IdLoja int,
   Descricao VARCHAR(200),
   Valor DOUBLE DEFAULT 0.00,
   CONSTRAINT LimiteServicoValor CHECK (VALOR >= 0.00), 
   CONSTRAINT PkServicos PRIMARY KEY (IdLoja int, TipoServico),
   CONSTRAINT FkServicosCNPJ FOREIGN KEY (IdLoja int) 
   REFERENCES Loja(IdLoja int)
);

CREATE TABLE TipoProduto(
   IdTipo INT NOT NULL AUTO_INCREMENT,
   Nome VARCHAR(40),
   CONSTRAINT PkTipoProdutoIdTipo PRIMARY KEY (IdTipo)
);

CREATE TABLE Produto(
    IdProduto int AUTO_INCREMENT,
    CNPJ VARCHAR(18),
    Tipo VARCHAR(30),
    Fabricante VARCHAR(50),
    Valor double,
    Nome VARCHAR(50),

    CONSTRAINT PkProduto PRIMARY KEY (IdProduto),
    CONSTRAINT FkProdutoCNPJ FOREIGN KEY(CNPJ)
    REFERENCES Loja(CNPJ)
);

CREATE TABLE Perdido (
    IdAnimal INT,
    Estado VARCHAR(2),
    Cidade VARCHAR(30),
    Bairro VARCHAR(30),
    Rua VARCHAR(50),
    Numero int,
    Data Date,

    CONSTRAINT PkPerdido PRIMARY KEY (IdAnimal),
    CONSTRAINT FkPerdidoIdAnimal FOREIGN KEY (IdAnimal)
    REFERENCES Animal(IdAnimal),
    CONSTRAINT FkPerdidoEstado FOREIGN KEY (Estado)
    REFERENCES Estado(Sigla)
);

CREATE TABLE Denuncia (
    idDenuncia int,
    IdAnimal int,
    IdLoja int,
    IdCliente int,
    Descricao varchar(200),

    CONSTRAINT PkDenuncia PRIMARY KEY (idDenuncia),
    CONSTRAINT FkDenunciaIdAnimal FOREIGN KEY (IdAnimal)
    REFERENCES Animal(IdAnimal),
    CONSTRAINT FkDenunciaIdLoja FOREIGN KEY (IdLoja)
    REFERENCES Loja(IdLoja),
    CONSTRAINT FkDenunciaIdCliente FOREIGN KEY (IdCliente)
    REFERENCES Cliente(IdCliente)
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
Popular Banco
Tela de animais perdidos por cidade
Verificar entrada
Pesquisar produtos disponiveis em uma loja
Animal perdido
Gerar Codigo de acesso
Criar sessao(login)
Barra de pesquisa
*Pegar pagina cliente
*Pegar pagina do animal
pegar pagina da loja
*pegar info cliente(mobile)
pegar info animal(mobile)
pegar info loja(mobile)
Registar usuario
Adicionar animal
Adicionar loja
Adicionar servico
Adicionar produto
Consultar produto
Consultar servico
Denunciar
Alterar dados do usuario
Alterar dados do animal
Alterar dados da loja
Esqueci minha senha
Upar na nuvem
Atualizar o github page do projeto
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

//BANCO MYSQL
const Cliente = require('./models/Cliente');
const Animal = require('./models/Animal');
const Loja = require('./models/Loja');
const Raca = require('./models/Raca');
const Servicos = require('./models/Servicos');
const TelefoneCliente = require('./models/TelefoneCliente');
const TelefoneLoja = require('./models/TelefoneLoja');
const Tipos = require('./models/Tipo');


//SHA256
const crypto = require('crypto');
const { stringify } = require("querystring");
const { type } = require("os");
const { rejects } = require("assert");

//QRCODE
const qr = require('qr-image');
const { Sequelize } = require("./models/db");

//CONFIGURACAO
    //handlebars
        app.engine('handlebars', engine({ extname: '.handlebars', defaultLayout: "main"}));
        app.set('view engine', 'handlebars');
        app.set("views", "./views");
    //express
        const port = 8001;
    //BodyParser
        app.use(bodyParser.urlencoded({extended:false}));
        app.use(bodyParser.json())


//ROTAS:
    app.get("/", function(req, res){
        console.log(req.cookies)
        res.render('Home')
    });


//Registrar
    app.post('/RegistrarEnviar',function(req, res){
        //revisar entrada XSS
        const SenhaCriptografada = req.body.Email + req.body.Senha;
        const DataAtual = new Date();
        const CodigoAcessoCriptografado = req.body.Email+DataAtual.getTime();
        Cliente.create({
            Nome:req.body.Nome,
            Senha:crypto.createHash('sha256').update(SenhaCriptografada).digest('hex'),
            Email:req.body.Email,
            DataNascimento: req.body.DataNascimento,
            //NumeroCelular: req.body.NumeroCelular,
            //VisibilidadeNumeroCelular:req.body.VisibilidadeNumeroCelular,
            CodigoAcesso:crypto.createHash('sha256').update(CodigoAcessoCriptografado).digest('hex'),
            Estado:req.body.Estado,
            Cidade: req.body.Cidade,
            Bairro: req.body.Bairro,
            Rua: req.body.Rua,
            Numero: req.body.Numero,
            Complemento: req.body.Complemento,
            VisibilidadeNome: req.body.VisibilidadeNome,
            VisibilidadeEmail: req.body.VisibilidadeEmail,
            VisibilidadeDataNascimento: req.body.VisibilidadeDataNascimento,
            VisibilidadeEstado: req.body.VisibilidadeEstado,
            VisibilidadeCidade: req.body.VisibilidadeCidade,
            VisibilidadeBairro: req.body.VisibilidadeBairro,
            VisibilidadeRua: req.body.VisibilidadeRua,
            VisibilidadeNumero: req.body.VisibilidadeNumero,
            VisibilidadeComplemento: req.body.VisibilidadeComplemento,
            Disponivel: true,
            }).then(()=> {
                //colocar telefone
            }).catch(()=>{

            }
        );
    });

    app.get('/Registrar',function(req,res){
        res.render('Registrar');
    });


//LOGIN
    app.get('/Login',function(req,res){
        res.render('Login');
    });

    app.get('/MinhaConta',function(req,res){
        res.render('MinhaConta');
    });

//CLIENTE screen and json
    app.get("/Cliente/:IdCliente",function(req, res){
        const IdCliente = parseInt(req.params.IdCliente);
        Cliente.findByPk(IdCliente).then((ResultadoConsulta)=>{
            ResultadoConsulta=FiltrandoTabelaCliente(ResultadoConsulta.dataValues, req.query.CodigoAcesso);
            if(req.query.device=="Mobile"){
                res.json(ResultadoConsulta);
            } else{
                
                res.render("Cliente", ResultadoConsulta);
            }
        }).catch(()=>{
            res.render("NotFound");
        });
    });

    
    app.post("/Registrar", function(req, res){
        
    });
    
    app.post("/ModifyUser",function(req, res){
        
    });

    
    //ANIMAL screen and json
    app.get("/Animal/:AnimalId",function(req, res){
        const AnimalId = parseInt(req.params.AnimalId);
        Animal.findByPk(AnimalId).then((ResultadoConsulta)=>{
            if(req.query.device=="Mobile"){
                res.json(ResultadoConsulta.dataValues);
            } else{
                res.render("Animal", ResultadoConsulta.dataValues);
            }
        }).catch((e)=>{
            console.log(e);
            res.render("NotFound");
        });
    });
    
    
    //Loja
    app.get("/Loja/:LojaId",function(req, res){
        const LojaId = parseInt(req.params.LojaId);
        Loja.findByPk(LojaId).then((ResultadoConsulta)=>{
            if(req.query.device=="Mobile"){
                    res.json(ResultadoConsulta.dataValues);
                } else{
                    res.render("Loja", ResultadoConsulta.dataValues);
                }
            }).catch(()=>{
                res.render("NotFound");
            });
        });
        
        //PRODUTO
        app.get("/Loja/:LojaId/:ProdutoId",function(req, res){
            
        });
        
        //visibilidade 0=publica, 1=somente com codigo de acesso e 2= privado
        function FiltrandoTabelaCliente(ResultadoConsulta, CodigoAcesso){
            if(ResultadoConsulta.VisibilidadeNome==2 || (ResultadoConsulta.VisibilidadeNome==1 && CodigoAcesso!=ResultadoConsulta.CodigoAcesso)){
                ResultadoConsulta.Nome = "PRIVADO";
            }
        if(ResultadoConsulta.VisibilidadeEmail==2 || (ResultadoConsulta.VisibilidadeNome==1 && CodigoAcesso!=ResultadoConsulta.CodigoAcesso)){
            ResultadoConsulta.Email = "PRIVADO";
        }
        if(ResultadoConsulta.VisibilidadeEstado==2 || (ResultadoConsulta.VisibilidadeNome==1 && CodigoAcesso!=ResultadoConsulta.CodigoAcesso)){
            ResultadoConsulta.Estado = "PRIVADO";
        }
        if(ResultadoConsulta.VisibilidadeCidade==2 || (ResultadoConsulta.VisibilidadeNome==1 && CodigoAcesso!=ResultadoConsulta.CodigoAcesso)){
            ResultadoConsulta.Cidade = "PRIVADO";
        }
        if(ResultadoConsulta.VisibilidadeBairro==2 || (ResultadoConsulta.VisibilidadeNome==1 && CodigoAcesso!=ResultadoConsulta.CodigoAcesso)){
            ResultadoConsulta.Bairro = "PRIVADO";
        }
        if(ResultadoConsulta.VisibilidadeRua==2 || (ResultadoConsulta.VisibilidadeNome==1 && CodigoAcesso!=ResultadoConsulta.CodigoAcesso)){
            ResultadoConsulta.Rua = "PRIVADO";
        }
        if(ResultadoConsulta.VisibilidadeNumero==2 || (ResultadoConsulta.VisibilidadeNome==1 && CodigoAcesso!=ResultadoConsulta.CodigoAcesso)){
            ResultadoConsulta.Numero = "PRIVADO";
        }
        if(ResultadoConsulta.VisibilidadeComplemento==2 || (ResultadoConsulta.VisibilidadeNome==1 && CodigoAcesso!=ResultadoConsulta.CodigoAcesso)){
            ResultadoConsulta.Complemento = "PRIVADO";
        }
        
        //delete ResultadoConsulta.IdCliente;
        delete ResultadoConsulta.CodigoAcesso;
        delete ResultadoConsulta.Senha;
        delete ResultadoConsulta.Administrador;
        delete ResultadoConsulta.Disponivel;
        delete ResultadoConsulta.VisibilidadeEmail;
        delete ResultadoConsulta.VisibilidadeBairro;
        delete ResultadoConsulta.VisibilidadeCidade;
        delete ResultadoConsulta.VisibilidadeComplemento;
        delete ResultadoConsulta.VisibilidadeEmail;
        delete ResultadoConsulta.VisibilidadeEstado;
        delete ResultadoConsulta.VisibilidadeNome;
        delete ResultadoConsulta.VisibilidadeDataNascimento;
        delete ResultadoConsulta.VisibilidadeRua;
        delete ResultadoConsulta.VisibilidadeNumero;
        return ResultadoConsulta;
    };
    
    function FiltrarEntrada(parametros){
        
    };

    //RECURSOS NECESSARIOS
        app.get("/QRCode/:IdQRCode",function(req, res){
            const url = "https://www.google.com"
            const code = qr.image(url, {type:'png'})
            res.type('png')
            code.pipe(res)
        });
    
        app.get("/Images/Logo",function(req, res){
            res.sendFile(__dirname + '/views/Images/Logo.png');
        });

        app.get("/Images/Loja",function(req, res){
            res.sendFile(__dirname + '/views/Images/Loja.png');
        });

        app.get("/Images/Usuario",function(req, res){
            res.sendFile(__dirname + '/views/Images/Usuario.png');
        });

        app.get("/Images/Animal",function(req, res){
            res.sendFile(__dirname + '/views/Images/Animal.png');
        });

        app.get("/Images/Produto",function(req, res){
            res.sendFile(__dirname + '/views/Images/Produto.png');
        });

        app.get("/Images/Servico",function(req, res){
            res.sendFile(__dirname + '/views/Images/Servico.png');
        });

        app.get("/Style/Menu",function(req, res){
            res.sendFile(__dirname + '/views/Style/Menu.css');
        });
    app.listen(port, ()=>{
    });