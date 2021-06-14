import {Papel, Permissao, User, Empresa} from "../models/index.js";

async function podeCriarUmaEmpresa(req, res, next) {
    let usuarioAutenticado = await retornaUmUsuario(req.user.id);
    let isRotaPermitida = await permissaoDeAcessoARota(usuarioAutenticado, 'criar_empresa');
    if(isRotaPermitida){
        next();
    }else{
        res.status(401).json({message:`Você não tem permissão para acessar esta rota com o papel de ${usuarioAutenticado?.papel?.nome}!`});
    }
}

async function podeEditarUmaEmpresa(req, res, next) {
    let usuarioAutenticado = await retornaUmUsuario(req.user.id);
    let isRotaPermitida = await permissaoDeAcessoARota(usuarioAutenticado, 'editar_empresa');
    if(isRotaPermitida){
        let isPermitidoManipularEmpresa = permissaoParaManipularUmaEmpresa(req.params.id, usuarioAutenticado);
        if(isPermitidoManipularEmpresa){
            next();
        }else{
            res.status(401).json({message:'Você só pode editar as suas empresas!'});
        }
    }else{
        res.status(401).json({message:`Você não tem permissão para acessar esta rota com o papel de ${usuarioAutenticado?.papel?.nome}!`});
    }
}

async function podeRemoverUmaEmpresa(req, res, next) {
    let usuarioAutenticado = await retornaUmUsuario(req.user.id);
    let isRotaPermitida = await permissaoDeAcessoARota(usuarioAutenticado, 'excluir_empresa');
    if(isRotaPermitida){
        let isPermitidoManipularEmpresa = permissaoParaManipularUmaEmpresa(req.params.id, usuarioAutenticado);
        if(isPermitidoManipularEmpresa){
            next();
        }else{
            res.status(401).json({message:'Você só pode remover as suas empresas!'});
        }
    }else{
        res.status(401).json({message:`Você não tem permissão para acessar esta rota com o papel de ${usuarioAutenticado?.papel?.nome}!`});
    }
}

async function podeCriarUmUsuario(req, res, next) {
    let usuarioAutenticado = await retornaUmUsuario(req.user.id);
    let isRotaPermitida = await permissaoDeAcessoARota(usuarioAutenticado, 'criar_usuario');
    if(isRotaPermitida){
        next();
    }else{
        res.status(401).json({message:`Você não tem permissão para acessar esta rota com o papel de ${usuarioAutenticado?.papel?.nome}!`});
    }
}

async function podeEditarUmUsuario(req, res, next) {
    let usuarioAutenticado = await retornaUmUsuario(req.user.id);
    console.log('usuario autenticado:', usuarioAutenticado)
    let usuarioASerManipulado = await retornaUmUsuario(req.params.id);
    let isRotaPermitida = await permissaoDeAcessoARota(usuarioAutenticado, 'editar_usuario');
    if(isRotaPermitida){
        let isPermitidoManipularUsuario = permissaoParaManipularUmUsuario(usuarioAutenticado, usuarioASerManipulado);
        if(isPermitidoManipularUsuario){
            next();
        }else{
            res.status(401).json({message:'Você só pode editar os seus usuários!'});
        }
    }else{
        res.status(401).json({message:`Você não tem permissão para acessar esta rota com o papel de ${usuarioAutenticado?.papel?.nome}!`});
    }
}

async function podeRemoverUmUsuario(req, res, next) {
    let usuarioAutenticado = await retornaUmUsuario(req.user.id);
    let usuarioASerManipulado = await retornaUmUsuario(req.params.id);
    let isRotaPermitida = await permissaoDeAcessoARota(usuarioAutenticado, 'excluir_usuario');
    if(isRotaPermitida){
        let isPermitidoManipularUsuario = permissaoParaManipularUmUsuario(usuarioAutenticado, usuarioASerManipulado);
        if(isPermitidoManipularUsuario){
            next();
        }else{
            res.status(401).json({message:'Você só pode remover os seus usuários!'});
        }
    }else{
        res.status(401).json({message:`Você não tem permissão para acessar esta rota com o papel de ${usuarioAutenticado?.papel?.nome}!`});
    }
}

