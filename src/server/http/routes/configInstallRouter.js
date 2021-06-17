import express from 'express'
import * as configInstallController from '../../../controllers/configInstallController.js';

const router = express.Router();

router.get('/', (req, res, next)=>{
    configInstallController.firstConfig(req, res, next);
});

export default router;