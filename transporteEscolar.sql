/* tabela de antes 
CREATE DATABASE transporteEscolar;
USE transporteEscolar;
-- drop database transporteescolar;
-- tabela p o login
CREATE TABLE usuarios (
    cpf VARCHAR(11) NOT NULL PRIMARY KEY,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    tipo ENUM('administrador', 'motorista', 'aluno', 'responsavel') NOT NULL
);

-- motoristas
CREATE TABLE motoristas (
    cpf VARCHAR(11) NOT NULL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    cnh VARCHAR(20) NOT NULL,
    telefone VARCHAR(20) NOT NULL,
    vencimento_habilitacao DATE NOT NULL,
    email VARCHAR(100) NOT NULL
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

CREATE TABLE veiculos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    placa VARCHAR(10) UNIQUE NOT NULL,
    capacidade INT NOT NULL,
    motorista_cpf VARCHAR(11),
    FOREIGN KEY (motorista_cpf) REFERENCES motoristas(cpf) ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE TABLE viagens (
    id INT PRIMARY KEY AUTO_INCREMENT,
    veiculo_id INT NOT NULL,
    data_viagem DATE NOT NULL,
    hora_saida TIME NOT NULL,
    hora_chegada_prevista TIME NOT NULL,
    ponto_inicial_tipo ENUM('ponto_embarque', 'escola') NOT NULL,
    ponto_inicial_id INT NOT NULL,
    ponto_final_tipo ENUM('ponto_embarque', 'escola') NOT NULL,
    ponto_final_id INT NOT NULL,
    tipo_viagem ENUM('ida', 'volta') NOT NULL,
    status ENUM('agendada', 'em_andamento', 'concluida', 'cancelada') DEFAULT 'agendada',
    tempo_estimado_viagem INT,
    FOREIGN KEY (veiculo_id) REFERENCES veiculos(id)
);

CREATE TABLE alunos (
    email VARCHAR(100) NOT NULL PRIMARY KEY,
    nomeCompleto VARCHAR(100) NOT NULL,
    telefonePrinc VARCHAR(9) NOT NULL,
    emailPessoal VARCHAR(100) NOT NULL,
    idade int not null,
    endereco varchar(200) not null,
    -- dados da escola
    escola_id INT NOT NULL,
    nomeEscola VARCHAR(100) NOT NULL,
    enderecoEscola VARCHAR(255) NOT NULL,
    -- dados de seu ponto de embarque
    ponto_embarque_id INT NOT NULL,
    ponto_embarque_nome varchar(100) not null,
    ponto_embarque_endereco varchar(200) not null,
    -- chaves secundarias
    veiculo_id INT NOT NULL,
    viagem_id int not null,
    FOREIGN KEY (veiculo_id) REFERENCES veiculos(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (escola_id) REFERENCES escolas(id) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (viagem_id) REFERENCES viagens(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (ponto_embarque_id) REFERENCES pontos_embarque(id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- preenche nome e endereço das escolas e os pontos de embarque baseados no id
DELIMITER $$

CREATE TRIGGER preencher_dados_aluno
BEFORE INSERT ON alunos
FOR EACH ROW
BEGIN
  DECLARE v_nomeEscola VARCHAR(255);
  DECLARE v_enderecoEscola TEXT;
  DECLARE v_nomePonto VARCHAR(255);
  DECLARE v_enderecoPonto VARCHAR(255);

  SELECT nome, endereco INTO v_nomeEscola, v_enderecoEscola
  FROM escolas
  WHERE id = NEW.escola_id;

  SELECT nome, endereco INTO v_nomePonto, v_enderecoPonto
  FROM pontos_embarque
  WHERE id = NEW.ponto_embarque_id;

  SET NEW.nomeEscola = v_nomeEscola;
  SET NEW.enderecoEscola = v_enderecoEscola;
  SET NEW.ponto_embarque_nome = v_nomePonto;
  SET NEW.ponto_embarque_endereco = v_enderecoPonto;
END $$

DELIMITER ;


INSERT INTO usuarios (cpf, email, senha, tipo) VALUES
('11111111111', 'julia@gmail.com', 'julia@adm', 'administrador'),
('22222222222', 'lorena@gmail.com', 'lorena@adm', 'administrador'),
('33333333333', 'maria@gmail.com', 'maria@adm', 'administrador'),
('13131313131', 'teste@gmail.com', 'teste@adm', 'administrador'),
('55555555555', 'ana@gmail.com', 'ana@motorista', 'motorista'),
('66666666666', 'marcos@gmail.com', 'marcos@motorista', 'motorista'),
('77777777777', 'fernanda@gmail.com', 'fernanda@motorista', 'motorista'),
('12345678901', 'carlos@gmail.com', 'carlos@motorista', 'motorista'),
('88888888888', 'roberto@al.gov.br', 'roberto@aluno', 'aluno'),
('99999999999', 'beatriz@al.gov.br', 'beatriz@aluno', 'aluno'),
('10101010101', 'marcos@al.gov.br', 'marcos@aluno', 'aluno'),
('80080808080', 'responsavel@email.com', 'responsavel', 'responsavel');

INSERT INTO motoristas (cpf, nome, cnh, telefone, vencimento_habilitacao, email) VALUES
('55555555555', 'Ana Souza', '1234567890', '11999999999', '2026-05-15', 'ana@gmail.com'),
('66666666666', 'Marcos Silva', '0987654321', '11988888888', '2025-07-20', 'marcos@gmail.com'),
('77777777777', 'Fernanda Oliveira', '5678901234', '11977777777', '2027-09-10', 'fernanda@gmail.com'),
('12345678901', 'Carlos Mendes', '3456789012', '11966666666', '2028-03-12', 'carlos@gmail.com');

insert into escolas(nome, endereco, latitude, longitude) value
('Cemei Edna Cassiano', 'R. Mal. Deodoro da Fonseca - Monte Azul Paulista, SP, 14730-000', -20.9070, -48.6392),
('Emef Professora Alzira de Freitas Casseb', 'R. Ardelino Vidoti - São francisco, Monte Azul Paulista - SP, 14730-000', -20.9179, -48.6376),
('Colégio Alternativo de Educação Infantil e Ensino Fund.', 'R. Floriano Peixoto, 520 - Centro, Monte Azul Paulista - SP, 14730-000', -20.9041, -48.6366),
('EE Professora Nena Giannasi Buck', 'Praça Sebastião Baraldi, 25 - Centro, Monte Azul Paulista - SP, 14730-000', -20.9010, -48.6449),
('Espaço Livre Escola de Educação Infantil e Ensino Fund.', 'Rua Elizeu Barato, 220 - Residencial Pajussara, Monte Azul Paulista - SP, 14730-000', -20.8974, -48.6355),
('EE Bairro Cruzeiro', 'R. Santos Dumont, 535 - Cruzeiro, Monte Azul Paulista - SP, 14730-000', -20.9127, -48.6429),
('Escola Municipal Sossego da Mamae Creche Municipal', 'Av. Liscano Coelho Blanco, 1235 - Jardim São Elipe, Monte Azul Paulista - SP, 14730-000', -20.9087, -48.6521),
('Centro Educacional Municipal Minhocao', 'R. Campos Salles, 115 - Monte Azul Paulista, SP, 14730-000', -20.9095, -48.6388);

INSERT INTO veiculos (placa, capacidade, motorista_cpf) VALUES
('ABC-1234', 40, '55555555555'),
('DEF-5678', 40, '66666666666'),
('GHI-9012', 40, '77777777777'),
('JKL-3456', 40, '12345678901');

INSERT INTO pontos_embarque (nome, endereco, latitude, longitude) VALUES
('Praça Barão do Rio Branco', 'Praça Rio Branco, 75 - Monte Azul Paulista, SP, 14730-000', -20.9068, -48.6413),
('Rua Cristóvão Colombo', 'R. Cristóvão Colombo, 228 - Monte Azul Paulista, SP, 14730-000', -20.9022, -48.6420),
('Avenida Theodoro Rodas', 'Av. Teodoro Rodas, 50 - Monte Azul Paulista, SP, 14730-000', -20.8966, -48.6357),
('Rua Quintino Bocaiuva', 'R. Quintino Bocaiuva, 159 - Centro, Monte Azul Paulista - SP, 14730-000', -20.9086, -48.6398),
('R. Sebastião de Souza Lima', 'R. Sebastião de Souza Lima, 110 - Monte Azul Paulista, SP, 14730-000', -20.9090, -48.6412),
('R. Líbero Badaró, 377', 'R. Líbero Badaró, 377-271 - Monte Azul Paulista, SP, 14730-000', -20.9065, -48.6453),
('R. Waldomiro Wohnrath, 230', 'R. Waldomiro Wohnrath, 2-230 - Monte Azul Paulista, SP, 14730-000', -20.9019, -48.6475),
('R. Machado Morales, 70', 'R. Machado Morales, 2-70 - Monte Azul Paulista, SP, 14730-000', -20.9185, -48.6352);

INSERT INTO viagens (veiculo_id, data_viagem, hora_saida, hora_chegada_prevista, ponto_inicial_tipo, ponto_inicial_id, ponto_final_tipo, ponto_final_id, tipo_viagem, status, tempo_estimado_viagem) VALUES
# ONIBUS 1
(1, CURDATE(), '07:00:00', '08:45:00', 'ponto_embarque', 1, 'escola', 6, 'ida', 'agendada', 105),
(1, CURDATE(), '07:00:00', '08:45:00', 'ponto_embarque', 2, 'escola', 8, 'ida', 'agendada', 105),
(1, CURDATE(), '13:00:00', '14:45:00', 'ponto_embarque', 1, 'escola', 6, 'ida', 'agendada', 105),
(1, CURDATE(), '13:00:00', '14:45:00', 'ponto_embarque', 2, 'escola', 8, 'ida', 'agendada', 105),
(1, CURDATE(), '14:50:00', '16:00:00', 'escola', 6, 'ponto_embarque', 1, 'volta', 'agendada', 70),
(1, CURDATE(), '14:50:00', '16:00:00', 'escola', 8, 'ponto_embarque', 2, 'volta', 'agendada', 70),
(1, CURDATE(), '17:30:00', '19:00:00', 'escola', 6, 'ponto_embarque', 1, 'volta', 'agendada', 90),
(1, CURDATE(), '17:30:00', '19:00:00', 'escola', 8, 'ponto_embarque', 2, 'volta', 'agendada', 90),
# ONIBUS 2
(2, CURDATE(), '07:00:00', '08:45:00', 'ponto_embarque', 3, 'escola', 1, 'ida', 'agendada', 105),
(2, CURDATE(), '07:00:00', '08:45:00', 'ponto_embarque', 4, 'escola', 2, 'ida', 'agendada', 105),
(2, CURDATE(), '13:00:00', '14:45:00', 'ponto_embarque', 3, 'escola', 1, 'ida', 'agendada', 105),
(2, CURDATE(), '13:00:00', '14:45:00', 'ponto_embarque', 4, 'escola', 2, 'ida', 'agendada', 105),
(2, CURDATE(), '14:50:00', '16:00:00', 'escola', 1, 'ponto_embarque', 3, 'volta', 'agendada', 70),
(2, CURDATE(), '14:50:00', '16:00:00', 'escola', 2, 'ponto_embarque', 4, 'volta', 'agendada', 70),
(2, CURDATE(), '17:30:00', '19:00:00', 'escola', 1, 'ponto_embarque', 3, 'volta', 'agendada', 90),
(2, CURDATE(), '17:30:00', '19:00:00', 'escola', 2, 'ponto_embarque', 4, 'volta', 'agendada', 90),
# ONIBUS 3
(3, CURDATE(), '07:00:00', '08:45:00', 'ponto_embarque', 5, 'escola', 3, 'ida', 'agendada', 105),
(3, CURDATE(), '07:00:00', '08:45:00', 'ponto_embarque', 6, 'escola', 4, 'ida', 'agendada', 105),
(3, CURDATE(), '13:00:00', '14:45:00', 'ponto_embarque', 5, 'escola', 3, 'ida', 'agendada', 105),
(3, CURDATE(), '13:00:00', '14:45:00', 'ponto_embarque', 6, 'escola', 4, 'ida', 'agendada', 105),
(3, CURDATE(), '14:50:00', '16:00:00', 'escola', 3, 'ponto_embarque', 5, 'volta', 'agendada', 70),
(3, CURDATE(), '14:50:00', '16:00:00', 'escola', 4, 'ponto_embarque', 6, 'volta', 'agendada', 70),
(3, CURDATE(), '17:30:00', '19:00:00', 'escola', 3, 'ponto_embarque', 5, 'volta', 'agendada', 90),
(3, CURDATE(), '17:30:00', '19:00:00', 'escola', 4, 'ponto_embarque', 6, 'volta', 'agendada', 90),
# ONIBUS 4
(4, CURDATE(), '07:00:00', '08:45:00', 'ponto_embarque', 7, 'escola', 5, 'ida', 'agendada', 105),
(4, CURDATE(), '07:00:00', '08:45:00', 'ponto_embarque', 8, 'escola', 7, 'ida', 'agendada', 105),
(4, CURDATE(), '13:00:00', '14:45:00', 'ponto_embarque', 7, 'escola', 5, 'ida', 'agendada', 105),
(4, CURDATE(), '13:00:00', '14:45:00', 'ponto_embarque', 8, 'escola', 7, 'ida', 'agendada', 105),
(4, CURDATE(), '14:50:00', '16:00:00', 'escola', 5, 'ponto_embarque', 7, 'volta', 'agendada', 70),
(4, CURDATE(), '14:50:00', '16:00:00', 'escola', 7, 'ponto_embarque', 8, 'volta', 'agendada', 70),
(4, CURDATE(), '17:30:00', '19:00:00', 'escola', 5, 'ponto_embarque', 7, 'volta', 'agendada', 90),
(4, CURDATE(), '17:30:00', '19:00:00', 'escola', 7, 'ponto_embarque', 8, 'volta', 'agendada', 90);

INSERT INTO alunos (email, nomeCompleto, telefonePrinc, emailPessoal, idade, endereco, escola_id, ponto_embarque_id, veiculo_id, viagem_id) VALUES
('roberto@al.gov.br', 'Roberto Alves Costa', '969903253', 'roberto_costa@gmail.com', 15, 'Rua tal', 6, 1, 1, 1),
('beatriz@al.gov.br', 'Beatriz Sousa Garcia', '929076857', 'beatrizgarcia2010@gmail.com', 14, 'Rua X', 5, 2, 2, 2),
('marcos@al.gov.br', 'Marcos Correia', '956435985', 'marcos_correia@gmail.com', 13, 'Rua Y', 1, 3, 3, 3),
('ana.julia@al.gov.br', 'Ana Julia Oliveira', '987654321', 'ana.j.oliveira@hotmail.com', 7, 'Rua Z', 1, 4, 1, 1),
('carlos.eduardo@al.gov.br', 'Carlos Eduardo Pereira', '998877665', 'cadu_pereira@gmail.com.br', 9, 'Rua W', 2, 5, 1, 1),
('beatriz.santos@al.gov.br', 'Beatriz Santos Lima', '912345678', 'bia_lima_santos@outlook.com', 12, 'Rua A', 4, 6, 1, 1),
('lucas.mendes@al.gov.br', 'Lucas Mendes Ferreira', '955554444', 'lucas.ferreira.m@gmail.com', 13, 'Rua B', 6, 7, 1, 1),
('fernanda.almeida@al.gov.br', 'Fernanda Almeida Goncalves', '943218765', 'fernanda_goncalves@outlook.com', 12, 'Rua C', 6, 8, 1, 1),
('gustavo.ribeiro@al.gov.br', 'Gustavo Ribeiro Azevedo', '988881111', 'guga_ribeiro@icloud.com', 10, 'Rua D', 8, 1, 2, 2),
('mariana.souza@al.gov.br', 'Mariana Souza Carvalho', '977772222', 'mari_carvalho88@gmail.com', 13, 'Rua E', 5, 2, 2, 2);
*/

