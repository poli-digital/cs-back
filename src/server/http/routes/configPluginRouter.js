import express from 'express'
import * as configPluginsController from '../../../controllers/configPluginsController.js'
import { canCreateAConfigurationOfAPlugin, canEditAConfigurationOfAPlugin, canRemoveAConfigurationOfAPlugin } from '../../../controllers/validacaoController.js';

const router = express.Router();

router.get('/', (req, res, next)=>{
    configPluginsController.findAll(req, res, next);
});

router.get('/:id', (req, res, next)=>{
    configPluginsController.findOne(req, res, next);
});

router.post('/', canCreateAConfigurationOfAPlugin, (req, res, next)=>{
    configPluginsController.insertOne(req, res, next);
});

router.put('/:id', canEditAConfigurationOfAPlugin, (req, res, next)=>{
    configPluginsController.updateOne(req, res, next);
});

router.delete('/:id', canRemoveAConfigurationOfAPlugin, (req, res, next)=>{
    configPluginsController.destroyOne(req, res, next);
});



export default router;