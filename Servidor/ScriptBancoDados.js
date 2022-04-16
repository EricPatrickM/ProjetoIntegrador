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
*/