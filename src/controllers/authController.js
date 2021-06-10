import User from '../models/user.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import config from '../config/config.js'

async function login(req, res, next) {
    
    const emailInformado = req.body.email;
    const senhaInformada = req.body.senha;

    //TODO implementar se email ou senha não vier no body para não quebrar

    try {
        
        let user = await User.findOne({ where: { email: emailInformado } });
        
        if(!user){
            res.status(404).json({ message: "Email inválido ou senha incorreta!" });
        }else{
            
            let senhaExisteNoBanco = bcrypt.compareSync(senhaInformada, user.senha);
            if(!senhaExisteNoBanco){
                res.status(404).json({ message: "Email inválido ou senha incorreta!" });
            }else{
                let token = jwt.sign({ id: user.id }, config.TOKEN_SECRET, { expiresIn: '4h' });
                res.header('token', token);
                res.status(200).json({ message: "Acesso permitido",token_acesso: token });
            }
        }

    } catch (e) {
        next(e);
    }
}

async function auth(req, res, next) {

    const token = req.header('token');

    if(!token){
        res.status(401).json({ message: "Acesso negado!" });
    }else{
        
        try {
            let usuarioVerificado = jwt.verify(token, config.TOKEN_SECRET);
            req.user = usuarioVerificado;
            next();
            
        } catch (e) {
            res.status(401).json({ message: "Acesso negado!" });
        }

    }
}

export { login, auth };