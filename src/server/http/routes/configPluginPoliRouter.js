import express from 'express'
import * as configPluginsPoliController from '../../../controllers/configPluginsPoliController.js'

const router = express.Router();

router.get('/', (req, res, next)=>{
    configPluginsPoliController.findAll(req, res, next);
});

router.get('/:id', (req, res, next)=>{
    configPluginsPoliController.findOne(req, res, next);
});

router.post('/', (req, res, next)=>{
    configPluginsPoliController.insertOne(req, res, next);
});

router.put('/:id', (req, res, next)=>{
    configPluginsPoliController.updateOne(req, res, next);
});

router.delete('/:id', (req, res, next)=>{
    configPluginsPoliController.destroyOne(req, res, next);
});

export default router;