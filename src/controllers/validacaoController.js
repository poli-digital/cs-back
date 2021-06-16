import {Role, Permission, User, Company, ConfigPlugins} from "../models/index.js";

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

async function canCreateAConfigurationOfAPlugin(req, res, next) {
    let userAuthenticated = await retornaUmUsuario(req.user.id);
    let isRotaPermitida = await permissaoDeAcessoARota(userAuthenticated, 'criar_plugin');
    if(isRotaPermitida){
        next();
    }else{
        res.status(401).json({message:`Você não tem permissão para acessar esta rota com o papel de ${userAuthenticated?.papel?.nome}!`});
    }
}

async function canEditAConfigurationOfAPlugin(req, res, next) {
    let usuarioAutenticado = await retornaUmUsuario(req.user.id);
    let configurationOfPluginThatWillBeManipulated = await returnPluginConfigurationAsManipulated(req.params.id);
    let routeIsAllowed = await permissaoDeAcessoARota(usuarioAutenticado, 'editar_plugin');
    if(routeIsAllowed){
        let manipulateConfigPluginIsAllowed = permissionToManipulateTheConfigurationOfAPlugin(usuarioAutenticado,  configurationOfPluginThatWillBeManipulated);
        if(manipulateConfigPluginIsAllowed){
            next();
        }else{
            res.status(401).json({message:'You can only edit your plugins!'});
        }
    }else{
        res.status(401).json({message:`You are not allowed to access this route with the role of ${usuarioAutenticado?.papel?.nome}!`});
    }
}

async function canRemoveAConfigurationOfAPlugin(req, res, next) {
    let usuarioAutenticado = await retornaUmUsuario(req.user.id);
    let configurationOfPluginThatWillBeManipulated = await returnPluginConfigurationAsManipulated(req.params.id);
    let routeIsAllowed = await permissaoDeAcessoARota(usuarioAutenticado, 'excluir_plugin');
    if(routeIsAllowed){
        let manipulateConfigPluginIsAllowed = permissionToManipulateTheConfigurationOfAPlugin(usuarioAutenticado,  configurationOfPluginThatWillBeManipulated);
        if(manipulateConfigPluginIsAllowed){
            next();
        }else{
            res.status(401).json({message:'You can only edit your plugins!'});
        }
    }else{
        res.status(401).json({message:`You are not allowed to access this route with the role of ${usuarioAutenticado?.papel?.nome}!`});
    }
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

        if(usuarioAutenticado.papel.name == 'super'){
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

        if(usuarioAutenticado.papel.name == 'super'){
            return true;
        }

        const idDaEmpresaDoUsuarioAutenticado = usuarioAutenticado.empresa.id;
        const idDaEmpresaDoUsuarioQueSeraManipulado = usuarioQueSeraManipulado.empresa.id;
        return (idDaEmpresaDoUsuarioAutenticado == idDaEmpresaDoUsuarioQueSeraManipulado);

    }else{
        return false;
    }
}

// O usuário só pode manipular uma configuração de plugin que pertence a sua própria empresa.
function permissionToManipulateTheConfigurationOfAPlugin(userAuthenticated, configurationOfPluginThatWillBeManipulated) {

    if(userAuthenticated && configurationOfPluginThatWillBeManipulated){
        
        if(userAuthenticated.papel.name == 'super'){
            return true;
        }

        const idDaEmpresaDoUsuarioAutenticado = userAuthenticated.empresa.id;
        const idDaEmpresaDoUsuarioQueSeraManipulado = configurationOfPluginThatWillBeManipulated.company_id;
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
        return await User.findByPk(idUsuario, {include: [{ model: Role, as: 'papel' }, {model: Company, as: 'empresa'}]});
    }catch(e){
        console.log('Erro ao retornar usuário', e);
        return null;
    }
}

const retornaPermissoesDeUmpapel = async (idPapel)=>{
    try{
        let buscaPemissoes = await Role.findByPk(idPapel, {include: Permission});
        if(buscaPemissoes){
            let arrayPermissoes = [];
            buscaPemissoes.permissions.forEach(permissao => {
                arrayPermissoes.push(permissao.name);
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

const returnPluginConfigurationAsManipulated = async (configPluginId) => {
    try{
        return await ConfigPlugins.findByPk(configPluginId);
    }catch(e){
        console.log('Error returning a plugin configuration', e);
        return null;
    }
}

export {podeCriarUmaEmpresa, podeEditarUmaEmpresa, podeRemoverUmaEmpresa,
    podeCriarUmUsuario, podeEditarUmUsuario, podeRemoverUmUsuario, 
    canCreateAConfigurationOfAPlugin, canEditAConfigurationOfAPlugin, canRemoveAConfigurationOfAPlugin,
    permissaoParaManipularUmaEmpresa, permissaoParaManipularUmUsuario,
    papelTemPermissaoParaAcessarARota, permissionToManipulateTheConfigurationOfAPlugin
};