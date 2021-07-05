import mariadb from 'mariadb'
import { scriptCreateTablesInDatabase, scriptInsertDataInTables } from '../../docs/scripts/manipulateDatabase.js';
import { writeFile } from '../helpers/fileHelper.js';
import database from '../lib/database/sequelize.js'

async function firstConfigMariaDb(req, res, next) {

    let connection;
    let databaseBody = req.body.database;

    let config = {
        host: req.body.host,
        port: req.body.port,
        user: req.body.username,
        password: req.body.password,
    }

    try {

        // CRIA BANCO CASO NÃO EXISTA
        connection = await mariadb.createConnection(config);
        await connection.query(`CREATE DATABASE IF NOT EXISTS ${databaseBody}`);
        connection.end();
        connection = null;
        console.log(`The database (${databaseBody}) was created successfully!`);

        // INSERE CONFIGURAÇÕES ESSENCIAIS NO OBJETO CONFIG E CRIA UMA NOVA CONEXÃO
        config.database = databaseBody;
        config.multipleStatements = true;
        connection = await mariadb.createConnection(config);
        connection.beginTransaction((err)=>{if(err)console.log('Error in beginTransaction')});

        // CRIA AS TABELAS CASO NÃO EXISTA
        await connection.query(scriptCreateTablesInDatabase);
        console.log(`Tables were created successfully in database ${databaseBody}`);

        // INSERE OS DADOS INICIAIS NAS TABELAS
        await connection.query(scriptInsertDataInTables);
        console.log(`Tables were successfully populated in database ${databaseBody}`);
        
        connection.commit((err)=>{if(err)console.log('Erro in commit')});
        connection.end();

        let textFile = `DB_HOST:'${config.host}'\n` + 
        `DB_PORT:${config.port}\n` +
        `DB_DATABASE:'${config.database}'\n` +
        `DB_USERNAME:'${config.user}'\n` +
        `DB_PASSWORD:'${config.password}'\n`;

        let isSuccessInWrite  = writeFile(textFile, './src/.env');
        if(isSuccessInWrite){
            console.log('File (.env) saved successfully!');

            let mensagemConclusao = `Settings completed successfully!`
            console.log(mensagemConclusao);
            res.status(200).json({message:mensagemConclusao});

        }else{
            console.log('Error saving (config.js) file.');
            res.status(401).json({message:'Error saving (config.js) file.'});
        }

        

    } catch (error) {

        if(connection != undefined){
            connection.rollback();
            connection.end();
        }

        const mensagemErro = `Error trying to create database: ${databaseBody}`;
        console.log(mensagemErro, error);
        res.status(401).json({message:mensagemErro});
    }
    
}

async function sincronizeTablesInDatabase() {
    try {
        await database.sync({ force: true });
        console.log("All models were synchronized successfully.");
    } catch (error) {
        console.error('Não foi possível conectar à base de dados:', error);
    }
}

export {firstConfigMariaDb};