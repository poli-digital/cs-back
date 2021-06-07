import express from 'express'
import connection from '../../../lib/database/knex.js'

const router = express.Router();

// Consulta usuários
router.get("/", (req, res, next)=>{
    connection('usuario').then((dados)=>{
        res.send(dados);
    }, next);
});

// Salva um usuário
router.post("/", (req, res, next)=>{
    connection('usuario').insert(req.body).then((dados)=>{
        res.send(dados);
    }, next);
});

// Busca um usuário especifico
router.get("/:id", (req, res, next)=>{

    const {id} = req.params;

    connection('usuario').where('id', id).first().then((dados)=>{
        if(!dados) res.send('Nada foi encontrado!')
        res.send(dados);
    }, next);
});

// Atualiza um usuário especifico
router.put("/:id", (req, res, next)=>{

    const {id} = req.params;

    connection('usuario').where('id', id).update(req.body).then((dados)=>{
        if(!dados) res.send('Nada foi encontrado!')
        res.send('Dados atualizados');
    }, next);
});

// Remove um usuário especifico
router.delete("/:id", (req, res, next)=>{

    const {id} = req.params;

    connection('usuario').where('id', id).delete().then((dados)=>{
        if(!dados) res.send('Nada foi encontrado!')
        res.send('Dados excluidos');
    }, next);
});

export default router;
