create database transporteEscolar;
use transporteEscolar;

# login de motoristas, administradores, alunos e responsaveis
CREATE TABLE usuarios (
    cpf VARCHAR(11) NOT NULL PRIMARY KEY,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    tipo ENUM('administrador', 'motorista', 'aluno', 'responsavel') NOT NULL
);

#tabela motoristas
create table motoristas(
cpf VARCHAR(11) NOT NULL PRIMARY KEY,
nome varchar(100) not null,
cnh varchar(20) not null,
telefone varchar(20) not null,
vencimento_habilitacao date not null,
onibus_id int,
email varchar(100) not null
);

/*
tabela da instituição/escola
create table instituicao (
id int not null auto_increment primary key,
nome_instituicao varchar(120) not null,
veiculos_qtd int,
vencimento_contrato date,
senha text not null
);
*/

#tabela responsaveis
CREATE TABLE responsaveis (
    email VARCHAR(100) NOT NULL PRIMARY KEY,
    nome varchar(100) NOT NULL,
    filhos varchar(100) not null,
    #instituicao_id INT,
    telefone VARCHAR(15) NOT NULL /*,
    FOREIGN KEY (instituicao_id) REFERENCES instituicao(id) ON DELETE SET NULL */
);

/*
tabela dos veiculos
CREATE TABLE veiculos (
    id_veiculo INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    motorista_cpf VARCHAR(11),
    fabricacao DATE NOT NULL,
    # instituicao_id INT NOT NULL,
    FOREIGN KEY (motorista_cpf) REFERENCES motoristas(cpf) ON DELETE SET NULL ON UPDATE CASCADE ,
    FOREIGN KEY (instituicao_id) REFERENCES instituicao(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE rotas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    origem VARCHAR(255) NOT NULL,
    destino VARCHAR(255) NOT NULL,
    horarioOrigem TIME NOT NULL,
    horarioDestino TIME NOT NULL,
    veiculo_id INT,
    FOREIGN KEY (veiculo_id) REFERENCES veiculos(id_veiculo)
);
*/

# inserção de dados nas tabelas 
INSERT INTO usuarios (cpf, email, senha, tipo) VALUES
('11111111111', 'julia@gmail.com', 'julia@adm', 'administrador'),
('22222222222', 'lorena@gmail.com', 'lorena@adm', 'administrador'),
('33333333333', 'maria@gmail.com', 'maria@adm', 'administrador'),
('55555555555', 'ana@gmail.com', 'ana@motorista', 'motorista'),
('66666666666', 'marcos@gmail.com', 'marcos@motorista', 'motorista'),
('77777777777', 'fernanda@gmail.com', 'fernanda@motorista', 'motorista'),
('88888888888', 'roberto@al.gov.br', 'roberto@aluno', 'aluno'),
('99999999999', 'beatriz@al.gov.br', 'beatriz@aluno', 'aluno'),
('10101010101', 'marcos@al.gov.br', 'marcos@aluno', 'aluno');

# rotas e onibus
CREATE TABLE onibus (
    id INT PRIMARY KEY AUTO_INCREMENT,
    placa VARCHAR(10) UNIQUE NOT NULL,
    capacidade INT NOT NULL,
    motorista_cpf INT,
     FOREIGN KEY (motorista_cpf) REFERENCES motoristas(cpf) ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE TABLE pontos_embarque (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    endereco TEXT NOT NULL,
    latitude DECIMAL(9,6) NOT NULL,
    longitude DECIMAL(9,6) NOT NULL
);

CREATE TABLE escolas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    endereco TEXT NOT NULL,
    latitude DECIMAL(9,6) NOT NULL,
    longitude DECIMAL(9,6) NOT NULL
);

CREATE TABLE rotas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    onibus_id INT NOT NULL,
    escola_id INT NOT NULL,
    ponto_embarque_id INT NOT NULL,
    horario_embarque TIME NOT NULL,
    horario_desembarque TIME NOT NULL,
    FOREIGN KEY (onibus_id) REFERENCES onibus(id),
    FOREIGN KEY (escola_id) REFERENCES escolas(id),
    FOREIGN KEY (ponto_embarque_id) REFERENCES pontos_embarque(id)
);

insert into escolas(nome, endereco, latitude, longitude) value
('Cemei Edna Cassiano', 'R. Mal. Deodoro da Fonseca - Monte Azul Paulista, SP, 14730-000', -20.9070, -48.6392),
('Emef Professora Alzira de Freitas Casseb', 'R. Ardelino Vidoti - São francisco, Monte Azul Paulista - SP, 14730-000', -20.9179, -48.6376),
('Colégio Alternativo de Educação Infantil e Ensino Fund.', 'R. Floriano Peixoto, 520 - Centro, Monte Azul Paulista - SP, 14730-000', -20.9041, -48.6366),
('EE Professora Nena Giannasi Buck', 'Praça Sebastião Baraldi, 25 - Centro, Monte Azul Paulista - SP, 14730-000', -20.9010, -48.6449),
('Espaço Livre Escola de Educação Infantil e Ensino Fund.', 'Rua Elizeu Barato, 220 - Residencial Pajussara, Monte Azul Paulista - SP, 14730-000', -20.8974, -48.6355),
('EE Bairro Cruzeiro', 'R. Santos Dumont, 535 - Cruzeiro, Monte Azul Paulista - SP, 14730-000', -20.91276947320103, -48.64293563018136),
('Escola Municipal Sossego da Mamae Creche Municipal', 'Av. Liscano Coelho Blanco, 1235 - Jardim São Elipe, Monte Azul Paulista - SP, 14730-000', -20.9087, -48.6521),
('Centro Educacional Municipal Minhocao', 'R. Campos Salles, 115 - Monte Azul Paulista, SP, 14730-000', -20.9095, -48.6388);

INSERT INTO pontos_embarque (nome, endereco, latitude, longitude) VALUES
('Praça Barão do Rio Branco', 'Praça Rio Branco, 75 - Monte Azul Paulista, SP, 14730-000', -20.906811878497113, -48.64133140134517),
('Rua Cristóvão Colombo', 'R. Cristóvão Colombo, 228 - Monte Azul Paulista, SP, 14730-000', -20.90228073432993, -48.642027603198805),
('Avenida Theodoro Rodas', 'Av. Teodoro Rodas, 50 - Monte Azul Paulista, SP, 14730-000', -20.896688410442877, -48.63572286087119),
('Rua Quintino Bocaiuva', 'R. Quintino Bocaiuva, 159 - Centro, Monte Azul Paulista - SP, 14730-000', -20.908681278583384, -48.63980438785376),
('R. Sebastião de Souza Lima', 'R. Sebastião de Souza Lima, 110 - Monte Azul Paulista, SP, 14730-000', -20.90903957901413, -48.64125292039669),
('R. Líbero Badaró, 377', 'R. Líbero Badaró, 377-271 - Monte Azul Paulista, SP, 14730-000', -20.90651890283922, -48.64534680550859),
('R. Waldomiro Wohnrath, 230', 'R. Waldomiro Wohnrath, 2-230 - Monte Azul Paulista, SP, 14730-000', -20.901914202093067, -48.64759343388823),
('R. Machado Morales, 70', 'R. Machado Morales, 2-70 - Monte Azul Paulista, SP, 14730-000', -20.918534101205456, -48.635203935794515);

INSERT INTO usuarios (cpf, email, senha, tipo) VALUES
('80080808080', 'responsavel@email.com', 'responsavel', 'responsavel');