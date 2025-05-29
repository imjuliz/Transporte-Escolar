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

CREATE TABLE motoristas (
    cpf VARCHAR(11) NOT NULL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    cnh VARCHAR(20) NOT NULL,
    telefone VARCHAR(20) NOT NULL,
    vencimento_habilitacao DATE NOT NULL,
    email VARCHAR(100) NOT NULL
);

CREATE TABLE veiculos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    placa VARCHAR(10) UNIQUE NOT NULL,
    capacidade INT NOT NULL,
    motorista_cpf VARCHAR(11),
    motorista_nome VARCHAR(100),
    FOREIGN KEY (motorista_cpf) REFERENCES motoristas(cpf) ON DELETE SET NULL ON UPDATE CASCADE
);

-- trigger p preencher automaticamente o nome do motorista baseado no cpf
DELIMITER $$

CREATE TRIGGER set_motorista_nome
BEFORE INSERT ON veiculos
FOR EACH ROW
BEGIN
    DECLARE nome_motorista VARCHAR(100);

    SELECT nome INTO nome_motorista FROM motoristas
    WHERE cpf = NEW.motorista_cpf LIMIT 1;

    SET NEW.motorista_nome = nome_motorista;
END $$

DELIMITER ;

CREATE TABLE alunos (
    email VARCHAR(100) NOT NULL PRIMARY KEY,
    nomeCompleto VARCHAR(100) NOT NULL,
    nomeEscola VARCHAR(100) NOT NULL,
    enderecoEscola VARCHAR(100) NOT NULL,
    telefonePrinc VARCHAR(9) NOT NULL,
    emailPessoal VARCHAR(100) NOT NULL,
    turno ENUM('manhã', 'tarde', 'noite') NOT NULL,
    veiculo_id INT NOT NULL,
    FOREIGN KEY (veiculo_id) REFERENCES veiculos(id) ON DELETE CASCADE ON UPDATE CASCADE
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
    nome VARCHAR(255) NOT NULL UNIQUE,
    endereco TEXT NOT NULL,
    latitude DECIMAL(9,6) NOT NULL,
    longitude DECIMAL(9,6) NOT NULL
);

-- trigger p preencher automaticamente o endereço da escola baseado no nome
DELIMITER $$

CREATE TRIGGER set_endereco_escola
BEFORE INSERT ON alunos
FOR EACH ROW
BEGIN
    DECLARE endereco_escola VARCHAR(255);

    SELECT endereco INTO endereco_escola FROM escolas
    WHERE nome = NEW.nomeEscola LIMIT 1;

    SET NEW.enderecoEscola = endereco_escola;
END $$

DELIMITER ;

CREATE TABLE viagens (
    id INT PRIMARY KEY AUTO_INCREMENT,
    veiculo_id INT NOT NULL,
    escola_id INT NOT NULL,
    ponto_embarque_id INT NOT NULL,
    data DATE NOT NULL,
    horario_embarque TIME NOT NULL,
    horario_chegada_escola TIME NOT NULL,
    horario_retorno_escola TIME NOT NULL,
    horario_desembarque TIME NOT NULL,
    FOREIGN KEY (veiculo_id) REFERENCES veiculos(id) ON DELETE CASCADE,
    FOREIGN KEY (escola_id) REFERENCES escolas(id) ON DELETE CASCADE,
    FOREIGN KEY (ponto_embarque_id) REFERENCES pontos_embarque(id) ON DELETE CASCADE
);

-- data do dia em que a viagem for criada
DELIMITER $$

CREATE TRIGGER set_data_viagem
BEFORE INSERT ON viagens
FOR EACH ROW
BEGIN
    SET NEW.data = CURDATE();
END $$

DELIMITER ;