CREATE DATABASE transporteEscolar;
USE transporteEscolar;
-- drop database transporteescolar;

/*
-- tabela p o login
CREATE TABLE usuarios (
	id int not null auto_increment primary key,
    cpf VARCHAR(11) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    tipo ENUM('administrador', 'motorista', 'aluno', 'responsavel') NOT NULL
); */

CREATE TABLE adm (
	id int not null auto_increment primary key,
    cpf VARCHAR(11) NOT NULL unique,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL
);

CREATE TABLE motoristas (
	id int not null auto_increment primary key,
    cpf VARCHAR(11) NOT NULL unique,
    nome VARCHAR(100) NOT NULL,
    cnh VARCHAR(20) NOT NULL,
    telefone VARCHAR(20) NOT NULL,
    vencimento_habilitacao DATE NOT NULL,
    email VARCHAR(100) NOT NULL,
    senha varchar(100) not null
);

CREATE TABLE responsaveis (
	id int not null auto_increment primary key,
    cpf VARCHAR(11) NOT NULL unique,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    telefone VARCHAR(20)
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

CREATE TABLE veiculos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    placa VARCHAR(10) UNIQUE NOT NULL,
    capacidade INT NOT NULL,
    motorista_cpf VARCHAR(11),
    FOREIGN KEY (motorista_cpf) REFERENCES motoristas(cpf) ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE TABLE viagens (
    id INT PRIMARY KEY AUTO_INCREMENT,
    veiculo_id INT NOT NULL,
    data_viagem DATE NOT NULL,
    hora_saida TIME NOT NULL,
    hora_chegada_prevista TIME NOT NULL,
    ponto_inicial_tipo ENUM('ponto_embarque', 'escola') NOT NULL,
    ponto_inicial_id INT NOT NULL,
    ponto_final_tipo ENUM('ponto_embarque', 'escola') NOT NULL,
    ponto_final_id INT NOT NULL,
    tipo_viagem ENUM('ida', 'volta') NOT NULL,
    status ENUM('agendada', 'em_andamento', 'concluida', 'cancelada') DEFAULT 'agendada',
    tempo_estimado_viagem INT,
    FOREIGN KEY (veiculo_id) REFERENCES veiculos(id)
);

CREATE TABLE alunos (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    email varchar(100) not null unique,
    nomeCompleto varchar(100) not null,
    telefonePrinc VARCHAR(9) NOT NULL,
    emailPessoal VARCHAR(100) NOT NULL,
    idade INT NOT NULL,
    endereco VARCHAR(200) NOT NULL,
    senha VARCHAR(255) NOT NULL,
    escola_id INT NOT NULL,
    ponto_embarque_id INT NOT NULL,
    veiculo_id INT NOT NULL,
    viagem_id INT NOT NULL,
    FOREIGN KEY (escola_id) REFERENCES escolas(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (ponto_embarque_id) REFERENCES pontos_embarque(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (veiculo_id) REFERENCES veiculos(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (viagem_id) REFERENCES viagens(id) ON DELETE CASCADE ON UPDATE CASCADE
);

/*
INSERT INTO usuarios (cpf, email, senha, tipo) VALUES
('11111111111', 'julia@gmail.com', 'julia@adm', 'administrador'),
('22222222222', 'lorena@gmail.com', 'lorena@adm', 'administrador'),
('33333333333', 'maria@gmail.com', 'maria@adm', 'administrador'),
('13131313131', 'teste@gmail.com', 'teste@adm', 'administrador'),
('55555555555', 'ana@gmail.com', 'ana@motorista', 'motorista'),
('66666666666', 'marcos@gmail.com', 'marcos@motorista', 'motorista'),
('77777777777', 'fernanda@gmail.com', 'fernanda@motorista', 'motorista'),
('12345678901', 'carlos@gmail.com', 'carlos@motorista', 'motorista'),
('88888888888', 'roberto@al.gov.br', 'roberto@aluno', 'aluno'),
('99999999999', 'beatriz@al.gov.br', 'beatriz@aluno', 'aluno'),
('10101010101', 'marcos@al.gov.br', 'marcos@aluno', 'aluno'),
('12121212121', 'ana.julia@al.gov.br', 'ana@aluno', 'aluno'),
('13313131131', 'carlos.eduardo@al.gov.br', 'carlos@aluno', 'aluno'),
('14141414414', 'beatriz.santos@al.gov.br', 'beatriz@aluno', 'aluno'),
('15151551515', 'lucas.mendes@al.gov.br', 'lucas@aluno', 'aluno'),
('16161661616', 'fernanda.almeida@al.gov.br', 'fernanda@aluno', 'aluno'),
('17171771717', 'gustavo.ribeiro@al.gov.br', 'gustavo@aluno', 'aluno'),
('18181818181', 'mariana.souza@al.gov.br', 'mariana@aluno', 'aluno'),
('80080808080', 'responsavel@email.com', 'responsavel', 'responsavel');
*/

INSERT INTO motoristas (cpf, nome, cnh, telefone, vencimento_habilitacao, email, senha) VALUES
('55555555555', 'Ana Souza', '1234567890', '11999999999', '2026-05-15', 'ana@gmail.com', 'ana@motorista'),
('66666666666', 'Marcos Silva', '0987654321', '11988888888', '2025-07-20', 'marcos@gmail.com', 'marcos@motorista'),
('77777777777', 'Fernanda Oliveira', '5678901234', '11977777777', '2027-09-10', 'fernanda@gmail.com', 'fernanda@motorista'),
('12345678901', 'Carlos Mendes', '3456789012', '11966666666', '2028-03-12', 'carlos@gmail.com', 'carlos@motorista');

INSERT INTO adm (cpf, nome, email, senha) VALUES
('11111111111', 'Julia', 'julia@gmail.com', 'julia@adm'),
('22222222222', 'Lorena', 'lorena@gmail.com', 'lorena@adm'),
('33333333333', 'Maria', 'maria@gmail.com', 'maria@adm'),
('13131313131', 'Teste', 'teste@gmail.com', 'teste@adm');

INSERT INTO responsaveis (cpf, nome, email, senha, telefone) VALUES
('80080808080', 'Responsável Genérico', 'responsavel@email.com', 'responsavel', '11912345678');

insert into escolas(nome, endereco, latitude, longitude) value
('Cemei Edna Cassiano', 'R. Mal. Deodoro da Fonseca - Monte Azul Paulista, SP, 14730-000', -20.9070, -48.6392),
('Emef Professora Alzira de Freitas Casseb', 'R. Ardelino Vidoti - São francisco, Monte Azul Paulista - SP, 14730-000', -20.9179, -48.6376),
('Colégio Alternativo de Educação Infantil e Ensino Fund.', 'R. Floriano Peixoto, 520 - Centro, Monte Azul Paulista - SP, 14730-000', -20.9041, -48.6366),
('EE Professora Nena Giannasi Buck', 'Praça Sebastião Baraldi, 25 - Centro, Monte Azul Paulista - SP, 14730-000', -20.9010, -48.6449),
('Espaço Livre Escola de Educação Infantil e Ensino Fund.', 'Rua Elizeu Barato, 220 - Residencial Pajussara, Monte Azul Paulista - SP, 14730-000', -20.8974, -48.6355),
('EE Bairro Cruzeiro', 'R. Santos Dumont, 535 - Cruzeiro, Monte Azul Paulista - SP, 14730-000', -20.9127, -48.6429),
('Escola Municipal Sossego da Mamae Creche Municipal', 'Av. Liscano Coelho Blanco, 1235 - Jardim São Elipe, Monte Azul Paulista - SP, 14730-000', -20.9087, -48.6521),
('Centro Educacional Municipal Minhocao', 'R. Campos Salles, 115 - Monte Azul Paulista, SP, 14730-000', -20.9095, -48.6388);

INSERT INTO veiculos (placa, capacidade, motorista_cpf) VALUES
('ABC-1234', 40, '55555555555'),
('DEF-5678', 40, '66666666666'),
('GHI-9012', 40, '77777777777'),
('JKL-3456', 40, '12345678901');

INSERT INTO pontos_embarque (nome, endereco, latitude, longitude) VALUES
('Praça Barão do Rio Branco', 'Praça Rio Branco, 75 - Monte Azul Paulista, SP, 14730-000', -20.9068, -48.6413),
('Rua Cristóvão Colombo', 'R. Cristóvão Colombo, 228 - Monte Azul Paulista, SP, 14730-000', -20.9022, -48.6420),
('Avenida Theodoro Rodas', 'Av. Teodoro Rodas, 50 - Monte Azul Paulista, SP, 14730-000', -20.8966, -48.6357),
('Rua Quintino Bocaiuva', 'R. Quintino Bocaiuva, 159 - Centro, Monte Azul Paulista - SP, 14730-000', -20.9086, -48.6398),
('R. Sebastião de Souza Lima', 'R. Sebastião de Souza Lima, 110 - Monte Azul Paulista, SP, 14730-000', -20.9090, -48.6412),
('R. Líbero Badaró, 377', 'R. Líbero Badaró, 377-271 - Monte Azul Paulista, SP, 14730-000', -20.9065, -48.6453),
('R. Waldomiro Wohnrath, 230', 'R. Waldomiro Wohnrath, 2-230 - Monte Azul Paulista, SP, 14730-000', -20.9019, -48.6475),
('R. Machado Morales, 70', 'R. Machado Morales, 2-70 - Monte Azul Paulista, SP, 14730-000', -20.9185, -48.6352);

INSERT INTO viagens (veiculo_id, data_viagem, hora_saida, hora_chegada_prevista, ponto_inicial_tipo, ponto_inicial_id, ponto_final_tipo, ponto_final_id, tipo_viagem, status, tempo_estimado_viagem) VALUES
# ONIBUS 1
(1, CURDATE(), '07:00:00', '08:45:00', 'ponto_embarque', 1, 'escola', 6, 'ida', 'agendada', 105),
(1, CURDATE(), '07:00:00', '08:45:00', 'ponto_embarque', 2, 'escola', 8, 'ida', 'agendada', 105),
(1, CURDATE(), '13:00:00', '14:45:00', 'ponto_embarque', 1, 'escola', 6, 'ida', 'agendada', 105),
(1, CURDATE(), '13:00:00', '14:45:00', 'ponto_embarque', 2, 'escola', 8, 'ida', 'agendada', 105),
(1, CURDATE(), '14:50:00', '16:00:00', 'escola', 6, 'ponto_embarque', 1, 'volta', 'agendada', 70),
(1, CURDATE(), '14:50:00', '16:00:00', 'escola', 8, 'ponto_embarque', 2, 'volta', 'agendada', 70),
(1, CURDATE(), '17:30:00', '19:00:00', 'escola', 6, 'ponto_embarque', 1, 'volta', 'agendada', 90),
(1, CURDATE(), '17:30:00', '19:00:00', 'escola', 8, 'ponto_embarque', 2, 'volta', 'agendada', 90),
# ONIBUS 2
(2, CURDATE(), '07:00:00', '08:45:00', 'ponto_embarque', 3, 'escola', 1, 'ida', 'agendada', 105),
(2, CURDATE(), '07:00:00', '08:45:00', 'ponto_embarque', 4, 'escola', 2, 'ida', 'agendada', 105),
(2, CURDATE(), '13:00:00', '14:45:00', 'ponto_embarque', 3, 'escola', 1, 'ida', 'agendada', 105),
(2, CURDATE(), '13:00:00', '14:45:00', 'ponto_embarque', 4, 'escola', 2, 'ida', 'agendada', 105),
(2, CURDATE(), '14:50:00', '16:00:00', 'escola', 1, 'ponto_embarque', 3, 'volta', 'agendada', 70),
(2, CURDATE(), '14:50:00', '16:00:00', 'escola', 2, 'ponto_embarque', 4, 'volta', 'agendada', 70),
(2, CURDATE(), '17:30:00', '19:00:00', 'escola', 1, 'ponto_embarque', 3, 'volta', 'agendada', 90),
(2, CURDATE(), '17:30:00', '19:00:00', 'escola', 2, 'ponto_embarque', 4, 'volta', 'agendada', 90),
# ONIBUS 3
(3, CURDATE(), '07:00:00', '08:45:00', 'ponto_embarque', 5, 'escola', 3, 'ida', 'agendada', 105),
(3, CURDATE(), '07:00:00', '08:45:00', 'ponto_embarque', 6, 'escola', 4, 'ida', 'agendada', 105),
(3, CURDATE(), '13:00:00', '14:45:00', 'ponto_embarque', 5, 'escola', 3, 'ida', 'agendada', 105),
(3, CURDATE(), '13:00:00', '14:45:00', 'ponto_embarque', 6, 'escola', 4, 'ida', 'agendada', 105),
(3, CURDATE(), '14:50:00', '16:00:00', 'escola', 3, 'ponto_embarque', 5, 'volta', 'agendada', 70),
(3, CURDATE(), '14:50:00', '16:00:00', 'escola', 4, 'ponto_embarque', 6, 'volta', 'agendada', 70),
(3, CURDATE(), '17:30:00', '19:00:00', 'escola', 3, 'ponto_embarque', 5, 'volta', 'agendada', 90),
(3, CURDATE(), '17:30:00', '19:00:00', 'escola', 4, 'ponto_embarque', 6, 'volta', 'agendada', 90),
# ONIBUS 4
(4, CURDATE(), '07:00:00', '08:45:00', 'ponto_embarque', 7, 'escola', 5, 'ida', 'agendada', 105),
(4, CURDATE(), '07:00:00', '08:45:00', 'ponto_embarque', 8, 'escola', 7, 'ida', 'agendada', 105),
(4, CURDATE(), '13:00:00', '14:45:00', 'ponto_embarque', 7, 'escola', 5, 'ida', 'agendada', 105),
(4, CURDATE(), '13:00:00', '14:45:00', 'ponto_embarque', 8, 'escola', 7, 'ida', 'agendada', 105),
(4, CURDATE(), '14:50:00', '16:00:00', 'escola', 5, 'ponto_embarque', 7, 'volta', 'agendada', 70),
(4, CURDATE(), '14:50:00', '16:00:00', 'escola', 7, 'ponto_embarque', 8, 'volta', 'agendada', 70),
(4, CURDATE(), '17:30:00', '19:00:00', 'escola', 5, 'ponto_embarque', 7, 'volta', 'agendada', 90),
(4, CURDATE(), '17:30:00', '19:00:00', 'escola', 7, 'ponto_embarque', 8, 'volta', 'agendada', 90);

INSERT INTO alunos (email, nomeCompleto, telefonePrinc, emailPessoal, idade, endereco, senha, escola_id, ponto_embarque_id, veiculo_id, viagem_id) VALUES
('roberto@al.gov.br', 'Roberto Alves Costa', '969903253', 'roberto_costa@gmail.com', 15, 'Rua tal', 'roberto@aluno', 6, 1, 1, 1),
('beatriz@al.gov.br', 'Beatriz Sousa Garcia', '929076857', 'beatrizgarcia2010@gmail.com', 14, 'Rua X', 'beatriz@aluno', 5, 2, 2, 2),
('marcos@al.gov.br', 'Marcos Correia', '956435985', 'marcos_correia@gmail.com', 13, 'Rua Y', 'marcos@aluno', 1, 3, 3, 3),
('ana.julia@al.gov.br', 'Ana Julia Oliveira', '987654321', 'ana.j.oliveira@hotmail.com', 7, 'Rua Z', 'ana@aluno', 1, 4, 1, 1),
('carlos.eduardo@al.gov.br', 'Carlos Eduardo Pereira', '998877665', 'cadu_pereira@gmail.com.br', 9, 'Rua W', 'carlos@aluno', 2, 5, 1, 1),
('beatriz.santos@al.gov.br', 'Beatriz Santos Lima', '912345678', 'bia_lima_santos@outlook.com', 12, 'Rua A', 'beatriz@aluno', 4, 6, 1, 1),
('lucas.mendes@al.gov.br', 'Lucas Mendes Ferreira', '955554444', 'lucas.ferreira.m@gmail.com', 13, 'Rua B', 'lucas@aluno', 6, 7, 1, 1),
('fernanda.almeida@al.gov.br', 'Fernanda Almeida Goncalves', '943218765', 'fernanda_goncalves@outlook.com', 12, 'Rua C', 'fernanda@aluno', 6, 8, 1, 1),
('gustavo.ribeiro@al.gov.br', 'Gustavo Ribeiro Azevedo', '988881111', 'guga_ribeiro@icloud.com', 10, 'Rua D', 'gustavo@aluno', 8, 1, 2, 2),
('mariana.souza@al.gov.br', 'Mariana Souza Carvalho', '977772222', 'mari_carvalho88@gmail.com', 13, 'Rua E', 'mariana@aluno', 5, 2, 2, 2);