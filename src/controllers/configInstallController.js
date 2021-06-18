import mariadb from 'mariadb'
import { scriptCreateTablesInDatabase, scriptInsertDataInTables } from '../../docs/scripts/manipulateDatabase.js';

async function firstConfigMariaDb(req, res, next) {

    let connection;
    let database = req.body.database;

    let config = {
        host: req.body.host,
        port: req.body.port,
        user: req.body.username,
        password: req.body.password,
    }

    try {

        // CRIA BANCO CASO NÃO EXISTA
        connection = await mariadb.createConnection(config);
        await connection.query(`CREATE DATABASE IF NOT EXISTS ${database}`);
        connection.end();
        connection = null;
        console.log(`The database (${database}) was created successfully!`);

        // INSERE CONFIGURAÇÕES ESSENCIAIS NO OBJETO CONFIG E CRIA UMA NOVA CONEXÃO
        config.database = database;
        config.multipleStatements = true;
        connection = await mariadb.createConnection(config);
        connection.beginTransaction();

        // CRIA AS TABELAS CASO NÃO EXISTA
        await connection.query(scriptCreateTablesInDatabase);
        console.log(`Tables were created successfully in database ${database}`);

        // INSERE OS DADOS INICIAIS NAS TABELAS
        await connection.query(scriptInsertDataInTables);
        console.log(`Tables were successfully populated in database ${database}`);
        
        connection.commit();
        connection.end();

        let mensagemConclusao = `Settings completed successfully!`
        console.log(mensagemConclusao);
        res.status(200).json({message:mensagemConclusao});

    } catch (error) {

        if(connection != undefined){
            connection.rollback();
            connection.end();
        }

        const mensagemErro = `Error trying to create database: ${database}`;
        console.log(mensagemErro, error);
        res.status(401).json({message:mensagemErro});
    }
    
}

export {firstConfigMariaDb};