function podeCriarUmPlugin(req, res, next) {
    //verificaPermissao(req, res, next, 'criar_plugin');
}

function podeEditarUmPlugin(req, res, next) {
    //verificaPermissao(req, res, next, 'editar_plugin');
}
function podeRemoverUmPlugin(req, res, next) {
    //verificaPermissao(req, res, next, 'excluir_plugin');
}

async function permissaoDeAcessoARota(usuarioAutenticado, permissaoNecessaria) {
    
    if(usuarioAutenticado){

        let arrayPermissoesDoPapel = await retornaPermissoesDeUmpapel(usuarioAutenticado.papel.id);
        let isRotaPermitida = papelTemPermissaoParaAcessarARota(permissaoNecessaria, arrayPermissoesDoPapel);
       
        if(isRotaPermitida){
            return true;
        }else{
            return false;
        }

    }else{
        return false;
    }  
}

// O usuário só pode manipular a sua própria empresa.
function permissaoParaManipularUmaEmpresa(idEmpresaParams, usuarioAutenticado) {

    if(usuarioAutenticado){

        if(usuarioAutenticado.papel.nome == 'super'){
            return true;
        }
        
        const idDaEmpresaDoUsuarioAutenticado = usuarioAutenticado.empresa.id;
        const idDaEmpresaQueDesejaManipular = idEmpresaParams;
        return (idDaEmpresaDoUsuarioAutenticado == idDaEmpresaQueDesejaManipular);
        
    }else{
        return false;
    }
}

// O usuário só pode manipular um usuário que pertence a sua própria empresa.
function permissaoParaManipularUmUsuario(usuarioAutenticado, usuarioQueSeraManipulado) {
    
    if(usuarioAutenticado && usuarioQueSeraManipulado){

        if(usuarioAutenticado.papel.nome == 'super'){
            return true;
        }

        const idDaEmpresaDoUsuarioAutenticado = usuarioAutenticado.empresa.id;
        const idDaEmpresaDoUsuarioQueSeraManipulado = usuarioQueSeraManipulado.empresa.id;
        return (idDaEmpresaDoUsuarioAutenticado == idDaEmpresaDoUsuarioQueSeraManipulado);

    }else{
        return false;
    }
}

function papelTemPermissaoParaAcessarARota (permissaoNecessariaParaAcessarARotaParaAcessarARota, arrayPermissoesDoPapel){
    return arrayPermissoesDoPapel.includes(permissaoNecessariaParaAcessarARotaParaAcessarARota);
}


const retornaUmUsuario = async (idUsuario)=>{
    try{
        return await User.findByPk(idUsuario, {include: [{ model: Papel, as: 'papel' }, {model: Empresa, as: 'empresa'}]});
    }catch(e){
        console.log('Erro ao retornar usuário', e);
        return null;
    }
}

const retornaPermissoesDeUmpapel = async (idPapel)=>{
    try{
        let buscaPemissoes = await Papel.findByPk(idPapel, {include: Permissao});
        if(buscaPemissoes){
            let arrayPermissoes = [];
            buscaPemissoes.permissoes.forEach(permissao => {
                arrayPermissoes.push(permissao.nome);
            });
            return arrayPermissoes;
        }else{
            return [];
        }
    }catch(e){
        console.log('Erro ao retornar permissões', e);
        return [];
    }
}

export {podeCriarUmaEmpresa, podeEditarUmaEmpresa, podeRemoverUmaEmpresa,
    podeCriarUmUsuario, podeEditarUmUsuario, podeRemoverUmUsuario, 
    podeCriarUmPlugin, podeEditarUmPlugin, podeRemoverUmPlugin,
    permissaoParaManipularUmaEmpresa, permissaoParaManipularUmUsuario,
    papelTemPermissaoParaAcessarARota
};