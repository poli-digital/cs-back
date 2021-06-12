import {User} from '../models/index.js'
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

                let conteudoDoToken = {
                    id: user.id
                }

                //let token = jwt.sign({ user: conteudoDoToken}, config.TOKEN_SECRET, { expiresIn: '4h' });
                let token = jwt.sign({ user: conteudoDoToken}, config.TOKEN_SECRET);
                res.header('token', token);
                res.status(200).json({ message: "Logado com sucesso!"});
            }
        }

    } catch (e) {
        next(e);
    }
}

async function isAuth(req, res, next) {

    const token = req.header('token');

    if(!token){
        res.status(401).json({ message: "Acesso negado! Você pressica fornecer o token!" });
    }else{
        
        try {
            let usuarioVerificado = jwt.verify(token, config.TOKEN_SECRET);
            req.user = usuarioVerificado.user;
            next();
        } catch (e) {
            res.status(401).json({ message: "Acesso negado! O seu token expirou ou esta inválido!" });
        }

    }
}

export { login, isAuth };