/*-- Tabela de rotas
CREATE TABLE rotas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    veiculo_id INT NOT NULL,
    escola_id INT NOT NULL,
    ponto_embarque_id INT NOT NULL,
    horario_embarque TIME NOT NULL,
    horario_chegada_escola TIME NOT NULL,
    horario_retorno_escola TIME NOT NULL,
    horario_desembarque TIME NOT NULL,
    FOREIGN KEY (veiculo_id) REFERENCES veiculos(id) ON DELETE CASCADE,
    FOREIGN KEY (escola_id) REFERENCES escolas(id) ON DELETE CASCADE,
    FOREIGN KEY (ponto_embarque_id) REFERENCES pontos_embarque(id) ON DELETE CASCADE
);

-- trigger p preencher automaticamente o nome da escola na tabela de rotas
DELIMITER $$

CREATE TRIGGER set_nome_escola
BEFORE INSERT ON rotas
FOR EACH ROW
BEGIN
    DECLARE nome_escola VARCHAR(255);

    SELECT nome INTO nome_escola FROM escolas
    WHERE id = NEW.escola_id LIMIT 1;

    SET NEW.nome_escola = nome_escola;
END $$

DELIMITER ; */

-- tabela de localização dos veiculos p rastreamento em tempo real
CREATE TABLE localizacao_veiculos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    veiculo_id INT NOT NULL,
    latitude DECIMAL(9,6) NOT NULL,
    longitude DECIMAL(9,6) NOT NULL,
    horario TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (veiculo_id) REFERENCES veiculos(id) ON DELETE CASCADE
);

INSERT INTO usuarios (cpf, email, senha, tipo) VALUES
('11111111111', 'julia@gmail.com', 'julia@adm', 'administrador'),
('22222222222', 'lorena@gmail.com', 'lorena@adm', 'administrador'),
('33333333333', 'maria@gmail.com', 'maria@adm', 'administrador'),
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
('EE Bairro Cruzeiro', 'R. Santos Dumont, 535 - Cruzeiro, Monte Azul Paulista - SP, 14730-000', -20.91276947320103, -48.64293563018136),
('Escola Municipal Sossego da Mamae Creche Municipal', 'Av. Liscano Coelho Blanco, 1235 - Jardim São Elipe, Monte Azul Paulista - SP, 14730-000', -20.9087, -48.6521),
('Centro Educacional Municipal Minhocao', 'R. Campos Salles, 115 - Monte Azul Paulista, SP, 14730-000', -20.9095, -48.6388);

INSERT INTO veiculos (placa, capacidade, motorista_cpf) VALUES
('ABC-1234', 40, '55555555555'),
('DEF-5678', 40, '66666666666'),
('GHI-9012', 40, '77777777777'),
('JKL-3456', 40, '12345678901');

INSERT INTO alunos (email, nomeCompleto, nomeEscola, enderecoEscola, telefonePrinc, emailPessoal, turno, veiculo_id) VALUES
('roberto@al.gov.br', 'Roberto Alves Costa', 'EE Bairro Cruzeiro', '', 969903253, 'roberto_costa@gmail.com', 'manha', 4),
('beatriz@al.gov.br', 'Beatriz Sousa Garcia', 'Espaço Livre Escola de Educação Infantil e Ensino Fund.', '', 929076857, 'beatrizgarcia2010@gmail.com', 'tarde', 3),
('marcos@al.gov.br', 'Marcos Correia', 'Cemei Edna Cassiano', '', 956435985, 'marcos_correia@gmail.com', 'noite', 1);

