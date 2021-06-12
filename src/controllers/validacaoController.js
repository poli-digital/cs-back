import {Papel, Permissao, User} from "../models/index.js";

function podeCriarUmaEmpresa(req, res, next) {
    verificaPermissao(req, res, next, 'criar_empresa');
}

function podeEditarUmaEmpresa(req, res, next) {
    verificaPermissao(req, res, next, 'editar_empresa');
}

function podeRemoverUmaEmpresa(req, res, next) {
    verificaPermissao(req, res, next, 'excluir_empresa');
}

function podeCriarUmUsuario(req, res, next) {
    verificaPermissao(req, res, next, 'criar_usuario');
}

function podeEditarUmUsuario(req, res, next) {
    verificaPermissao(req, res, next, 'editar_usuario');
}

function podeRemoverUmUsuario(req, res, next) {
    verificaPermissao(req, res, next, 'excluir_usuario');
}

function podeCriarUmPlugin(req, res, next) {
    verificaPermissao(req, res, next, 'criar_plugin');
}

function podeEditarUmPlugin(req, res, next) {
    verificaPermissao(req, res, next, 'editar_plugin');
}
function podeRemoverUmPlugin(req, res, next) {
    verificaPermissao(req, res, next, 'excluir_plugin');
}

async function verificaPermissao(req, res, next, permissaoNecessariaParaAcessarARota){
    
    const messagemPadrao = 'Você não tem permissão para acessar esta rota!';
    const mensagemPadrao2 = 'Você não tem permissão para acessar esta rota com este papel!'
    
    const userId = req.user.id;
    console.log('userId', userId)
    if(!userId){
        res.status(401).json({message:messagemPadrao});
    }else{

        try{

            let user = await User.findByPk(userId, {include: [{ model: Papel, as: 'papel' }]});
            let papelQueEstaTentandoAcessarARota = user.papel;

            if(!permissaoNecessariaParaAcessarARota || !papelQueEstaTentandoAcessarARota){
                res.status(401).json({message:messagemPadrao});
            }else{
                let permissoesDoPapel = await papelTemPermissaoParaAcessarARota(permissaoNecessariaParaAcessarARota, papelQueEstaTentandoAcessarARota);
                if(permissoesDoPapel){
                    next();
                    //res.status(200).json({message:"Permissão concedida"});
                }else{
                    res.status(401).json({message:mensagemPadrao2});
                }
            }

        }catch(e){
            console.log(e);
            res.status(401).json({message:messagemPadrao});
        }
    }
}

async function papelTemPermissaoParaAcessarARota  (permissaoNecessariaParaAcessarARotaParaAcessarARota, papelQueEstaTentandoAcessarARota){

    try{

        let buscaPemissoes = await Papel.findByPk(papelQueEstaTentandoAcessarARota.id, {include: Permissao});
        if(buscaPemissoes){
            let arrayPermissoes = [];
            buscaPemissoes.permissoes.forEach(permissao => {
                arrayPermissoes.push(permissao.nome);
            });
            return arrayPermissoes.includes(permissaoNecessariaParaAcessarARotaParaAcessarARota);
        }else{
            return false;
        }

    }catch(e){
        console.log(e);
        return false;
    } 
}

export {podeCriarUmaEmpresa, podeEditarUmaEmpresa, podeRemoverUmaEmpresa,
    podeCriarUmUsuario, podeEditarUmUsuario, podeRemoverUmUsuario, 
    podeCriarUmPlugin, podeEditarUmPlugin, podeRemoverUmPlugin
};