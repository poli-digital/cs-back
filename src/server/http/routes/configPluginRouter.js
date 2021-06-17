import express from 'express'
import * as configPluginsController from '../../../controllers/configPluginsController.js'
import { 
    canAccessRouteToCreateAConfigPlugin, 
    canAccessRouteToEditAConfigPlugin, 
    canAccessRouteToRemoveAConfigPlugin, 
    validateConfigPluginManipulation } from '../../../controllers/validationController.js';

const router = express.Router();

//lista as configurações de plugins
router.get('/', (req, res, next)=>{
    configPluginsController.findAll(req, res, next);
});

//Obtem uma configuração de plugin especifica
router.get('/:id', (req, res, next)=>{
    configPluginsController.findOne(req, res, next);
});

//Insere uma nova configuração de plugin
router.post('/', canAccessRouteToCreateAConfigPlugin, (req, res, next)=>{
    configPluginsController.insertOne(req, res, next);
});

//Edita uma configuração de plugin
router.put('/:id', canAccessRouteToEditAConfigPlugin, validateConfigPluginManipulation, (req, res, next)=>{
    configPluginsController.updateOne(req, res, next);
});

//Deleta uma configuração de plugin
router.delete('/:id', canAccessRouteToRemoveAConfigPlugin, validateConfigPluginManipulation, (req, res, next)=>{
    configPluginsController.destroyOne(req, res, next);
});

export default router;