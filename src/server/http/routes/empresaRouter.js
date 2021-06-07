import express from 'express'
import connection from '../../../lib/database/knex.js'

const router = express.Router();

// Consulta empresas
router.get("/", (req, res, next)=>{
    connection('empresa').then((dados)=>{
        res.send(dados);
    }, next);
});

// Salva uma empresa
router.post("/", (req, res, next)=>{
    connection('empresa').insert(req.body).then((dados)=>{
        res.send(dados);
    }, next);
});

// Busca uma empresa especifica
router.get("/:id", (req, res, next)=>{

    const {id} = req.params;

    connection('empresa').where('id', id).first().then((dados)=>{
        if(!dados) res.send('Nada foi encontrado!')
        res.send(dados);
    }, next);
});

// Atualiza uma empresa especifica
router.put("/:id", (req, res, next)=>{

    const {id} = req.params;

    connection('empresa').where('id', id).update(req.body).then((dados)=>{
        if(!dados) res.send('Nada foi encontrado!')
        res.send('Dados atualizados');
    }, next);
});

// Remove uma empresa especifica
router.delete("/:id", (req, res, next)=>{

    const {id} = req.params;

    connection('empresa').where('id', id).delete().then((dados)=>{
        if(!dados) res.send('Nada foi encontrado!')
        res.send('Dados excluidos');
    }, next);
});

export default router;