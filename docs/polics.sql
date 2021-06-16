
#------------------------------ Popular Banco ------------------------------

CREATE TABLE companies(
	id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
	name varchar(255) NOT NULL,
	cnpj varchar(255) NOT NULL UNIQUE,
	created_at DATETIME,
	updated_at DATETIME
);

INSERT into companies(name, cnpj) VALUES ('Default', '');

CREATE TABLE roles(
	id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
	name varchar(255) NOT NULL UNIQUE,
	nickname varchar(255) NOT NULL
);

INSERT into roles(name, nickname) VALUES ('super', 'Super Usuário');
INSERT into roles(name, nickname) VALUES ('owner', 'Dono');
INSERT into roles(name, nickname) VALUES ('manager', 'Gerente');
INSERT into roles(name, nickname) VALUES ('user', 'Usuário');

CREATE TABLE permissions(
	id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
	name varchar(255) NOT NULL UNIQUE,
	nickname varchar(255) NOT NULL
);

INSERT into permissions(name, nickname) VALUES ('criar_empresa', 'Criar empresas');
INSERT into permissions(name, nickname) VALUES ('editar_empresa', 'Editar empresas');
INSERT into permissions(name, nickname) VALUES ('excluir_empresa', 'Excluir empresas');
INSERT into permissions(name, nickname) VALUES ('criar_usuario', 'Criar usuários');
INSERT into permissions(name, nickname) VALUES ('editar_usuario', 'Editar usuários');
INSERT into permissions(name, nickname) VALUES ('excluir_usuario', 'Excluir usuários');
INSERT into permissions(name, nickname) VALUES ('criar_plugin', 'Criar plugins');
INSERT into permissions(name, nickname) VALUES ('editar_plugin', 'Editar plugins');
INSERT into permissions(name, nickname) VALUES ('excluir_plugin', 'Excluir plugins');

CREATE TABLE roles_permissions(
	id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
	role_id int NOT NULL,
	permission_id int NOT NULL,
	FOREIGN KEY (role_id) REFERENCES roles(id),
	FOREIGN KEY (permission_id) REFERENCES permissions(id)
);

#-- Superuser (Este é usuário global que o administrador da plataforma tem acesso.
#-- Este usuário tem a possibilidade de criar empresa, editar, excluir etc)
INSERT into roles_permissions(role_id, permission_id) VALUES (1,1);
INSERT into roles_permissions(role_id, permission_id) VALUES (1,2);
INSERT into roles_permissions(role_id, permission_id) VALUES (1,3);
INSERT into roles_permissions(role_id, permission_id) VALUES (1,4);
INSERT into roles_permissions(role_id, permission_id) VALUES (1,5);
INSERT into roles_permissions(role_id, permission_id) VALUES (1,6);
INSERT into roles_permissions(role_id, permission_id) VALUES (1,7);
INSERT into roles_permissions(role_id, permission_id) VALUES (1,8);
INSERT into roles_permissions(role_id, permission_id) VALUES (1,9);
#-- Dono (Owner: Pode exlcuir a empresa e todas as demais funções)
INSERT into roles_permissions(role_id, permission_id) VALUES (2,2);
INSERT into roles_permissions(role_id, permission_id) VALUES (2,3);
INSERT into roles_permissions(role_id, permission_id) VALUES (2,4);
INSERT into roles_permissions(role_id, permission_id) VALUES (2,5);
INSERT into roles_permissions(role_id, permission_id) VALUES (2,6);
INSERT into roles_permissions(role_id, permission_id) VALUES (2,7);
INSERT into roles_permissions(role_id, permission_id) VALUES (2,8);
INSERT into roles_permissions(role_id, permission_id) VALUES (2,9);
#-- Gerente (Gerente: pode tudo exceto excluir a conta) -- acho que seja excluir empresa
INSERT into roles_permissions(role_id, permission_id) VALUES (3,2);
INSERT into roles_permissions(role_id, permission_id) VALUES (3,4);
INSERT into roles_permissions(role_id, permission_id) VALUES (3,5);
INSERT into roles_permissions(role_id, permission_id) VALUES (3,6);
INSERT into roles_permissions(role_id, permission_id) VALUES (3,7);
INSERT into roles_permissions(role_id, permission_id) VALUES (3,8);
INSERT into roles_permissions(role_id, permission_id) VALUES (3,9);
#-- Usuario (Usuário: acesso de leitura (somente ao dashboard - pode modificar dados como adicionar o ID caso o plugin permita))

