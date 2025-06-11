CREATE DATABASE transporteEscolar;
USE transporteEscolar;
-- drop database transporteescolar;

CREATE TABLE adm (
	id int not null auto_increment primary key,
    cpf VARCHAR(11) NOT NULL unique,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    telefone varchar(20) not null unique,
    fotoPerfil varchar(255),
    status ENUM('ativo', 'inativo') DEFAULT 'ativo'
);

CREATE TABLE motoristas (
	id int not null auto_increment primary key,
    cpf VARCHAR(11) NOT NULL unique,
    nome VARCHAR(100) NOT NULL,
    cnh VARCHAR(20) NOT NULL unique,
    telefone VARCHAR(20) NOT NULL unique,
    vencimento_habilitacao DATE NOT NULL,
    email VARCHAR(100) NOT NULL,
    senha varchar(100) not null,
    fotoPerfil varchar(255),
    status ENUM('ativo', 'inativo') DEFAULT 'ativo'
);

CREATE TABLE responsaveis (
	id int not null auto_increment primary key,
    cpf VARCHAR(11) NOT NULL unique,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    telefone VARCHAR(20) unique,
    fotoPerfil varchar(255),
    status ENUM('ativo', 'inativo') DEFAULT 'ativo'
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
    modelo VARCHAR(50), 
    marca VARCHAR(50),
    anoFabricacao int,
    motorista_id int,
    FOREIGN KEY (motorista_id) REFERENCES motoristas(id) ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE TABLE viagens (
    id INT PRIMARY KEY AUTO_INCREMENT,
    veiculo_id INT NOT NULL,
    motorista_id INT NOT NULL,
    data_viagem DATE NOT NULL,
    turno enum('manha', 'tarde', 'noite', 'integral') not null,
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
    telefonePrinc VARCHAR(9) NOT NULL unique,
    emailPessoal VARCHAR(100) unique,
    dataNascimento date NOT NULL,
    senha VARCHAR(255) NOT NULL,
    fotoPerfil varchar(255),
    status ENUM('ativo', 'inativo') DEFAULT 'ativo',
    turno ENUM('manha', 'tarde', 'noite', 'integral') not null,
    escola_id INT NOT NULL,
    ponto_embarque_id INT NOT NULL,
    FOREIGN KEY (escola_id) REFERENCES escolas(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (ponto_embarque_id) REFERENCES pontos_embarque(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE mensagens_responsaveis (
  id INT AUTO_INCREMENT PRIMARY KEY,
  aluno_id INT,
  responsavel_id INT,
  motorista_id INT,
  tipo ENUM('condicao', 'obj'),
  conteudo TEXT,
  data_envio DATETIME DEFAULT CURRENT_TIMESTAMP,
  lida BOOLEAN DEFAULT FALSE,
  FOREIGN KEY (aluno_id) REFERENCES alunos(id),
  FOREIGN KEY (responsavel_id) REFERENCES responsaveis(id),
  FOREIGN KEY (motorista_id) REFERENCES motoristas(id)
);

CREATE TABLE mensagens_motoristas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  aluno_id INT,
  responsavel_id INT,
  motorista_id INT,
  tipo ENUM('congestionamento', 'rota', 'emergencia', 'veiculo'),
  conteudo TEXT,
  data_envio DATETIME DEFAULT CURRENT_TIMESTAMP,
  lida BOOLEAN DEFAULT FALSE,
  FOREIGN KEY (aluno_id) REFERENCES alunos(id),
  FOREIGN KEY (responsavel_id) REFERENCES responsaveis(id),
  FOREIGN KEY (motorista_id) REFERENCES motoristas(id)
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

DELIMITER $$

CREATE TRIGGER associacao_alunos_viagens
AFTER INSERT ON alunos
FOR EACH ROW
BEGIN
  -- insere na associação alunos_viagens todas as viagens que batem com escola, ponto embarque e turno
  INSERT INTO alunos_viagens (aluno_id, viagem_id)
  SELECT NEW.id, v.id
  FROM viagens v
  WHERE 
    v.turno = NEW.turno
    AND (
      (v.ponto_inicial_tipo = 'ponto_embarque' AND v.ponto_inicial_id = NEW.ponto_embarque_id AND v.ponto_final_tipo = 'escola' AND v.ponto_final_id = NEW.escola_id)
      OR
      (v.ponto_final_tipo = 'ponto_embarque' AND v.ponto_final_id = NEW.ponto_embarque_id AND v.ponto_inicial_tipo = 'escola' AND v.ponto_inicial_id = NEW.escola_id)
    )
    AND v.status = 'agendada';
END$$

DELIMITER ;

INSERT INTO motoristas (cpf, nome, cnh, telefone, vencimento_habilitacao, email, senha) VALUES
('55555555555', 'Ana Souza', '1234567890', '11999999999', '2026-05-15', 'ana@gmail.com', 'ana@motorista'),
('66666666666', 'Marcos Silva', '0987654321', '11988888888', '2025-07-20', 'marcos@gmail.com', 'marcos@motorista'),
('77777777777', 'Fernanda Oliveira', '5678901234', '11977777777', '2027-09-10', 'fernanda@gmail.com', 'fernanda@motorista'),
('12345678901', 'Carlos Mendes', '3456789012', '11966666666', '2028-03-12', 'carlos@gmail.com', 'carlos@motorista'),
('40718892052', 'Gustavo Ferreira Lima', '12345678901', '11955551111', '2026-08-20', 'gustavo.lima@transporte.com', 'gustavo@motorista'),
('92500471066', 'Luciana Alves Rocha', '23456789012', '11966662222', '2027-01-15', 'luciana.rocha@transporte.com', 'luciana@motorista'),
('52334760018', 'Carlos Henrique Duarte', '34567890123', '11977773333', '2025-12-01', 'carlos.duarte@transporte.com', 'carlos@motorista'),
('16899383000', 'Patrícia Nogueira Santos', '45678901234', '11988884444', '2026-04-10', 'patricia.santos@transporte.com', 'patricia@motorista');

INSERT INTO adm (cpf, nome, email, senha, telefone) VALUES
('11111111111', 'Julia', 'julia@gmail.com', 'julia@adm', '11972189653'),
('22222222222', 'Lorena', 'lorena@gmail.com', 'lorena@adm', '11960344627'),
('33333333333', 'Maria', 'maria@gmail.com', 'maria@adm', '11994922021'),
('13131313131', 'Teste', 'teste@gmail.com', 'teste@adm', '11293819381');

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

insert into veiculos (placa, capacidade, motorista_id, modelo, marca, anoFabricacao)
values ( "MNO-5432", 40, 1, " LO 916 R/ LO 916", "Mercedes-Benz", 2019),
("PQR-8765", 40, 2, " LO 916 R/ LO 916", "Mercedes-Benz", 2020),
("STU-6846", 40, 3, " LO 916 R/ LO 916", "Mercedes-Benz", 2019),
("VWX-7356", 40, 4, " LO 916 R/ LO 916", "Mercedes-Benz", 2019);

INSERT INTO pontos_embarque (nome, endereco, latitude, longitude) VALUES
('Praça Barão do Rio Branco', 'Praça Rio Branco, 75 - Monte Azul Paulista, SP, 14730-000', -20.9068, -48.6413),
('Rua Cristóvão Colombo', 'R. Cristóvão Colombo, 228 - Monte Azul Paulista, SP, 14730-000', -20.9022, -48.6420),
('Avenida Theodoro Rodas', 'Av. Teodoro Rodas, 50 - Monte Azul Paulista, SP, 14730-000', -20.8966, -48.6357),
('Rua Quintino Bocaiuva', 'R. Quintino Bocaiuva, 159 - Centro, Monte Azul Paulista - SP, 14730-000', -20.9086, -48.6398),
('R. Sebastião de Souza Lima', 'R. Sebastião de Souza Lima, 110 - Monte Azul Paulista, SP, 14730-000', -20.9090, -48.6412),
('R. Líbero Badaró, 377', 'R. Líbero Badaró, 377 - Monte Azul Paulista, SP, 14730-000', -20.9065, -48.6453),
('R. Waldomiro Wohnrath, 230', 'R. Waldomiro Wohnrath, 2-230 - Monte Azul Paulista, SP, 14730-000', -20.9019, -48.6475),
('R. Machado Morales, 70', 'R. Machado Morales, 42 - Monte Azul Paulista, SP, 14730-000', -20.9185, -48.6352);

INSERT INTO viagens 
(veiculo_id, motorista_id, data_viagem, turno, hora_saida, hora_chegada_prevista, ponto_inicial_tipo, ponto_inicial_id, ponto_final_tipo, ponto_final_id, tipo_viagem, status, tempo_estimado_viagem) VALUES
-- ônibus 1, motorista 1, escolas 1 e 2, períodos: manhã e tarde
-- manhã
(1, 1, CURDATE(), 'manha', '06:00:00', '07:00:00', 'ponto_embarque', 1, 'escola', 1, 'ida', 'agendada', 60),
(1, 1, CURDATE(), 'manha', '11:30:00', '12:00:00', 'escola', 1, 'ponto_embarque', 1, 'volta', 'agendada', 30),
(1, 1, CURDATE(), 'manha', '06:00:00', '07:00:00', 'ponto_embarque', 2, 'escola', 2, 'ida', 'agendada', 60),
(1, 1, CURDATE(), 'manha', '11:30:00', '12:00:00', 'escola', 2, 'ponto_embarque', 2, 'volta', 'agendada', 30),
-- tarde
(1, 1, CURDATE(), 'tarde', '12:00:00', '12:30:00', 'ponto_embarque', 1, 'escola', 1, 'ida', 'agendada', 30),
(1, 1, CURDATE(), 'tarde', '17:00:00', '18:00:00', 'escola', 1, 'ponto_embarque', 1, 'volta', 'agendada', 60),
-- para apresentacao
(1, 1, CURDATE(), 'tarde', '13:30:00', '15:00:00', 'ponto_embarque', 2, 'escola', 2, 'ida', 'agendada', 90),
(1, 1, CURDATE(), 'tarde', '15:15:00', '17:30:00', 'escola', 2, 'ponto_embarque', 2, 'volta', 'agendada', 135),
-- ônibus 2, motorista 2, escolas 3 e 4, períodos: tarde e noite
-- tarde
(2, 2, CURDATE(), 'tarde', '12:00:00', '12:30:00', 'ponto_embarque', 3, 'escola', 3, 'ida', 'agendada', 30),
(2, 2, CURDATE(), 'tarde', '17:00:00', '18:00:00', 'escola', 3, 'ponto_embarque', 3, 'volta', 'agendada', 60),
(2, 2, CURDATE(), 'tarde', '12:00:00', '12:30:00', 'ponto_embarque', 4, 'escola', 4, 'ida', 'agendada', 30),
(2, 2, CURDATE(), 'tarde', '17:00:00', '18:00:00', 'escola', 4, 'ponto_embarque', 4, 'volta', 'agendada', 60),
-- noite
(2, 2, CURDATE(), 'noite', '18:30:00', '19:00:00', 'ponto_embarque', 3, 'escola', 3, 'ida', 'agendada', 30),
(2, 2, CURDATE(), 'noite', '23:00:00', '23:30:00', 'escola', 3, 'ponto_embarque', 3, 'volta', 'agendada', 30),
(2, 2, CURDATE(), 'noite', '18:30:00', '19:00:00', 'ponto_embarque', 4, 'escola', 4, 'ida', 'agendada', 30),
(2, 2, CURDATE(), 'noite', '23:00:00', '23:30:00', 'escola', 4, 'ponto_embarque', 4, 'volta', 'agendada', 30),
-- ônibus 3, motorista 3, escolas 5 e 6, períodos: manhã e integral
-- manhã
(3, 3, CURDATE(), 'manha', '06:00:00', '07:00:00', 'ponto_embarque', 5, 'escola', 5, 'ida', 'agendada', 60),
(3, 3, CURDATE(), 'manha', '11:30:00', '12:00:00', 'escola', 5, 'ponto_embarque', 5, 'volta', 'agendada', 30),
(3, 3, CURDATE(), 'manha', '06:00:00', '07:00:00', 'ponto_embarque', 6, 'escola', 6, 'ida', 'agendada', 60),
(3, 3, CURDATE(), 'manha', '11:30:00', '12:00:00', 'escola', 6, 'ponto_embarque', 6, 'volta', 'agendada', 30),
-- integral
(3, 3, CURDATE(), 'integral', '06:00:00', '07:00:00', 'ponto_embarque', 5, 'escola', 5, 'ida', 'agendada', 60),
(3, 3, CURDATE(), 'integral', '16:00:00', '16:30:00', 'escola', 5, 'ponto_embarque', 5, 'volta', 'agendada', 30),
(3, 3, CURDATE(), 'integral', '06:00:00', '07:00:00', 'ponto_embarque', 6, 'escola', 6, 'ida', 'agendada', 60),
(3, 3, CURDATE(), 'integral', '16:00:00', '16:30:00', 'escola', 6, 'ponto_embarque', 6, 'volta', 'agendada', 30),
-- ônibus 4, motorista 4, escolas 7 e 8, períodos: integral e noite
-- integral
(4, 4, CURDATE(), 'integral', '06:00:00', '07:00:00', 'ponto_embarque', 7, 'escola', 7, 'ida', 'agendada', 60),
(4, 4, CURDATE(), 'integral', '16:00:00', '16:30:00', 'escola', 7, 'ponto_embarque', 7, 'volta', 'agendada', 30),
(4, 4, CURDATE(), 'integral', '06:00:00', '07:00:00', 'ponto_embarque', 8, 'escola', 8, 'ida', 'agendada', 60),
(4, 4, CURDATE(), 'integral', '16:00:00', '16:30:00', 'escola', 8, 'ponto_embarque', 8, 'volta', 'agendada', 30),
-- noite
(4, 4, CURDATE(), 'noite', '18:30:00', '19:00:00', 'ponto_embarque', 7, 'escola', 7, 'ida', 'agendada', 30),
(4, 4, CURDATE(), 'noite', '23:00:00', '23:30:00', 'escola', 7, 'ponto_embarque', 7, 'volta', 'agendada', 30),
(4, 4, CURDATE(), 'noite', '18:30:00', '19:00:00', 'ponto_embarque', 8, 'escola', 8, 'ida', 'agendada', 30),
(4, 4, CURDATE(), 'noite', '23:00:00', '23:30:00', 'escola', 8, 'ponto_embarque', 8, 'volta', 'agendada', 30),
-- ônibus 1, motorista 5, escolas 1 e 2, período: noite
(1, 5, CURDATE(), 'noite', '18:30:00', '19:00:00', 'ponto_embarque', 1, 'escola', 1, 'ida', 'agendada', 30),
(1, 5, CURDATE(), 'noite', '23:00:00', '23:30:00', 'escola', 1, 'ponto_embarque', 1, 'volta', 'agendada', 30),
(1, 5, CURDATE(), 'noite', '18:30:00', '19:00:00', 'ponto_embarque', 1, 'escola', 2, 'ida', 'agendada', 30),
(1, 5, CURDATE(), 'noite', '23:00:00', '23:30:00', 'escola', 2, 'ponto_embarque', 1, 'volta', 'agendada', 30),
-- ônibus 2, motorista 6, escolas 3 e 4 (manhã e integral)
-- manhã
(2, 6, CURDATE(), 'manha', '06:00:00', '07:00:00', 'ponto_embarque', 2, 'escola', 3, 'ida', 'agendada', 60),
(2, 6, CURDATE(), 'manha', '11:30:00', '12:00:00', 'escola', 3, 'ponto_embarque', 2, 'volta', 'agendada', 30),
-- integral
(2, 6, CURDATE(), 'integral', '06:00:00', '07:00:00', 'ponto_embarque', 3, 'escola', 4, 'ida', 'agendada', 60),
(2, 6, CURDATE(), 'integral', '16:00:00', '16:30:00', 'escola', 4, 'ponto_embarque', 3, 'volta', 'agendada', 30),
-- ônibus 3, motorista 7, escolas 5 e 6, períodos: tarde e noite
-- tarde
(3, 7, CURDATE(), 'tarde', '12:00:00', '12:30:00', 'ponto_embarque', 5, 'escola', 5, 'ida', 'agendada', 30),
(3, 7, CURDATE(), 'tarde', '17:00:00', '18:00:00', 'escola', 5, 'ponto_embarque', 5, 'volta', 'agendada', 60),
(3, 7, CURDATE(), 'tarde', '12:00:00', '12:30:00', 'ponto_embarque', 6, 'escola', 6, 'ida', 'agendada', 30),
(3, 7, CURDATE(), 'tarde', '17:00:00', '18:00:00', 'escola', 6, 'ponto_embarque', 6, 'volta', 'agendada', 60),
-- noite
(3, 7, CURDATE(), 'noite', '18:30:00', '19:00:00', 'ponto_embarque', 5, 'escola', 5, 'ida', 'agendada', 30),
(3, 7, CURDATE(), 'noite', '23:00:00', '23:30:00', 'escola', 5, 'ponto_embarque', 5, 'volta', 'agendada', 30),
(3, 7, CURDATE(), 'noite', '18:30:00', '19:00:00', 'ponto_embarque', 6, 'escola', 6, 'ida', 'agendada', 30),
(3, 7, CURDATE(), 'noite', '23:00:00', '23:30:00', 'escola', 6, 'ponto_embarque', 6, 'volta', 'agendada', 30),
-- ônibus 4, motorista 8, escolas 7 e 8, períodos: manhã e tarde
-- manhã
(4, 8, CURDATE(), 'manha', '06:00:00', '07:00:00', 'ponto_embarque', 7, 'escola', 7, 'ida', 'agendada', 60),
(4, 8, CURDATE(), 'manha', '11:30:00', '12:00:00', 'escola', 7, 'ponto_embarque', 7, 'volta', 'agendada', 30),
(4, 8, CURDATE(), 'manha', '06:00:00', '07:00:00', 'ponto_embarque', 8, 'escola', 8, 'ida', 'agendada', 60),
(4, 8, CURDATE(), 'manha', '11:30:00', '12:00:00', 'escola', 8, 'ponto_embarque', 8, 'volta', 'agendada', 30),
-- tarde
(4, 8, CURDATE(), 'tarde', '12:00:00', '12:30:00', 'ponto_embarque', 7, 'escola', 7, 'ida', 'agendada', 30),
(4, 8, CURDATE(), 'tarde', '17:00:00', '18:00:00', 'escola', 7, 'ponto_embarque', 7, 'volta', 'agendada', 60),
(4, 8, CURDATE(), 'tarde', '12:00:00', '12:30:00', 'ponto_embarque', 8, 'escola', 8, 'ida', 'agendada', 30),
(4, 8, CURDATE(), 'tarde', '17:00:00', '18:00:00', 'escola', 8, 'ponto_embarque', 8, 'volta', 'agendada', 60);

INSERT INTO escola_ponto_embarque (escola_id, ponto_embarque_id) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5),
(6, 6),
(7, 7),
(8, 8);

INSERT INTO alunos (cpf, email, nome, telefonePrinc, emailPessoal, dataNascimento, senha, escola_id, ponto_embarque_id, turno) VALUES
('88888888888', 'roberto@al.gov.br', 'Roberto Alves Costa', '11969903253', 'roberto_costa@gmail.com', '2010-05-20', 'roberto@aluno', 2, 2, 'tarde'),
('99999999999', 'beatriz@al.gov.br', 'Beatriz Sousa Garcia', '11929076857', 'beatrizgarcia2010@gmail.com', '2011-08-15', 'beatriz@aluno', 5, 5, 'integral'),
('10101010101', 'marcos@al.gov.br', 'Marcos Correia', '11956435985', 'marcos_correia@gmail.com', '2012-03-10', 'marcos@aluno', 3, 3, 'noite'),
('11121211121', 'ana.julia@al.gov.br', 'Ana Julia Oliveira', '11987654321', 'ana.j.oliveira@hotmail.com', '2018-11-05', 'ana@aluno', 1, 1, 'manha'),
('12131213121', 'carlos.eduardo@al.gov.br', 'Carlos Eduardo Pereira', '11998877665', 'cadu_pereira@gmail.com.br', '2016-06-01', 'carlos@aluno', 4, 4, 'manha'),
('13131414131', 'beatriz.santos@al.gov.br', 'Beatriz Santos Lima', '11912345678', 'bia_lima_santos@outlook.com', '2013-09-22', 'beatriz@aluno', 2, 2, 'tarde'),
('14141515141', 'lucas.mendes@al.gov.br', 'Lucas Mendes Ferreira', '11955554444', 'lucas.ferreira.m@gmail.com', '2012-01-30', 'lucas@aluno', 2, 2, 'tarde'),
('15141514151', 'fernanda.almeida@al.gov.br', 'Fernanda Almeida Goncalves', '11943218765', 'fernanda_goncalves@outlook.com', '2013-05-17', 'fernanda@aluno', 8, 8, 'tarde'),
('16151615161', 'gustavo.ribeiro@al.gov.br', 'Gustavo Ribeiro Azevedo', '11988881111', 'guga_ribeiro@icloud.com', '2015-07-09', 'gustavo@aluno', 1, 1, 'manha'),
('17161716171', 'mariana.souza@al.gov.br', 'Mariana Souza Carvalho', '11977772222', 'mari_carvalho88@gmail.com', '2012-12-01', 'mariana@aluno', 2, 2, 'tarde'),
('12345678900', 'novo.email@exemplo.com', 'Novo Aluno', '1199999-9999', 'email.pessoal@exemplo.com', '2005-07-20', 'senhaSegura', 3, 3, 'noite');

INSERT INTO responsaveis_alunos (responsavel_id, aluno_id) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5),
(6, 6), (6, 7),  -- responsavel 6 tem dois filhos
(7, 8),
(8, 9);

/*
-- para função de contar viagens
SELECT data_viagem AS data, COUNT(*) AS total_viagens
FROM viagens
GROUP BY data_viagem
ORDER BY data_viagem;
*/
-- para funcionar no gráfico é necessário add datas diferentes
INSERT INTO viagens (veiculo_id, motorista_id, data_viagem, hora_saida, hora_chegada_prevista, ponto_inicial_tipo, ponto_inicial_id, ponto_final_tipo, ponto_final_id, tipo_viagem, status, tempo_estimado_viagem) VALUES
-- ONIBUS 1
(1, 1, '2025-06-07', '06:00:00', '07:00:00', 'ponto_embarque', 1, 'escola', 6, 'ida', 'agendada', 60),
(1, 1, '2025-06-07', '07:05:00', '08:00:00', 'ponto_embarque', 2, 'escola', 8, 'ida', 'agendada', 55),
(1, 1, '2025-06-07', '08:05:00', '09:00:00', 'escola', 6, 'ponto_embarque', 1, 'volta', 'agendada', 55),
(1, 1, '2025-06-07', '09:05:00', '10:00:00', 'escola', 8, 'ponto_embarque', 2, 'volta', 'agendada', 55),
(1, 1, '2025-06-07', '10:05:00', '11:00:00', 'ponto_embarque', 1, 'escola', 6, 'ida', 'agendada', 55),
(1, 1, '2025-06-07', '11:05:00', '12:00:00', 'ponto_embarque', 2, 'escola', 8, 'ida', 'agendada', 55),
(1, 1, '2025-06-07', '12:05:00', '13:00:00', 'escola', 6, 'ponto_embarque', 1, 'volta', 'agendada', 55),
(1, 1, '2025-06-07', '13:05:00', '14:00:00', 'escola', 8, 'ponto_embarque', 2, 'volta', 'agendada', 55),
(1, 1, '2025-06-07', '14:05:00', '15:00:00', 'ponto_embarque', 1, 'escola', 6, 'ida', 'agendada', 55),
(1, 1, '2025-06-07', '15:05:00', '16:00:00', 'ponto_embarque', 2, 'escola', 8, 'ida', 'agendada', 55),
(1, 1, '2025-06-07', '13:00:00', '15:00:00', 'escola', 6, 'ponto_embarque', 1, 'volta', 'agendada', 55),
(1, 1, '2025-06-07', '16:05:00', '17:00:00', 'escola', 6, 'ponto_embarque', 1, 'volta', 'agendada', 55),
(1, 1, '2025-06-07', '17:05:00', '18:00:00', 'escola', 8, 'ponto_embarque', 2, 'volta', 'agendada', 55),
(1, 1, '2025-06-07', '18:05:00', '19:00:00', 'ponto_embarque', 1, 'escola', 6, 'ida', 'agendada', 55),
(1, 1, '2025-06-07', '15:15:00', '17:30:00', 'escola', 6, 'ponto_embarque', 1, 'volta', 'agendada', 55),
(1, 1, '2025-06-07', '19:05:00', '20:00:00', 'ponto_embarque', 2, 'escola', 8, 'ida', 'agendada', 55),
-- ONIBUS 2
(2, 2, '2025-06-06', '06:00:00', '07:00:00', 'ponto_embarque', 3, 'escola', 1, 'ida', 'agendada', 60),
(2, 2, '2025-06-06', '07:05:00', '08:00:00', 'ponto_embarque', 4, 'escola', 2, 'ida', 'agendada', 55),
(2, 2, '2025-06-06', '08:05:00', '09:00:00', 'escola', 1, 'ponto_embarque', 3, 'volta', 'agendada', 55),
(2, 2, '2025-06-06', '09:05:00', '10:00:00', 'escola', 2, 'ponto_embarque', 4, 'volta', 'agendada', 55),
(2, 2, '2025-06-06', '10:05:00', '11:00:00', 'ponto_embarque', 3, 'escola', 1, 'ida', 'agendada', 55),
(2, 2,'2025-06-06', '11:05:00', '12:00:00', 'ponto_embarque', 4, 'escola', 2, 'ida', 'agendada', 55),
(2, 2, '2025-06-06', '12:05:00', '13:00:00', 'escola', 1, 'ponto_embarque', 3, 'volta', 'agendada', 55),
(2, 2, '2025-06-06', '13:05:00', '14:00:00', 'escola', 2, 'ponto_embarque', 4, 'volta', 'agendada', 55),
(2, 2, '2025-06-05', '14:05:00', '15:00:00', 'ponto_embarque', 3, 'escola', 1, 'ida', 'agendada', 55),
(2, 2, '2025-06-05', '15:05:00', '16:00:00', 'ponto_embarque', 4, 'escola', 2, 'ida', 'agendada', 55),
(2, 2, '2025-06-05', '16:05:00', '17:00:00', 'escola', 1, 'ponto_embarque', 3, 'volta', 'agendada', 55),
(2, 2, '2025-06-05', '17:05:00', '18:00:00', 'escola', 2, 'ponto_embarque', 4, 'volta', 'agendada', 55),
(2, 2, '2025-06-05', '18:05:00', '19:00:00', 'ponto_embarque', 3, 'escola', 1, 'ida', 'agendada', 55),
(2, 2, '2025-06-05', '19:05:00', '20:00:00', 'ponto_embarque', 4, 'escola', 2, 'ida', 'agendada', 55),
(2, 2, '2025-06-05', '20:05:00', '21:00:00', 'escola', 1, 'ponto_embarque', 3, 'volta', 'agendada', 55),
(2, 2, '2025-06-05', '21:05:00', '22:00:00', 'escola', 2, 'ponto_embarque', 4, 'volta', 'agendada', 55),
-- ONIBUS 3
(3, 3, '2025-06-04', '06:00:00', '07:00:00', 'ponto_embarque', 5, 'escola', 3, 'ida', 'agendada', 60),
(3, 3, '2025-06-04', '07:05:00', '08:00:00', 'ponto_embarque', 6, 'escola', 4, 'ida', 'agendada', 55),
(3, 3, '2025-06-04', '08:05:00', '09:00:00', 'escola', 3, 'ponto_embarque', 5, 'volta', 'agendada', 55),
(3, 3, '2025-06-04', '09:05:00', '10:00:00', 'escola', 4, 'ponto_embarque', 6, 'volta', 'agendada', 55),
(3, 3, '2025-06-04', '10:05:00', '11:00:00', 'ponto_embarque', 5, 'escola', 3, 'ida', 'agendada', 55),
(3, 3, '2025-06-04', '11:05:00', '12:00:00', 'ponto_embarque', 6, 'escola', 4, 'ida', 'agendada', 55),
(3, 3, '2025-06-04', '12:05:00', '13:00:00', 'escola', 3, 'ponto_embarque', 5, 'volta', 'agendada', 55),
(3, 3, '2025-06-04', '13:05:00', '14:00:00', 'escola', 4, 'ponto_embarque', 6, 'volta', 'agendada', 55),
(3, 3, '2025-06-04', '14:05:00', '15:00:00', 'ponto_embarque', 5, 'escola', 3, 'ida', 'agendada', 55),
(3, 3, '2025-06-04', '15:05:00', '16:00:00', 'ponto_embarque', 6, 'escola', 4, 'ida', 'agendada', 55),
(3, 3, '2025-06-04', '16:05:00', '17:00:00', 'escola', 3, 'ponto_embarque', 5, 'volta', 'agendada', 55),
(3, 3, '2025-06-03', '17:05:00', '18:00:00', 'escola', 4, 'ponto_embarque', 6, 'volta', 'agendada', 55),
(3, 3, '2025-06-03', '18:05:00', '19:00:00', 'ponto_embarque', 5, 'escola', 3, 'ida', 'agendada', 55),
(3, 3, '2025-06-03', '19:05:00', '20:00:00', 'ponto_embarque', 6, 'escola', 4, 'ida', 'agendada', 55),
(3, 3, '2025-06-03', '20:05:00', '21:00:00', 'escola', 3, 'ponto_embarque', 5, 'volta', 'agendada', 55),
(3, 3, '2025-06-03', '21:05:00', '22:00:00', 'escola', 4, 'ponto_embarque', 6, 'volta', 'agendada', 55),
-- ONIBUS 4
(4, 4, '2025-06-02', '06:00:00', '07:00:00', 'ponto_embarque', 7, 'escola', 5, 'ida', 'agendada', 60),
(4, 4, '2025-06-02', '07:05:00', '08:00:00', 'ponto_embarque', 8, 'escola', 7, 'ida', 'agendada', 55),
(4, 4, '2025-06-02', '08:05:00', '09:00:00', 'escola', 5, 'ponto_embarque', 7, 'volta', 'agendada', 55),
(4, 4, '2025-06-02', '09:05:00', '10:00:00', 'escola', 7, 'ponto_embarque', 8, 'volta', 'agendada', 55),
(4, 4, '2025-06-02', '10:05:00', '11:00:00', 'ponto_embarque', 7, 'escola', 5, 'ida', 'agendada', 55),
(4, 4, '2025-06-02', '11:05:00', '12:00:00', 'ponto_embarque', 8, 'escola', 7, 'ida', 'agendada', 55),
(4, 4, '2025-06-02', '12:05:00', '13:00:00', 'escola', 5, 'ponto_embarque', 7, 'volta', 'agendada', 55),
(4, 4, '2025-06-02', '13:05:00', '14:00:00', 'escola', 7, 'ponto_embarque', 8, 'volta', 'agendada', 55),
(4, 4, '2025-06-02', '07:05:00', '13:00:00', 'ponto_embarque', 7, 'escola', 5, 'ida', 'agendada', 55),
(4, 4, '2025-06-02', '15:05:00', '16:00:00', 'ponto_embarque', 8, 'escola', 7, 'ida', 'agendada', 55),
(4, 4, '2025-06-02', '16:05:00', '17:00:00', 'escola', 5, 'ponto_embarque', 7, 'volta', 'agendada', 55),
(4, 4, '2025-06-02', '17:05:00', '18:00:00', 'escola', 7, 'ponto_embarque', 8, 'volta', 'agendada', 55),
(4, 4, '2025-06-02', '17:05:00', '22:00:00', 'ponto_embarque', 7, 'escola', 5, 'ida', 'agendada', 55),
(4, 4, '2025-06-02', '19:05:00', '20:00:00', 'ponto_embarque', 8, 'escola', 7, 'ida', 'agendada', 55),
(4, 4, '2025-06-02', '20:05:00', '21:00:00', 'escola', 5, 'ponto_embarque', 7, 'volta', 'agendada', 55),
(4, 4, '2025-06-02', '21:05:00', '22:00:00', 'escola', 7, 'ponto_embarque', 8, 'volta', 'agendada', 55),

(4, 4, '2025-06-02', '06:30:00', '07:30:00', 'ponto_embarque', 7, 'escola', 5, 'ida', 'agendada', 60),
(4, 4, '2025-06-02', '07:35:00', '08:30:00', 'ponto_embarque', 8, 'escola', 7, 'ida', 'agendada', 55),
(4, 4, '2025-06-02', '08:35:00', '09:30:00', 'escola', 5, 'ponto_embarque', 7, 'volta', 'agendada', 55),
(4, 4, '2025-06-02', '09:35:00', '10:30:00', 'escola', 7, 'ponto_embarque', 8, 'volta', 'agendada', 55),
(4, 4, '2025-06-02', '10:35:00', '11:30:00', 'ponto_embarque', 7, 'escola', 5, 'ida', 'agendada', 55),
(4, 4, '2025-06-02', '11:35:00', '12:30:00', 'ponto_embarque', 8, 'escola', 7, 'ida', 'agendada', 55),
(4, 4, '2025-06-02', '12:35:00', '13:30:00', 'escola', 5, 'ponto_embarque', 7, 'volta', 'agendada', 55),
(4, 4, '2025-06-02', '13:35:00', '14:30:00', 'escola', 7, 'ponto_embarque', 8, 'volta', 'agendada', 55),
(4, 4, '2025-06-02', '07:35:00', '13:30:00', 'ponto_embarque', 7, 'escola', 5, 'ida', 'agendada', 55),
(4, 4, '2025-06-02', '15:35:00', '16:30:00', 'ponto_embarque', 8, 'escola', 7, 'ida', 'agendada', 55),
(4, 4, '2025-06-02', '16:35:00', '17:30:00', 'escola', 5, 'ponto_embarque', 7, 'volta', 'agendada', 55),
(4, 4, '2025-06-02', '17:35:00', '18:30:00', 'escola', 7, 'ponto_embarque', 8, 'volta', 'agendada', 55),
(4, 4, '2025-06-02', '17:35:00', '22:30:00', 'ponto_embarque', 7, 'escola', 5, 'ida', 'agendada', 55),
(4, 4, '2025-06-02', '19:35:00', '20:30:00', 'ponto_embarque', 8, 'escola', 7, 'ida', 'agendada', 55),
(4, 4, '2025-06-02', '20:35:00', '21:30:00', 'escola', 5, 'ponto_embarque', 7, 'volta', 'agendada', 55),
(4, 4, '2025-06-02', '21:35:00', '22:30:00', 'escola', 7, 'ponto_embarque', 8, 'volta', 'agendada', 55);

/*
select *from viagens;
-- funcao de contar tipo de usuarios (gráfico de pizza)
SELECT 'Alunos' AS tipo, COUNT(*) AS quantidade FROM alunos
UNION ALL
SELECT 'Motoristas' AS tipo, COUNT(*) AS quantidade FROM motoristas
UNION ALL
SELECT 'Responsáveis' AS tipo, COUNT(*) AS quantidade FROM responsaveis
UNION ALL
SELECT 'Administradores' AS tipo, COUNT(*) AS quantidade FROM adm;
*/