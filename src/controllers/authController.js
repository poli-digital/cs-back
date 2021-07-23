import {User} from '../models/index.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

async function login(req, res, next) {
    
    const emailInformed = req.body.email;
    const passwordInformed = req.body.password;

    try {
        
        let user = await User.findOne({ where: { email: emailInformed } });
        
        if(!user){
            res.status(401).json({ message: "Invalid email or incorrect password!" });
        }else{
            
            let passwordExistsInBank = bcrypt.compareSync(passwordInformed, user.password);
            if(!passwordExistsInBank){
                res.status(401).json({ message: "Invalid email or incorrect password!" });
            }else{

                if(user.blocked){
                    res.status(401).json({ message: "This user is blocked, talk to the administrator!" });
                }else{
                    let tokenContent = {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        role_id:user.role_id,
                        company_id:user.company_id
                    }
    
                    //let token = jwt.sign({ user: conteudoDoToken}, config.TOKEN_SECRET, { expiresIn: '4h' });
                    let token = jwt.sign({ user: tokenContent}, process.env.TOKEN_SECRET);
                    res.header('token', token);
                    res.status(200).json({ message: "Successfully logged in!", token:token, user:tokenContent});
                }
            }
        }

    } catch (e) {
        next(e);
    }
}

async function isAuth(req, res, next) {

    const token = req.header('token');

    if(!token){
        res.status(401).json({ message: "Access denied! You press to provide the token!" });
    }else{
        
        try {
            let userVerified = jwt.verify(token, process.env.TOKEN_SECRET);
            req.user = userVerified.user;
            next();
        } catch (e) {
            res.status(401).json({ message: "Access denied! Your token has expired or is invalid!" });
        }

    }
}

export { login, isAuth };