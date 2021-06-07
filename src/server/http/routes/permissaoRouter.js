import express from 'express'
import connection from '../../../lib/database/knex.js'

const router = express.Router();

// Consulta permissões
router.get("/", (req, res, next)=>{
    connection('permissao').then((dados)=>{
        res.send(dados);
    }, next);
});

// Salva uma permissão
router.post("/", (req, res, next)=>{
    connection('permissao').insert(req.body).then((dados)=>{
        res.send(dados);
    }, next);
});

// Busca uma permissão especifica
router.get("/:id", (req, res, next)=>{

    const {id} = req.params;

    connection('permissao').where('id', id).first().then((dados)=>{
        if(!dados) res.send('Nada foi encontrado!')
        res.send(dados);
    }, next);
});

// Atualiza uma permissão especifica
router.put("/:id", (req, res, next)=>{

    const {id} = req.params;

    connection('permissao').where('id', id).update(req.body).then((dados)=>{
        if(!dados) res.send('Nada foi encontrado!')
        res.send('Dados atualizados');
    }, next);
});

// Remove uma permissão especifica
router.delete("/:id", (req, res, next)=>{

    const {id} = req.params;

    connection('permissao').where('id', id).delete().then((dados)=>{
        if(!dados) res.send('Nada foi encontrado!')
        res.send('Dados excluidos');
    }, next);
});

export default router;
