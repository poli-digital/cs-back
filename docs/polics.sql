
------------------------------ Popular Banco ------------------------------

CREATE TABLE empresas(
	id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
	nome varchar(255) NOT NULL,
	cnpj varchar(255) NOT NULL UNIQUE,
	created_at DATETIME,
	updated_at DATETIME
);

INSERT into empresas(nome, cnpj) VALUES ('Default', '');

CREATE TABLE papeis(
	id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
	nome varchar(255) NOT NULL UNIQUE,
	apelido varchar(255) NOT NULL
);

INSERT into papeis(nome, apelido) VALUES ('super', 'Super Usuário');
INSERT into papeis(nome, apelido) VALUES ('owner', 'Dono');
INSERT into papeis(nome, apelido) VALUES ('manager', 'Gerente');
INSERT into papeis(nome, apelido) VALUES ('user', 'Usuário');

CREATE TABLE permissoes(
	id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
	nome varchar(255) NOT NULL UNIQUE,
	apelido varchar(255) NOT NULL
);

INSERT into permissoes(nome, apelido) VALUES ('criar_empresa', 'Criar empresas');
INSERT into permissoes(nome, apelido) VALUES ('editar_empresa', 'Editar empresas');
INSERT into permissoes(nome, apelido) VALUES ('excluir_empresa', 'Excluir empresas');
INSERT into permissoes(nome, apelido) VALUES ('criar_usuario', 'Criar usuários');
INSERT into permissoes(nome, apelido) VALUES ('editar_usuario', 'Editar usuários');
INSERT into permissoes(nome, apelido) VALUES ('excluir_usuario', 'Excluir usuários');
INSERT into permissoes(nome, apelido) VALUES ('criar_plugin', 'Criar plugins');
INSERT into permissoes(nome, apelido) VALUES ('editar_plugin', 'Editar plugins');
INSERT into permissoes(nome, apelido) VALUES ('excluir_plugin', 'Excluir plugins');

CREATE TABLE papeis_permissoes(
	id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
	papel_id int NOT NULL,
	permissao_id int NOT NULL,
	FOREIGN KEY (papel_id) REFERENCES papeis(id),
	FOREIGN KEY (permissao_id) REFERENCES permissoes(id)
);

INSERT into papeis_permissoes(papel_id, permissao_id) VALUES (1,1);
INSERT into papeis_permissoes(papel_id, permissao_id) VALUES (1,2);
INSERT into papeis_permissoes(papel_id, permissao_id) VALUES (1,3);
INSERT into papeis_permissoes(papel_id, permissao_id) VALUES (1,4);
INSERT into papeis_permissoes(papel_id, permissao_id) VALUES (1,5);
INSERT into papeis_permissoes(papel_id, permissao_id) VALUES (1,6);
INSERT into papeis_permissoes(papel_id, permissao_id) VALUES (1,7);
INSERT into papeis_permissoes(papel_id, permissao_id) VALUES (1,8);
INSERT into papeis_permissoes(papel_id, permissao_id) VALUES (1,9);
INSERT into papeis_permissoes(papel_id, permissao_id) VALUES (2,4);
INSERT into papeis_permissoes(papel_id, permissao_id) VALUES (2,5);
INSERT into papeis_permissoes(papel_id, permissao_id) VALUES (2,6);
INSERT into papeis_permissoes(papel_id, permissao_id) VALUES (2,7);
INSERT into papeis_permissoes(papel_id, permissao_id) VALUES (2,8);
INSERT into papeis_permissoes(papel_id, permissao_id) VALUES (2,9);
INSERT into papeis_permissoes(papel_id, permissao_id) VALUES (3,7);
INSERT into papeis_permissoes(papel_id, permissao_id) VALUES (3,8);
INSERT into papeis_permissoes(papel_id, permissao_id) VALUES (3,9);

CREATE TABLE usuarios(
	id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
	nome varchar(255) NOT NULL,
	email varchar(255) NOT NULL UNIQUE,
	senha varchar(255) NOT NULL,
	bloqueado BOOLEAN,
	papel_id int NOT NULL,
    empresa_id int NOT NULL,
    FOREIGN KEY (papel_id) REFERENCES papeis(id),
	FOREIGN KEY (empresa_id) REFERENCES empresas(id),
	created_at DATETIME,
	updated_at DATETIME
);

INSERT into usuarios(nome, email, senha, bloqueado, papel_id, empresa_id) 
VALUES ('Administrador Geral', 'admin@polics.com.br', '123456', false, 1, 1);






------------------------------ Drops ------------------------------

DROP TABLE usuarios;
DROP TABLE papeis_permissoes;
DROP TABLE papeis;
DROP TABLE permissoes;
DROP TABLE empresas;