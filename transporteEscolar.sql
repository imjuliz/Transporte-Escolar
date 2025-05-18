create database transporteEscolar;
use transporteEscolar;

#tabela motoristas
create table motoristas(
cpf VARCHAR(11) NOT NULL PRIMARY KEY,
nome_motorista text not null,
vencimento_habilitacao date not null,
onibus_id int,
email text not null,
senha text not null
);

#tabela da instituição/escola
create table instituicao (
id int not null auto_increment primary key,
nome_instituicao varchar(120) not null,
veiculos_qtd int,
vencimento_contrato date,
senha text not null
);

#tabela responsaveis/professores e etc.
CREATE TABLE responsaveis (
    cpf VARCHAR(11) NOT NULL PRIMARY KEY,
    nome_responsavel TEXT NOT NULL,
    instituicao_id INT,
    telefone VARCHAR(15) NOT NULL,
    email TEXT NOT NULL,
    senha TEXT NOT NULL,
    FOREIGN KEY (instituicao_id) REFERENCES instituicao(id) ON DELETE SET NULL
);

#tabela dos veiculos
CREATE TABLE veiculos (
    id_veiculo INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    motorista_cpf VARCHAR(11),
    fabricacao DATE NOT NULL,
    instituicao_id INT NOT NULL,
    FOREIGN KEY (motorista_cpf) REFERENCES motoristas(cpf) ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY (instituicao_id) REFERENCES instituicao(id) ON DELETE CASCADE ON UPDATE CASCADE
);

#tabela adm
create table adms(
cpf VARCHAR(11) NOT NULL PRIMARY KEY,
senha text not null
);

CREATE TABLE rotas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    origem VARCHAR(255) NOT NULL,
    destino VARCHAR(255) NOT NULL,
    horario TIME NOT NULL,
    veiculo_id INT,
    FOREIGN KEY (veiculo_id) REFERENCES veiculos(id_veiculo)
);

CREATE TABLE usuarios (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    tipo ENUM('administrador', 'motorista', 'aluno', 'responsavel') NOT NULL
);

insert into adms(cpf, senha) values
('11111111111', 'julia@123'), # adm julia
('22222222222', 'lorena@123'), #adm lorena
('33333333333', 'maria@123'); #adm maria