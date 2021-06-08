import server from './server/http/server.js'
import database from './lib/database/sequelize.js'
import config from './config/config.js'

(async()=>{
    try {
        await database.authenticate();
        console.log('Conexão foi estabelecida com sucesso!');
      } catch (error) {
        console.error('Não foi possível conectar à base de dados:', error);
      }
})();

server.listen(config.SERVER_PORT, ()=>{
    console.log('Rodando na porta 3000')
});