CREATE DATABASE transporteEscolar;
USE transporteEscolar;
-- drop database transporteescolar;

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
    motorista_id int,
    FOREIGN KEY (motorista_id) REFERENCES motoristas(id) ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE TABLE viagens (
    id INT PRIMARY KEY AUTO_INCREMENT,
    veiculo_id INT NOT NULL,
    motorista_id INT NOT NULL,
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
    FOREIGN KEY (veiculo_id) REFERENCES veiculos(id),
    FOREIGN KEY (motorista_id) REFERENCES motoristas(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE alunos (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    cpf VARCHAR(11) not null unique,
    email varchar(100) not null unique,
    nome varchar(100) not null,
    telefonePrinc VARCHAR(9) NOT NULL,
    emailPessoal VARCHAR(100) NOT NULL,
    dataNascimento date NOT NULL,
    senha VARCHAR(255) NOT NULL,
    escola_id INT NOT NULL,
    ponto_embarque_id INT NOT NULL,
    FOREIGN KEY (escola_id) REFERENCES escolas(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (ponto_embarque_id) REFERENCES pontos_embarque(id) ON DELETE CASCADE ON UPDATE CASCADE
);

# tabelas de associações
-- associação entre alunos e seus responsaveis
CREATE TABLE responsaveis_alunos (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    responsavel_id INT NOT NULL,
    aluno_id INT NOT NULL,
    FOREIGN KEY (responsavel_id) REFERENCES responsaveis(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (aluno_id) REFERENCES alunos(id) ON DELETE CASCADE ON UPDATE CASCADE
);

# associação entre escola e ponto de embarque
CREATE TABLE escola_ponto_embarque (
    id INT PRIMARY KEY AUTO_INCREMENT,
    escola_id INT NOT NULL,
    ponto_embarque_id INT NOT NULL,
    FOREIGN KEY (escola_id) REFERENCES escolas(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (ponto_embarque_id) REFERENCES pontos_embarque(id) ON DELETE CASCADE ON UPDATE CASCADE,
    UNIQUE KEY (escola_id, ponto_embarque_id) -- evita duplicações
);

# associação entre os alunos e suas viagens
CREATE TABLE alunos_viagens (
    id INT AUTO_INCREMENT PRIMARY KEY,
    aluno_id INT NOT NULL,
    viagem_id INT NOT NULL,
    FOREIGN KEY (aluno_id) REFERENCES alunos(id) ON DELETE CASCADE,
    FOREIGN KEY (viagem_id) REFERENCES viagens(id) ON DELETE CASCADE
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

alter table motoristas
add status varchar(50);

update motoristas
set status = 'Ativo'
where id<10;

INSERT INTO adm (cpf, nome, email, senha) VALUES
('11111111111', 'Julia', 'julia@gmail.com', 'julia@adm'),
('22222222222', 'Lorena', 'lorena@gmail.com', 'lorena@adm'),
('33333333333', 'Maria', 'maria@gmail.com', 'maria@adm'),
('13131313131', 'Teste', 'teste@gmail.com', 'teste@adm');

INSERT INTO responsaveis (cpf, nome, email, senha, telefone) VALUES
('80011111111', 'Ana Paula Costa', 'ana.costa@email.com', 'ana@responsavel', '11990001111'),
('80022222222', 'Bruno Henrique Lima', 'bruno.lima@email.com', 'bruno@responsavel', '11990002222'),
('80033333333', 'Camila dos Santos', 'camila.santos@email.com', 'camila@responsavel', '11990003333'),
('80044444444', 'Daniel Almeida', 'daniel.almeida@email.com', 'daniel@responsavel', '11990004444'),
('80055555555', 'Eduarda Ribeiro', 'eduarda.ribeiro@email.com', 'eduarda@responsavel', '11990005555'),
('80066666666', 'Felipe Martins', 'felipe.martins@email.com', 'felipe@responsavel', '11990006666'),
('80077777777', 'Gabriela Fernandes', 'gabriela.fernandes@email.com', 'gabriela@responsavel', '11990007777'),
('80088888888', 'Henrique Souza', 'henrique.souza@email.com', 'henrique@responsavel', '11990008888');

insert into escolas(nome, endereco, latitude, longitude) value
('Cemei Edna Cassiano', 'R. Mal. Deodoro da Fonseca - Monte Azul Paulista, SP, 14730-000', -20.9070, -48.6392),
('Emef Professora Alzira de Freitas Casseb', 'R. Ardelino Vidoti - São francisco, Monte Azul Paulista - SP, 14730-000', -20.9179, -48.6376),
('Colégio Alternativo de Educação Infantil e Ensino Fund.', 'R. Floriano Peixoto, 520 - Centro, Monte Azul Paulista - SP, 14730-000', -20.9041, -48.6366),
('EE Professora Nena Giannasi Buck', 'Praça Sebastião Baraldi, 25 - Centro, Monte Azul Paulista - SP, 14730-000', -20.9010, -48.6449),
('Espaço Livre Escola de Educação Infantil e Ensino Fund.', 'Rua Elizeu Barato, 220 - Residencial Pajussara, Monte Azul Paulista - SP, 14730-000', -20.8974, -48.6355),
('EE Bairro Cruzeiro', 'R. Santos Dumont, 535 - Cruzeiro, Monte Azul Paulista - SP, 14730-000', -20.9127, -48.6429),
('Escola Municipal Sossego da Mamae Creche Municipal', 'Av. Liscano Coelho Blanco, 1235 - Jardim São Elipe, Monte Azul Paulista - SP, 14730-000', -20.9087, -48.6521),
('Centro Educacional Municipal Minhocao', 'R. Campos Salles, 115 - Monte Azul Paulista, SP, 14730-000', -20.9095, -48.6388);

INSERT INTO veiculos (placa, capacidade, motorista_id) VALUES
('ABC-1234', 40, '1'),
('DEF-5678', 40, '2'),
('GHI-9012', 40, '3'),
('JKL-3456', 40, '4');

INSERT INTO pontos_embarque (nome, endereco, latitude, longitude) VALUES
('Praça Barão do Rio Branco', 'Praça Rio Branco, 75 - Monte Azul Paulista, SP, 14730-000', -20.9068, -48.6413),
('Rua Cristóvão Colombo', 'R. Cristóvão Colombo, 228 - Monte Azul Paulista, SP, 14730-000', -20.9022, -48.6420),
('Avenida Theodoro Rodas', 'Av. Teodoro Rodas, 50 - Monte Azul Paulista, SP, 14730-000', -20.8966, -48.6357),
('Rua Quintino Bocaiuva', 'R. Quintino Bocaiuva, 159 - Centro, Monte Azul Paulista - SP, 14730-000', -20.9086, -48.6398),
('R. Sebastião de Souza Lima', 'R. Sebastião de Souza Lima, 110 - Monte Azul Paulista, SP, 14730-000', -20.9090, -48.6412),
('R. Líbero Badaró, 377', 'R. Líbero Badaró, 377 - Monte Azul Paulista, SP, 14730-000', -20.9065, -48.6453),
('R. Waldomiro Wohnrath, 230', 'R. Waldomiro Wohnrath, 2-230 - Monte Azul Paulista, SP, 14730-000', -20.9019, -48.6475),
('R. Machado Morales, 70', 'R. Machado Morales, 42 - Monte Azul Paulista, SP, 14730-000', -20.9185, -48.6352);

INSERT INTO viagens (veiculo_id, motorista_id, data_viagem, hora_saida, hora_chegada_prevista, ponto_inicial_tipo, ponto_inicial_id, ponto_final_tipo, ponto_final_id, tipo_viagem, status, tempo_estimado_viagem) VALUES
-- ONIBUS 1
(1, 1, CURDATE(), '06:00:00', '07:00:00', 'ponto_embarque', 1, 'escola', 6, 'ida', 'agendada', 60),
(1, 1, CURDATE(), '07:05:00', '08:00:00', 'ponto_embarque', 2, 'escola', 8, 'ida', 'agendada', 55),
(1, 1, CURDATE(), '08:05:00', '09:00:00', 'escola', 6, 'ponto_embarque', 1, 'volta', 'agendada', 55),
(1, 1, CURDATE(), '09:05:00', '10:00:00', 'escola', 8, 'ponto_embarque', 2, 'volta', 'agendada', 55),
(1, 1, CURDATE(), '10:05:00', '11:00:00', 'ponto_embarque', 1, 'escola', 6, 'ida', 'agendada', 55),
(1, 1, CURDATE(), '11:05:00', '12:00:00', 'ponto_embarque', 2, 'escola', 8, 'ida', 'agendada', 55),
(1, 1, CURDATE(), '12:05:00', '13:00:00', 'escola', 6, 'ponto_embarque', 1, 'volta', 'agendada', 55),
(1, 1, CURDATE(), '13:05:00', '14:00:00', 'escola', 8, 'ponto_embarque', 2, 'volta', 'agendada', 55),
(1, 1, CURDATE(), '14:05:00', '15:00:00', 'ponto_embarque', 1, 'escola', 6, 'ida', 'agendada', 55),
(1, 1, CURDATE(), '15:05:00', '16:00:00', 'ponto_embarque', 2, 'escola', 8, 'ida', 'agendada', 55),
(1, 1, CURDATE(), '13:00:00', '15:00:00', 'escola', 6, 'ponto_embarque', 1, 'volta', 'agendada', 55),
(1, 1, CURDATE(), '16:05:00', '17:00:00', 'escola', 6, 'ponto_embarque', 1, 'volta', 'agendada', 55),
(1, 1, CURDATE(), '17:05:00', '18:00:00', 'escola', 8, 'ponto_embarque', 2, 'volta', 'agendada', 55),
(1, 1, CURDATE(), '18:05:00', '19:00:00', 'ponto_embarque', 1, 'escola', 6, 'ida', 'agendada', 55),
(1, 1, CURDATE(), '15:15:00', '17:30:00', 'escola', 6, 'ponto_embarque', 1, 'volta', 'agendada', 55),
(1, 1, CURDATE(), '19:05:00', '20:00:00', 'ponto_embarque', 2, 'escola', 8, 'ida', 'agendada', 55),
-- ONIBUS 2
(2, 2, CURDATE(), '06:00:00', '07:00:00', 'ponto_embarque', 3, 'escola', 1, 'ida', 'agendada', 60),
(2, 2, CURDATE(), '07:05:00', '08:00:00', 'ponto_embarque', 4, 'escola', 2, 'ida', 'agendada', 55),
(2, 2, CURDATE(), '08:05:00', '09:00:00', 'escola', 1, 'ponto_embarque', 3, 'volta', 'agendada', 55),
(2, 2, CURDATE(), '09:05:00', '10:00:00', 'escola', 2, 'ponto_embarque', 4, 'volta', 'agendada', 55),
(2, 2, CURDATE(), '10:05:00', '11:00:00', 'ponto_embarque', 3, 'escola', 1, 'ida', 'agendada', 55),
(2, 2, CURDATE(), '11:05:00', '12:00:00', 'ponto_embarque', 4, 'escola', 2, 'ida', 'agendada', 55),
(2, 2, CURDATE(), '12:05:00', '13:00:00', 'escola', 1, 'ponto_embarque', 3, 'volta', 'agendada', 55),
(2, 2, CURDATE(), '13:05:00', '14:00:00', 'escola', 2, 'ponto_embarque', 4, 'volta', 'agendada', 55),
(2, 2, CURDATE(), '14:05:00', '15:00:00', 'ponto_embarque', 3, 'escola', 1, 'ida', 'agendada', 55),
(2, 2, CURDATE(), '15:05:00', '16:00:00', 'ponto_embarque', 4, 'escola', 2, 'ida', 'agendada', 55),
(2, 2, CURDATE(), '16:05:00', '17:00:00', 'escola', 1, 'ponto_embarque', 3, 'volta', 'agendada', 55),
(2, 2, CURDATE(), '17:05:00', '18:00:00', 'escola', 2, 'ponto_embarque', 4, 'volta', 'agendada', 55),
(2, 2, CURDATE(), '18:05:00', '19:00:00', 'ponto_embarque', 3, 'escola', 1, 'ida', 'agendada', 55),
(2, 2, CURDATE(), '19:05:00', '20:00:00', 'ponto_embarque', 4, 'escola', 2, 'ida', 'agendada', 55),
(2, 2, CURDATE(), '20:05:00', '21:00:00', 'escola', 1, 'ponto_embarque', 3, 'volta', 'agendada', 55),
(2, 2, CURDATE(), '21:05:00', '22:00:00', 'escola', 2, 'ponto_embarque', 4, 'volta', 'agendada', 55),
-- ONIBUS 3
(3, 3, CURDATE(), '06:00:00', '07:00:00', 'ponto_embarque', 5, 'escola', 3, 'ida', 'agendada', 60),
(3, 3, CURDATE(), '07:05:00', '08:00:00', 'ponto_embarque', 6, 'escola', 4, 'ida', 'agendada', 55),
(3, 3, CURDATE(), '08:05:00', '09:00:00', 'escola', 3, 'ponto_embarque', 5, 'volta', 'agendada', 55),
(3, 3, CURDATE(), '09:05:00', '10:00:00', 'escola', 4, 'ponto_embarque', 6, 'volta', 'agendada', 55),
(3, 3, CURDATE(), '10:05:00', '11:00:00', 'ponto_embarque', 5, 'escola', 3, 'ida', 'agendada', 55),
(3, 3, CURDATE(), '11:05:00', '12:00:00', 'ponto_embarque', 6, 'escola', 4, 'ida', 'agendada', 55),
(3, 3, CURDATE(), '12:05:00', '13:00:00', 'escola', 3, 'ponto_embarque', 5, 'volta', 'agendada', 55),
(3, 3, CURDATE(), '13:05:00', '14:00:00', 'escola', 4, 'ponto_embarque', 6, 'volta', 'agendada', 55),
(3, 3, CURDATE(), '14:05:00', '15:00:00', 'ponto_embarque', 5, 'escola', 3, 'ida', 'agendada', 55),
(3, 3, CURDATE(), '15:05:00', '16:00:00', 'ponto_embarque', 6, 'escola', 4, 'ida', 'agendada', 55),
(3, 3, CURDATE(), '16:05:00', '17:00:00', 'escola', 3, 'ponto_embarque', 5, 'volta', 'agendada', 55),
(3, 3, CURDATE(), '17:05:00', '18:00:00', 'escola', 4, 'ponto_embarque', 6, 'volta', 'agendada', 55),
(3, 3, CURDATE(), '18:05:00', '19:00:00', 'ponto_embarque', 5, 'escola', 3, 'ida', 'agendada', 55),
(3, 3, CURDATE(), '19:05:00', '20:00:00', 'ponto_embarque', 6, 'escola', 4, 'ida', 'agendada', 55),
(3, 3, CURDATE(), '20:05:00', '21:00:00', 'escola', 3, 'ponto_embarque', 5, 'volta', 'agendada', 55),
(3, 3, CURDATE(), '21:05:00', '22:00:00', 'escola', 4, 'ponto_embarque', 6, 'volta', 'agendada', 55),
-- ONIBUS 4
(4, 4, CURDATE(), '06:00:00', '07:00:00', 'ponto_embarque', 7, 'escola', 5, 'ida', 'agendada', 60),
(4, 4, CURDATE(), '07:05:00', '08:00:00', 'ponto_embarque', 8, 'escola', 7, 'ida', 'agendada', 55),
(4, 4, CURDATE(), '08:05:00', '09:00:00', 'escola', 5, 'ponto_embarque', 7, 'volta', 'agendada', 55),
(4, 4, CURDATE(), '09:05:00', '10:00:00', 'escola', 7, 'ponto_embarque', 8, 'volta', 'agendada', 55),
(4, 4, CURDATE(), '10:05:00', '11:00:00', 'ponto_embarque', 7, 'escola', 5, 'ida', 'agendada', 55),
(4, 4, CURDATE(), '11:05:00', '12:00:00', 'ponto_embarque', 8, 'escola', 7, 'ida', 'agendada', 55),
(4, 4, CURDATE(), '12:05:00', '13:00:00', 'escola', 5, 'ponto_embarque', 7, 'volta', 'agendada', 55),
(4, 4, CURDATE(), '13:05:00', '14:00:00', 'escola', 7, 'ponto_embarque', 8, 'volta', 'agendada', 55),
(4, 4, CURDATE(), '07:05:00', '13:00:00', 'ponto_embarque', 7, 'escola', 5, 'ida', 'agendada', 55),
(4, 4, CURDATE(), '15:05:00', '16:00:00', 'ponto_embarque', 8, 'escola', 7, 'ida', 'agendada', 55),
(4, 4, CURDATE(), '16:05:00', '17:00:00', 'escola', 5, 'ponto_embarque', 7, 'volta', 'agendada', 55),
(4, 4, CURDATE(), '17:05:00', '18:00:00', 'escola', 7, 'ponto_embarque', 8, 'volta', 'agendada', 55),
(4, 4, CURDATE(), '17:05:00', '22:00:00', 'ponto_embarque', 7, 'escola', 5, 'ida', 'agendada', 55),
(4, 4, CURDATE(), '19:05:00', '20:00:00', 'ponto_embarque', 8, 'escola', 7, 'ida', 'agendada', 55),
(4, 4, CURDATE(), '20:05:00', '21:00:00', 'escola', 5, 'ponto_embarque', 7, 'volta', 'agendada', 55),
(4, 4, CURDATE(), '21:05:00', '22:00:00', 'escola', 7, 'ponto_embarque', 8, 'volta', 'agendada', 55);

INSERT INTO escola_ponto_embarque (escola_id, ponto_embarque_id) VALUES
(6, 1),
(8, 2),
(1, 3),
(2, 4),
(3, 5),
(4, 6);

INSERT INTO alunos (cpf, email, nome, telefonePrinc, emailPessoal, dataNascimento, senha, escola_id, ponto_embarque_id) VALUES
('88888888888', 'roberto@al.gov.br', 'Roberto Alves Costa', '969903253', 'roberto_costa@gmail.com', '2010-05-20', 'roberto@aluno', 6, 1),
('99999999999', 'beatriz@al.gov.br', 'Beatriz Sousa Garcia', '929076857', 'beatrizgarcia2010@gmail.com', '2011-08-15', 'beatriz@aluno', 5, 2),
('10101010101', 'marcos@al.gov.br', 'Marcos Correia', '956435985', 'marcos_correia@gmail.com', '2012-03-10', 'marcos@aluno', 1, 3),
('11121211121', 'ana.julia@al.gov.br', 'Ana Julia Oliveira', '987654321', 'ana.j.oliveira@hotmail.com', '2018-11-05', 'ana@aluno', 1, 4),
('12131213121', 'carlos.eduardo@al.gov.br', 'Carlos Eduardo Pereira', '998877665', 'cadu_pereira@gmail.com.br', '2016-06-01', 'carlos@aluno', 2, 5),
('13131414131', 'beatriz.santos@al.gov.br', 'Beatriz Santos Lima', '912345678', 'bia_lima_santos@outlook.com', '2013-09-22', 'beatriz@aluno', 4, 6),
('14141515141', 'lucas.mendes@al.gov.br', 'Lucas Mendes Ferreira', '955554444', 'lucas.ferreira.m@gmail.com', '2012-01-30', 'lucas@aluno', 6, 7),
('15141514151', 'fernanda.almeida@al.gov.br', 'Fernanda Almeida Goncalves', '943218765', 'fernanda_goncalves@outlook.com', '2013-05-17', 'fernanda@aluno', 6, 8),
('16151615161', 'gustavo.ribeiro@al.gov.br', 'Gustavo Ribeiro Azevedo', '988881111', 'guga_ribeiro@icloud.com', '2015-07-09', 'gustavo@aluno', 8, 1),
('17161716171', 'mariana.souza@al.gov.br', 'Mariana Souza Carvalho', '977772222', 'mari_carvalho88@gmail.com', '2012-12-01', 'mariana@aluno', 5, 2),
('12345678900', 'novo.email@exemplo.com', 'Novo Aluno', '99999-9999', 'email.pessoal@exemplo.com', '2005-07-20', 'senhaSegura', 5, 7);



INSERT INTO responsaveis_alunos (responsavel_id, aluno_id) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5),
(6, 6),
(6, 7),  -- responsavel 6 tem dois filhos
(7, 8),
(8, 9);

INSERT INTO alunos_viagens (aluno_id, viagem_id) VALUES
-- Roberto Alves (escola_id: 6, ponto_embarque_id: 1)
(1, 11), -- viagem de ida -> 13:00 ate 15:00
(1, 15), -- viagem de volta -> 15:15 ate 17:30
-- Beatriz Sousa (escola_id: 5, ponto_embarque_id: 2)
(2, 4),  -- viagem de ida -> 13:00
(2, 8),  -- viagem de volta -> 17:30
-- Marcos Correia (escola_id: 1, ponto_embarque_id: 3)
(3, 12), -- viagem de ida -> 13:00
(3, 16), -- viagem de volta -> 17:30
-- Ana Julia (escola_id: 1, ponto_embarque_id: 4)
(4, 12), -- viagem de ida -> 13:00
(4, 16), -- viagem de volta -> 17:30
-- Carlos Eduardo (escola_id: 2, ponto_embarque_id: 5)
(5, 13), -- viagem de ida -> 13:00
(5, 17), -- viagem de volta -> 17:30
-- Beatriz Santos (escola_id: 4, ponto_embarque_id: 6)
(6, 14), -- viagem de ida -> 13:00
(6, 18), -- viagem de volta -> 17:30
-- Lucas Mendes (escola_id: 6, ponto_embarque_id: 7)
(7, 12), -- viagem de ida -> 13:00
(7, 16), -- viagem de volta -> 17:30
-- Fernanda Almeida (escola_id: 6, ponto_embarque_id: 8)
(8, 12), -- viagem de ida -> 13:00
(8, 16), -- viagem de volta -> 17:30
-- Gustavo Ribeiro (escola_id: 8, ponto_embarque_id: 1)
(9, 13), -- viagem de ida -> 13:00
(9, 17), -- viagem de volta -> 17:30
-- Mariana Souza (escola_id: 5, ponto_embarque_id: 2)
(10, 4), -- viagem de ida -> 13:00
(10, 8),
-- teste
(11, 57),
(11, 61);

-- Criada dia 02/06
-- drop table incidentes; 
#tabela incidentes
CREATE TABLE incidentes (
id INT AUTO_INCREMENT PRIMARY KEY,
remetente VARCHAR(100),
tipo VARCHAR (50),
mensagem text,
dataDaMensagem date,
hora time
);
insert into incidentes (remetente, tipo, mensagem)values ('maria@gmail.com', "transito", "muito transito na avenida");
insert into incidentes (remetente, tipo, mensagem, dataDaMensagem, hora)
value('maria@gmail.com', "transito", "muito transito", curdate(), curtime());
select * from incidentes; 

select * from motoristas;

select count(*)from alunos_viagem;

update alunos
set turno = 'manhã'
where id<20;

update alunos
set status = 'ativo'
where id< 20;
/*
JOIN viagens ON alunos_viagens.viagem_id = viagens.id
WHERE alunos_viagens.aluno_id = 1 AND viagens.data_viagem = CURDATE();*/

SELECT * FROM responsaveis_alunos WHERE responsavel_id = 1;

select * from sessions;

SELECT id, ponto_inicial_tipo, ponto_inicial_id FROM viagens;