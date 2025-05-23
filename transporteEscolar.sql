create database transporteEscolar;
use transporteEscolar;
drop database transporteEscolar;

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

#tabela dos veiculos
CREATE TABLE veiculos (
    id_veiculo INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    motorista_cpf VARCHAR(11),
    fabricacao DATE NOT NULL,
    # instituicao_id INT NOT NULL,
    FOREIGN KEY (motorista_cpf) REFERENCES motoristas(cpf) ON DELETE SET NULL ON UPDATE CASCADE /*,
    FOREIGN KEY (instituicao_id) REFERENCES instituicao(id) ON DELETE CASCADE ON UPDATE CASCADE*/
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

create table logger(
dataLog datetime,
metodo varchar (300),
url varchar(300)
);

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