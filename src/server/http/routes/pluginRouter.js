import express from 'express'
import * as pluginsController from '../../../controllers/pluginsController.js';

const router = express.Router();

router.get('/', (req, res, next)=>{
    pluginsController.findAll(req, res, next);
});

export default router;
