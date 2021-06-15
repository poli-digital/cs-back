import express from 'express'
import * as configPluginsPipeController from '../../../controllers/configPluginsPipeController.js'

const router = express.Router();

router.get('/', (req, res, next)=>{
    configPluginsPipeController.findAll(req, res, next);
});

router.get('/:id', (req, res, next)=>{
    configPluginsPipeController.findOne(req, res, next);
});

router.post('/', (req, res, next)=>{
    configPluginsPipeController.insertOne(req, res, next);
});

router.put('/:id', (req, res, next)=>{
    configPluginsPipeController.updateOne(req, res, next);
});

router.delete('/:id', (req, res, next)=>{
    configPluginsPipeController.destroyOne(req, res, next);
});



export default router;