import {Papel, Permissao, User, Empresa} from "../models/index.js";

function podeCriarUmaEmpresa(req, res, next) {
    verificaPermissao(req, res, next, 'criar_empresa');
}

function podeEditarUmaEmpresa(req, res, next) {
    verificaPermissao(req, res, next, 'editar_empresa', usuarioQuerManipularSuaPropriaEmpresa);
}

function podeRemoverUmaEmpresa(req, res, next) {
    verificaPermissao(req, res, next, 'excluir_empresa', usuarioQuerManipularSuaPropriaEmpresa);
}

function podeCriarUmUsuario(req, res, next) {
    verificaPermissao(req, res, next, 'criar_usuario');
}

function podeEditarUmUsuario(req, res, next) {
    verificaPermissao(req, res, next, 'editar_usuario', usuarioQuerManipularUsuariosDeSuaPropriaEmpresa);
}

function podeRemoverUmUsuario(req, res, next) {
    verificaPermissao(req, res, next, 'excluir_usuario', usuarioQuerManipularUsuariosDeSuaPropriaEmpresa);
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

async function verificaPermissao(req, res, next, perm, funcaoValidaUsuario = ()=>{return true}){
    let permissaoNecessariaParaAcessarARota = perm;
    const userId = req.user.id;

    if(!userId){
        res.status(401).json({message:'Não foi possível identificar o usuário logado!'});
    }else{

        try{

            let user = await User.findByPk(userId, {include: [{ model: Papel, as: 'papel' }, {model: Empresa, as: 'empresa'}]});
            let papelQueEstaTentandoAcessarARota = user.papel;

            if(!permissaoNecessariaParaAcessarARota || !papelQueEstaTentandoAcessarARota){
                res.status(401).json({message:'Permissão de acesso a rota ou papel de acesso não foi encontrado!'});
            }else{
                let isRotaPermitida = await papelTemPermissaoParaAcessarARota(permissaoNecessariaParaAcessarARota, papelQueEstaTentandoAcessarARota);
                if(isRotaPermitida){

                    let isValidoAcaoUsuario = await funcaoValidaUsuario(req, res, next, user);

                    if(isValidoAcaoUsuario){
                        next();
                    }else{
                        res.status(401).json({message:'Você não tem acesso para aplicar esta ação nesta empresa!'});
                    }

                }else{
                    res.status(401).json({message:'Você não tem permissão para acessar esta rota com este papel!'});
                }
            }

        }catch(e){
            console.log(e);
            res.status(401).json({message:'Você não tem permissão para acessar esta rota! Algo de errado aconteceu.'});
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

function usuarioQuerManipularSuaPropriaEmpresa(req, res, next, user) {
    const empresaDoUsuarioAutenticado = user.empresa.id; // Usuario que fez a requisição = autenticado
    const empresaQueDesejaManipular = req.params.id;
    return (empresaDoUsuarioAutenticado == empresaQueDesejaManipular);
}

async function usuarioQuerManipularUsuariosDeSuaPropriaEmpresa(req, res, next, user) {
    const empresaDoUsuarioAutenticado = user.empresa.id;
    const userId = req.params.id;
    let usuarioQueSeraManipulado = await User.findByPk(userId, {include: [{model: Empresa, as: 'empresa'}]});
    if(usuarioQueSeraManipulado){
        let empresaDoUsuarioQueSeraManipulado = usuarioQueSeraManipulado.empresa.id;
        return (empresaDoUsuarioAutenticado == empresaDoUsuarioQueSeraManipulado);
    }else{
        return false;
    }
        
}

async function usuarioQuerManipularPluginsDeSuaPropriaEmpresa(req, res, next, user) {
    const empresaDoUsuarioAutenticado = user.empresa.id;
    const pluginId = req.params.id;
    let pluginQueSeraManipulado = 'IMPLEMENTAR' //TODO implementar
    let empresaDoPluginQueSeraManipulado = pluginQueSeraManipulado.empresa.id;
    return (empresaDoUsuarioAutenticado == empresaDoPluginQueSeraManipulado);
}

// O usuário só pode manipular a sua própria empresa.
async function permissaoParaEditarUmaEmpresa(idEmpresaParams, funcaoQueBuscaOUsuarioAutenticado) {
    const usuarioAutenticado = await funcaoQueBuscaOUsuarioAutenticado();
    if(usuarioAutenticado){
        const idDaEmpresaDoUsuarioAutenticado = usuarioAutenticado.empresa.id;
        const idDaEmpresaQueDesejaManipular = idEmpresaParams;
        return (idDaEmpresaDoUsuarioAutenticado == idDaEmpresaQueDesejaManipular);
    }else{
        return false;
    }
}

// O usuário só pode manipular um usuário que pertence a sua própria empresa.
async function permissaoParaEditarUmUsuario(funcaoQueBuscaOUsuarioAutenticado, funcaoQueBuscaOUsuarioQueSeraManipulado) {
    const usuarioAutenticado = await funcaoQueBuscaOUsuarioAutenticado();
    const usuarioQueSeraManipulado = await funcaoQueBuscaOUsuarioQueSeraManipulado();
    if(usuarioAutenticado && usuarioQueSeraManipulado){
        const idDaEmpresaDoUsuarioAutenticado = usuarioAutenticado.empresa.id;
        const idDaEmpresaDoUsuarioQueSeraManipulado = usuarioQueSeraManipulado.empresa.id;
        return (idDaEmpresaDoUsuarioAutenticado == idDaEmpresaDoUsuarioQueSeraManipulado);
    }else{
        return false;
    }
}

const retornaUmUsuario = async (id)=>{
    try{
        return await User.findByPk(id, {include: [{ model: Papel, as: 'papel' }, {model: Empresa, as: 'empresa'}]});
    }catch(e){
        console.log('Erro ao retornar usuário', e);
        return null;
    }
}

export {podeCriarUmaEmpresa, podeEditarUmaEmpresa, podeRemoverUmaEmpresa,
    podeCriarUmUsuario, podeEditarUmUsuario, podeRemoverUmUsuario, 
    podeCriarUmPlugin, podeEditarUmPlugin, podeRemoverUmPlugin,
    permissaoParaEditarUmaEmpresa, permissaoParaEditarUmUsuario
};