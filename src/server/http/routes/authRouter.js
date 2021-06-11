import express from 'express'
import {login} from '../../../controllers/authController.js'

const router = express.Router();

// Fazer login
router.post("/login", (req, res, next)=>{
    login(req, res, next);
});

export default router;