CREATE TABLE users(
	id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
	name varchar(255) NOT NULL,
	email varchar(255) NOT NULL UNIQUE,
	password varchar(255) NOT NULL,
	blocked BOOLEAN,
	role_id int NOT NULL,
    company_id int NOT NULL,
    FOREIGN KEY (role_id) REFERENCES roles(id),
	FOREIGN KEY (company_id) REFERENCES companies(id),
	created_at DATETIME,
	updated_at DATETIME
);

INSERT into users(name, email, password, blocked, role_id, company_id) 
VALUES ('Administrador Geral', 'admin@polics.com.br', '$2a$10$IQ/.8NG5Np0OaLFVOVGjP.RZDXwBe5yENT4BfFy0CWw7t5Icj0UMC', false, 1, 1);


CREATE TABLE plugins(
	id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
	name varchar(255) NOT NULL,
	nickname varchar(255),
	title varchar(255) NOT NULL,
	description TEXT NOT NULL
);

INSERT into plugins(name, title, description) VALUES ('Piperun', 'Piperun', 'Este plugin oferece um conjunto chamado 
	de Atividades onde existe um acordeon com a contagem de atividades e o nome de um funil especifico, sendo possível 
	abrir o mesmo e visualizar uma planilha com os campos (Atividade,Titulo,Notas,Criação,Dono,Etapa,Funil,Status)');
INSERT into plugins(name, title, description) VALUES ('Polichat', 'Polichat', 'Este plugin oferece um conjunto chamado de 
	Contatos onde o mesmo traz uma tabela contendo os campos (Id,Nome,Número,Empresa,Conversa)');
INSERT into plugins(name, title, description) VALUES ('Superlógica', 'Superlógica', 'Pagamentos');
INSERT into plugins(name, title, description) VALUES ('Datawarehouse', 'Datawarehouse', 'Banco pessoal');

CREATE TABLE config_plugins(
	id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
	company_id int NOT NULL,
	plugin_id int NOT NULL,
	FOREIGN KEY (company_id) REFERENCES companies(id),
	FOREIGN KEY (plugin_id) REFERENCES plugins(id),
	token TEXT NOT NULL,
	visible BOOLEAN NOT NULL,
	title varchar(255) NOT NULL,
	use_accordion BOOLEAN NOT NULL,
	field_id BOOLEAN NOT NULL,
	field_activity BOOLEAN NOT NULL,
	field_title BOOLEAN NOT NULL,
	field_notes BOOLEAN NOT NULL,
	field_creation BOOLEAN NOT NULL,
	field_owner BOOLEAN NOT NULL,
	field_stage BOOLEAN NOT NULL,
	field_funnel BOOLEAN NOT NULL,
	field_status BOOLEAN NOT NULL,
	field_id_contact BOOLEAN NOT NULL,
	field_name BOOLEAN NOT NULL,
	field_number BOOLEAN NOT NULL,
	field_company BOOLEAN NOT NULL,
	field_talk BOOLEAN NOT NULL,
	created_at DATETIME,
	updated_at DATETIME
);

INSERT into config_plugins(
	company_id, plugin_id, token, visible, title, use_accordion, field_id, field_activity, field_title,
	field_notes, field_creation, field_owner, field_stage, field_funnel, field_status, field_id_contact,
	field_name, field_number, field_company, field_talk
) VALUES (
	1, 1, 'ttt', true, 'Atividades', true, true, true, true, true, 
	true, true, true, true, true, true, true, true, true, true
);


#------------------------------ Drops ------------------------------

DROP TABLE users;
DROP TABLE roles_permissions;
DROP TABLE roles;
DROP TABLE permissions;
DROP TABLE config_plugins;
DROP TABLE plugins;
DROP TABLE companies;