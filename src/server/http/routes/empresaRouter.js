import express from 'express'
import * as empresaController from '../../../controllers/empresasController.js'
import { podeCriarUmaEmpresa, podeEditarUmaEmpresa, podeRemoverUmaEmpresa } from '../../../controllers/validacaoController.js';

const router = express.Router();

// Consulta empresas
router.get("/", (req, res, next)=>{
    empresaController.findAll(req, res, next);
});

// Salva uma empresa
router.post("/", podeCriarUmaEmpresa, (req, res, next)=>{
    empresaController.insertOne(req, res, next);
});

// Busca uma empresa especifica
router.get("/:id", (req, res, next)=>{
    empresaController.findOne(req, res, next);
});

// Atualiza uma empresa especifica
router.put("/:id", podeEditarUmaEmpresa, (req, res, next)=>{
    empresaController.updateOne(req, res, next);
});

// Remove uma empresa especifica
router.delete("/:id", podeRemoverUmaEmpresa, (req, res, next)=>{
    empresaController.destroyOne(req, res, next);
});

export default router;