import express from 'express'
import * as companyController from '../../../controllers/companyController.js'
import { 
    canAccessRouteToCreateACompany, 
    canAccessRouteToEditACompany, 
    canAccessRouteToRemoveACompany, 
    validateCompanyManipulation} from '../../../controllers/validationController.js';

const router = express.Router();

// Consulta empresas
router.get("/", (req, res, next)=>{
    companyController.findAll(req, res, next);
});

// Salva uma empresa
router.post("/", canAccessRouteToCreateACompany, (req, res, next)=>{
    companyController.insertOne(req, res, next);
});

// Busca uma empresa especifica
router.get("/:id", (req, res, next)=>{
    companyController.findOne(req, res, next);
});

// Atualiza uma empresa especifica
router.put("/:id", canAccessRouteToEditACompany, validateCompanyManipulation, (req, res, next)=>{
    companyController.updateOne(req, res, next);
});

// Remove uma empresa especifica
router.delete("/:id", canAccessRouteToRemoveACompany, validateCompanyManipulation, (req, res, next)=>{
    companyController.destroyOne(req, res, next);
});

export default router;