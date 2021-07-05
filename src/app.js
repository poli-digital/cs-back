import './config/env.js';
import server from './server/http/server.js'

server.listen(process.env.SERVER_PORT, ()=>{
    console.log(`Rodando na porta ${process.env.SERVER_PORT}`)
});