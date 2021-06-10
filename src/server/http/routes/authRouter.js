import express from 'express'
import * as authController from '../../../controllers/authController.js'

const router = express.Router();

// Fazer login
router.post("/login", (req, res, next)=>{
    authController.login(req, res, next);
});

router.post("/teste", authController.auth, (req, res, next)=>{
    res.send("teste");
});

export default router;