INSERT INTO pontos_embarque (nome, endereco, latitude, longitude) VALUES
('Praça Barão do Rio Branco', 'Praça Rio Branco, 75 - Monte Azul Paulista, SP, 14730-000', -20.9068, -48.6413),
('Rua Cristóvão Colombo', 'R. Cristóvão Colombo, 228 - Monte Azul Paulista, SP, 14730-000', -20.9022, -48.6420),
('Avenida Theodoro Rodas', 'Av. Teodoro Rodas, 50 - Monte Azul Paulista, SP, 14730-000', -20.8966, -48.6357),
('Rua Quintino Bocaiuva', 'R. Quintino Bocaiuva, 159 - Centro, Monte Azul Paulista - SP, 14730-000', -20.9086, -48.6398),
('R. Sebastião de Souza Lima', 'R. Sebastião de Souza Lima, 110 - Monte Azul Paulista, SP, 14730-000', -20.9090, -48.6412),
('R. Líbero Badaró, 377', 'R. Líbero Badaró, 377-271 - Monte Azul Paulista, SP, 14730-000', -20.9065, -48.6453),
('R. Waldomiro Wohnrath, 230', 'R. Waldomiro Wohnrath, 2-230 - Monte Azul Paulista, SP, 14730-000', -20.9019, -48.6475),
('R. Machado Morales, 70', 'R. Machado Morales, 2-70 - Monte Azul Paulista, SP, 14730-000', -20.9185, -48.6352);

INSERT INTO viagens (veiculo_id, escola_id, ponto_embarque_id, horario_embarque, horario_chegada_escola, horario_retorno_escola, horario_desembarque) VALUES
-- Ônibus 1 - 1 viagem
(1, 1, 1, '13:30:00', '14:30:00', '15:30:00', '16:00:00'),
(1, 2, 2, '13:50:00', '14:30:00', '15:30:00', '16:00:00'),
-- Ônibus 1 - 2 viagem
(1, 1, 1, '16:00:00', '16:50:00', '17:10:00', '17:30:00'),
(1, 2, 2, '16:00:00', '16:50:00', '17:10:00', '17:30:00'),
-- Ônibus 2 - 1 viagem
(2, 3, 3, '13:30:00', '14:30:00', '15:30:00', '16:00:00'),
(2, 4, 4, '13:50:00', '14:30:00', '15:30:00', '16:00:00'),
-- Ônibus 2 - 2 viagem
(2, 3, 3, '16:00:00', '16:50:00', '17:10:00', '17:30:00'),
(2, 4, 4, '16:00:00', '16:50:00', '17:10:00', '17:30:00'),
-- Ônibus 3 - 1 viagem
(3, 5, 5, '13:30:00', '14:30:00', '15:30:00', '16:00:00'),
(3, 6, 6, '13:50:00', '14:30:00', '15:30:00', '16:00:00'),
-- Ônibus 3 - 2 viagem
(3, 5, 5, '16:00:00', '16:50:00', '17:10:00', '17:30:00'),
(3, 6, 6, '16:00:00', '16:50:00', '17:10:00', '17:30:00'),
-- Ônibus 4 - 1 viagem
(4, 7, 7, '13:30:00', '14:30:00', '15:30:00', '16:00:00'),
(4, 8, 8, '13:50:00', '14:30:00', '15:30:00', '16:00:00'),
-- Ônibus 4 - 2 viagem
(4, 7, 7, '16:00:00', '16:50:00', '17:10:00', '17:30:00'),
(4, 8, 8, '16:00:00', '16:50:00', '17:10:00', '17:30:00');

INSERT INTO localizacao_veiculos (veiculo_id, latitude, longitude, horario) VALUES
(1, -20.9068, -48.6413, NOW()), -- Praça Barão do Rio Branco
(1, -20.9022, -48.6420, NOW()), -- Rua Cristóvão Colombo
(2, -20.8966, -48.6357, NOW()), -- Avenida Theodoro Rodas
(2, -20.9086, -48.6398, NOW()), -- Rua Quintino Bocaiuva
(3, -20.9095, -48.6388, NOW()), -- Distrito Industrial Valentim Tomazella
(3, -20.9090, -48.6412, NOW()), -- Rua Sebastião de Souza Lima
(4, -20.9127, -48.6429, NOW()), -- Residencial Baraldi
(4, -20.9087, -48.6521, NOW()); -- Jardim São Felipe