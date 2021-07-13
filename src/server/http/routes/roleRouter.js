import express from 'express'
import * as roleController from '../../../controllers/roleController.js';

const router = express.Router();

router.get('/', (req, res, next)=>{
    roleController.findAll(req, res, next);
});

export default router;
