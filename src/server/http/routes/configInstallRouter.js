import express from 'express'
import * as configInstallController from '../../../controllers/configInstallController.js';

const router = express.Router();

router.post('/firstConfigMariaDb', (req, res, next)=>{
    configInstallController.firstConfigMariaDb(req, res, next);
});

export default router;