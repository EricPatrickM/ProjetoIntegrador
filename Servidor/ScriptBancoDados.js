/* 
CREATE DATABASE ProjetoIntegrador;
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
    VisibilidadeNome ENUM('0', '1', '2') NOT NULL DEFAULT '2',
    VisibilidadeEmail ENUM('0', '1', '2') NOT NULL DEFAULT '2',
    VisibilidadeDataNascimento ENUM('0', '1', '2') NOT NULL DEFAULT '2',
    VisibilidadeEstado ENUM('0', '1', '2') NOT NULL DEFAULT '2',
    VisibilidadeCidade ENUM('0', '1', '2') NOT NULL DEFAULT '2',
    VisibilidadeBairro ENUM('0', '1', '2') NOT NULL DEFAULT '2',
    VisibilidadeRua ENUM('0', '1', '2') NOT NULL DEFAULT '2',
    VisibilidadeNumero ENUM('0', '1', '2') NOT NULL DEFAULT '2',
    VisibilidadeComplemento ENUM('0', '1', '2') NOT NULL DEFAULT '2',
    VisibilidadeNumeroCelular1 ENUM('0', '1', '2') NOT NULL DEFAULT '2',
    VisibilidadeNumeroCelular2 ENUM('0', '1', '2') NOT NULL DEFAULT '2',
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

CREATE TABLE Animal(
    IdAnimal INT AUTO_INCREMENT NOT NULL,
    IdCliente INT NOT NULL,
    Especie VARCHAR(50),
    Raca VARCHAR(50),
    Nome VARCHAR(50),
    Cor VARCHAR(30),
    Porte ENUM("Pequeno", "Medio", "Grande"),
    Status ENUM("Padrao","Perdido") DEFAULT "Padrao",
    DataNascimento Date,
    Disponivel BOOLEAN NOT NULL DEFAULT TRUE,

    CONSTRAINT PkAnimal PRIMARY KEY(IdAnimal),
    CONSTRAINT FkAnimalIdCliente FOREIGN KEY (IdCliente) 
    REFERENCES Cliente(IdCliente) ON UPDATE CASCADE ON DELETE CASCADE
);


CREATE TABLE Perdido (
    IdAnimal int NOT NULL,
    Estado VARCHAR(2),
    Cidade VARCHAR(40),
    Bairro VARCHAR(40),
    Rua VARCHAR(50),
    Data Date,
    Recompensa DOUBLE DEFAULT 0.00,

    CONSTRAINT PkPerdido PRIMARY KEY (IdAnimal),
    CONSTRAINT FkPerdidoIdAnimal FOREIGN KEY (IdAnimal)
    REFERENCES Animal(IdAnimal) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT FkPerdidoEstado FOREIGN KEY (Estado)
    REFERENCES Estado(Sigla) ON UPDATE CASCADE ON DELETE CASCADE
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

INSERT INTO Cliente values
(NULL,'Charles Babbage','4bf5122f344554c53bde2ebb8cd2b7e3d1600ad631c385a5d7cce23c7785459a','charles@gmail.com','2000-12-20','148de9c5a7a44d19e56cd9ae1a554bf67847afb0c58f6e12fa29ac7ddfca9940',DEFAULT,'PR','Guarapuava', 'Trianon', 'Saldanha marinho',222, '', '0','0','0','0','0','0','0','0','0','0','0', true),
(NULL,'George Boole','dbc1b4c900ffe48d575b5da5c638040125f65db0fe3e24494b76ea986457d986','george@gmail.com','1990-05-27','65c74c15a686187bb6bbf9958f494fc6b80068034a659a9ad44991b08c58f2d2',DEFAULT,'SC','Florianópolis','Campeche Leste','Rua das corticeiras',105, 'apartamento 1','1','1','1','1','1','1','1','1','1','1','1', true),
(NULL,'John von Neumann','084fed08b978af4d7d196a7446a86b58009e636b611db16211b65a9aadff29c5','john@gmail.com','1995-07-05','cfdd586796da5087f76e66c2d6bc9d4d81310459d56e2bdc04106f287c490e21',DEFAULT,'PA','Belém','Maracagalha', 'Rod. Arthur Bernardes',1050,'', '2','2','2','2','2','2','2','2','2','2','2', true),
(NULL,'Grace Hopper','e52d9c508c502347344d8c07ad91cbd6068afc75ff6292f062a09ca381c89e71','grace@gmail.com','1980-01-08','8478b540f24c0b637ca5ad0a103ae729de41a10637ec328afecdd8b681052158',DEFAULT,'BA','Salvador','', '', NULL, '', '0','0','1', '0','0','0','2','2','0','1','1', true),
(NULL,'Alan Turing','e77b9a9ae9e30b0dbdb6f510a264ef9de781501d7b6b92ae89eb059c5ab743db','alan@gmail.com','1977-02-01','f4bf9f7fcbedaba0392f108c59d8f4a38b3838efb64877380171b54475c2ade8',DEFAULT,'SP','Campinas', '', '', NULL, '', '1', '0','1','2','0','1','2','0','1','2','0', true),
(NULL,'Ada Lovelace','67586e98fad27da0b9968bc039a1ef34c939b9b8e523a8bef89d478608c5ecf6','ada@gmail.com','2002-05-14','3c7334cb1996c6d22018859544dc862656c95c110b497e5c4a2c8f2b5f321ae8',DEFAULT,'RJ','Cabo Frio','','', NULL, '', '0','2','1','0','2','1','0','2','1','0','2', true);

INSERT INTO TelefoneCliente values
(1,'1','(42) 9 9999-9999'),
(1,'2','(41) 9999-9999'),
(2,'1','(43) 9975-9975'),
(2,'2','(55) 9 9999-9999'),
(3,'1','(23) 9999-0000'),
(4,'2','(11) 8432-9999'),
(5,'1','(52) 9 9989-9499'),
(6,'2','(32) 9 9899-7724');

INSERT INTO Animal values
(NULL,'1','Pássaro','Calopsita','Diana','Branca','Pequeno','Perdido','2020-02-02',DEFAULT),
(NULL,'1','Cachorro','Labrador retriever','Harry','Preto','Medio','Perdido','2021-05-12',DEFAULT),
(NULL,'2','Cachorro','Pastor-alemão','Maya','Sable','Pequeno','Perdido','2022-01-01',DEFAULT),
(NULL,'2','Cachorro','Golden retriever','Hermione','Dourado claro','Medio','Padrao','2020-05-12',DEFAULT),
(NULL,'3','Gato','Maine Coon','Gina','Marrom','Medio','Padrao','2020-12-21',DEFAULT),
(NULL,'3','Gato','Gato persa','Percy','Creme','Grande','Padrao','2020-07-22',DEFAULT),
(NULL,'4','Gato','Gato-de-bengala','Wanda','Gelo','Medio','Padrao','2020-01-27',DEFAULT),
(NULL,'5','Cavalo','Quarto de milha','Woody','Baio','Grande','Padrao','2020-02-10',DEFAULT),
(NULL,'6','Pássaro','Arara','Sid','Azul','Grande','Padrao','2019-03-05',DEFAULT),
(NULL,'6','Pássaro','Papagaio','Tony','Verde','Grande','Padrao','2017-07-07',DEFAULT);

INSERT INTO Perdido VALUES
(1,'PR','Guarapuava','Vila Carli','','2022-01-01','100.00'),
(2,'PR','Guarapuava','Vila Bela','','2022-01-01','250.00'),
(3,'PR','Guarapuava','Centro','','2022-01-01','500.00');

*/