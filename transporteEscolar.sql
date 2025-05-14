create database transporteEscolar ;
use transporteEscolar;

#tabela motoristas
create table motoristas(
cpf int not null primary key,
nome_motorista text not null,
vencimento_habilitacao date not null,
onibus_id int,
email text not null,
senha text not null
);

#tabela responsaveis/professores e etc.
create table responsaveis(
cpf int not null primary key,
nome_responsavel text not null,
instituicao_responsavel varchar (50),
telefone int not null,
email text not null,
senha text not null
);

#tabela dos veiculos
create table veiculos(
id_veiculo int not null auto_increment,
motorista text,
fabricacao date not null,
instituicao text not null,
foreign key (motorista) references motoristas(nome_motorista) on delete cascade on update cascade,
foreign key (instituicao) references instituicao(nome_instituicao)on delete cascade on update cascade
);

#tabela da instituição/escola
create table instituicao (
id int not null auto_increment primary key,
nome_instituicao varchar(120) not null,
veiculos_qtd int,
vencimento_contrato date,
senha text not null
);

#tabela adm
create table adms(
email varchar(50) not null,
senha text not null
);

#tabela curriculos
create table curriculos (
cpf_candidato int not null primary key,
nome_candidato text not null,
email varchar(50) not null,
telefone int ,
curriculo longblob #carrega arquivos com mts bits(eu acho)
);



