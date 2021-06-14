
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

-- Superuser (Este é usuário global que o administrador da plataforma tem acesso.
-- Este usuário tem a possibilidade de criar empresa, editar, excluir etc)
INSERT into papeis_permissoes(papel_id, permissao_id) VALUES (1,1);
INSERT into papeis_permissoes(papel_id, permissao_id) VALUES (1,2);
INSERT into papeis_permissoes(papel_id, permissao_id) VALUES (1,3);
INSERT into papeis_permissoes(papel_id, permissao_id) VALUES (1,4);
INSERT into papeis_permissoes(papel_id, permissao_id) VALUES (1,5);
INSERT into papeis_permissoes(papel_id, permissao_id) VALUES (1,6);
INSERT into papeis_permissoes(papel_id, permissao_id) VALUES (1,7);
INSERT into papeis_permissoes(papel_id, permissao_id) VALUES (1,8);
INSERT into papeis_permissoes(papel_id, permissao_id) VALUES (1,9);
-- Dono (Owner: Pode exlcuir a empresa e todas as demais funções)
INSERT into papeis_permissoes(papel_id, permissao_id) VALUES (2,2);
INSERT into papeis_permissoes(papel_id, permissao_id) VALUES (2,3);
INSERT into papeis_permissoes(papel_id, permissao_id) VALUES (2,4);
INSERT into papeis_permissoes(papel_id, permissao_id) VALUES (2,5);
INSERT into papeis_permissoes(papel_id, permissao_id) VALUES (2,6);
INSERT into papeis_permissoes(papel_id, permissao_id) VALUES (2,7);
INSERT into papeis_permissoes(papel_id, permissao_id) VALUES (2,8);
INSERT into papeis_permissoes(papel_id, permissao_id) VALUES (2,9);
-- Gerente (Gerente: pode tudo exceto excluir a conta) -- acho que seja excluir empresa
INSERT into papeis_permissoes(papel_id, permissao_id) VALUES (3,2);
INSERT into papeis_permissoes(papel_id, permissao_id) VALUES (3,4);
INSERT into papeis_permissoes(papel_id, permissao_id) VALUES (3,5);
INSERT into papeis_permissoes(papel_id, permissao_id) VALUES (3,6);
INSERT into papeis_permissoes(papel_id, permissao_id) VALUES (3,7);
INSERT into papeis_permissoes(papel_id, permissao_id) VALUES (3,8);
INSERT into papeis_permissoes(papel_id, permissao_id) VALUES (3,9);
-- Usuario (Usuário: acesso de leitura (somente ao dashboard - pode modificar dados como adicionar o ID caso o plugin permita))

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
VALUES ('Administrador Geral', 'admin@polics.com.br', '$2a$10$IQ/.8NG5Np0OaLFVOVGjP.RZDXwBe5yENT4BfFy0CWw7t5Icj0UMC', false, 1, 1);


CREATE TABLE plugins(
	id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
	nome varchar(255) NOT NULL,
	apelido varchar(255),
	titulo varchar(255) NOT NULL,
	descricao TEXT NOT NULL
);

INSERT into plugins(nome, titulo, descricao) VALUES ('Piperun', 'Piperun', 'Este plugin oferece um conjunto chamado 
	de Atividades onde existe um acordeon com a contagem de atividades e o nome de um funil especifico, sendo possível 
	abrir o mesmo e visualizar uma planilha com os campos (Atividade,Titulo,Notas,Criação,Dono,Etapa,Funil,Status)');
INSERT into plugins(nome, titulo, descricao) VALUES ('Polichat', 'Polichat', 'Este plugin oferece um conjunto chamado de 
	Contatos onde o mesmo traz uma tabela contendo os campos (Id,Nome,Número,Empresa,Conversa)');
INSERT into plugins(nome, titulo, descricao) VALUES ('Superlógica', 'Superlógica', 'Pagamentos');
INSERT into plugins(nome, titulo, descricao) VALUES ('Datawarehouse', 'Datawarehouse', 'Banco pessoal');

CREATE TABLE configuracao_plugin_pipe(
	id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
	empresa_id int NOT NULL,
	plugin_id int NOT NULL,
	FOREIGN KEY (empresa_id) REFERENCES empresas(id),
	FOREIGN KEY (plugin_id) REFERENCES plugins(id),
	token TEXT NOT NULL,
	visivel BOOLEAN NOT NULL,
	titulo varchar(255) NOT NULL,
	use_acordeon BOOLEAN NOT NULL,
	campo_id BOOLEAN NOT NULL,
	campo_atividade BOOLEAN NOT NULL,
	campo_titulo BOOLEAN NOT NULL,
	campo_notas BOOLEAN NOT NULL,
	campo_criacao BOOLEAN NOT NULL,
	campo_dono BOOLEAN NOT NULL,
	campo_etapa BOOLEAN NOT NULL,
	campo_funil BOOLEAN NOT NULL,
	campo_status BOOLEAN NOT NULL
);

INSERT into configuracao_plugin_pipe(
	empresa_id, plugin_id, token, visivel, titulo, use_acordeon, campo_id, campo_atividade, campo_titulo,
	campo_notas, campo_criacao, campo_dono, campo_etapa, campo_funil, campo_status
) VALUES (1, 1, 'ttt', true, 'Atividades', true, true, true, true, true, true, true, true, true, true);

CREATE TABLE configuracao_plugin_poli(
	id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
	empresa_id int NOT NULL,
	plugin_id int NOT NULL,
	FOREIGN KEY (empresa_id) REFERENCES empresas(id),
	FOREIGN KEY (plugin_id) REFERENCES plugins(id),
	token TEXT NOT NULL,
	visivel BOOLEAN NOT NULL,
	titulo varchar(255) NOT NULL,
	campo_id BOOLEAN NOT NULL,
	campo_id_contato BOOLEAN NOT NULL,
	campo_nome BOOLEAN NOT NULL,
	campo_numero BOOLEAN NOT NULL,
	campo_empresa BOOLEAN NOT NULL,
	campo_conversa BOOLEAN NOT NULL
);

INSERT into configuracao_plugin_poli(
	empresa_id, plugin_id, token, visivel, titulo, campo_id, campo_id_contato, campo_nome,
	campo_numero, campo_empresa, campo_conversa
) VALUES (1, 2, 'aaa', true, 'Contatos', true, true, true, true, true, true );




------------------------------ Drops ------------------------------

DROP TABLE usuarios;
DROP TABLE papeis_permissoes;
DROP TABLE papeis;
DROP TABLE permissoes;
DROP TABLE configuracao_plugin_pipe;
DROP TABLE configuracao_plugin_poli;
DROP TABLE plugins;
DROP TABLE empresas;