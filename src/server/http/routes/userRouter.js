import express from 'express'
import * as usersController from '../../../controllers/usersController.js'
import { podeCriarUmUsuario, podeEditarUmUsuario, podeRemoverUmUsuario } from '../../../controllers/validacaoController.js';

const router = express.Router();

// Consulta usuários
router.get("/", (req, res, next)=>{
    usersController.findAll(req, res, next);
});

// Salva um usuário
router.post("/", podeCriarUmUsuario, (req, res, next)=>{
    usersController.insertOne(req, res, next);
});

// Busca um usuário especifico
router.get("/:id", (req, res, next)=>{
    usersController.findOne(req, res, next);
});

// Atualiza um usuário especifico
router.put("/:id", podeEditarUmUsuario, (req, res, next)=>{
    usersController.updateOne(req, res, next);
});

// Remove um usuário especifico
router.delete("/:id", podeRemoverUmUsuario, (req, res, next)=>{
    usersController.destroyOne(req, res, next);
});

export default router;
