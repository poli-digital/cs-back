import {Role, Permission, User, Company, ConfigPlugins} from "../models/index.js";

async function canCreateACompany(req, res, next) {
    let usuarioAutenticado = await returnsOneUser(req.user.id);
    let isRotaPermitida = await permissionOfAccessARoute(usuarioAutenticado, 'criar_empresa');
    if(isRotaPermitida){
        next();
    }else{
        res.status(401).json({message:`Você não tem permissão para acessar esta rota com o papel de ${usuarioAutenticado?.papel?.nome}!`});
    }
}

async function canEditOneCompany(req, res, next) {
    let usuarioAutenticado = await returnsOneUser(req.user.id);
    let isRotaPermitida = await permissionOfAccessARoute(usuarioAutenticado, 'editar_empresa');
    if(isRotaPermitida){
        let isPermitidoManipularEmpresa = permissionToManipulateACompany(req.params.id, usuarioAutenticado);
        if(isPermitidoManipularEmpresa){
            next();
        }else{
            res.status(401).json({message:'Você só pode editar as suas empresas!'});
        }
    }else{
        res.status(401).json({message:`Você não tem permissão para acessar esta rota com o papel de ${usuarioAutenticado?.papel?.nome}!`});
    }
}

async function canRemoveACompany(req, res, next) {
    let usuarioAutenticado = await returnsOneUser(req.user.id);
    let isRotaPermitida = await permissionOfAccessARoute(usuarioAutenticado, 'excluir_empresa');
    if(isRotaPermitida){
        let isPermitidoManipularEmpresa = permissionToManipulateACompany(req.params.id, usuarioAutenticado);
        if(isPermitidoManipularEmpresa){
            next();
        }else{
            res.status(401).json({message:'Você só pode remover as suas empresas!'});
        }
    }else{
        res.status(401).json({message:`Você não tem permissão para acessar esta rota com o papel de ${usuarioAutenticado?.papel?.nome}!`});
    }
}

async function cancreateAUser(req, res, next) {
    let usuarioAutenticado = await returnsOneUser(req.user.id);
    let isRotaPermitida = await permissionOfAccessARoute(usuarioAutenticado, 'criar_usuario');
    if(isRotaPermitida){
        next();
    }else{
        res.status(401).json({message:`Você não tem permissão para acessar esta rota com o papel de ${usuarioAutenticado?.papel?.nome}!`});
    }
}

async function canEditOneUser(req, res, next) {
    let usuarioAutenticado = await returnsOneUser(req.user.id);
    let usuarioASerManipulado = await returnsOneUser(req.params.id);
    let isRotaPermitida = await permissionOfAccessARoute(usuarioAutenticado, 'editar_usuario');
    if(isRotaPermitida){
        let isPermitidoManipularUsuario = permissionToManipulateAUser(usuarioAutenticado, usuarioASerManipulado);
        if(isPermitidoManipularUsuario){
            next();
        }else{
            res.status(401).json({message:'Você só pode editar os seus usuários!'});
        }
    }else{
        res.status(401).json({message:`Você não tem permissão para acessar esta rota com o papel de ${usuarioAutenticado?.papel?.nome}!`});
    }
}

async function canRemoveAUser(req, res, next) {
    let usuarioAutenticado = await returnsOneUser(req.user.id);
    let usuarioASerManipulado = await returnsOneUser(req.params.id);
    let isRotaPermitida = await permissionOfAccessARoute(usuarioAutenticado, 'excluir_usuario');
    if(isRotaPermitida){
        let isPermitidoManipularUsuario = permissionToManipulateAUser(usuarioAutenticado, usuarioASerManipulado);
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
    let userAuthenticated = await returnsOneUser(req.user.id);
    let isRotaPermitida = await permissionOfAccessARoute(userAuthenticated, 'criar_plugin');
    if(isRotaPermitida){
        next();
    }else{
        res.status(401).json({message:`Você não tem permissão para acessar esta rota com o papel de ${userAuthenticated?.papel?.nome}!`});
    }
}

async function canEditAConfigurationOfAPlugin(req, res, next) {
    let usuarioAutenticado = await returnsOneUser(req.user.id);
    let configurationOfPluginThatWillBeManipulated = await returnPluginConfigurationAsManipulated(req.params.id);
    let routeIsAllowed = await permissionOfAccessARoute(usuarioAutenticado, 'editar_plugin');
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
    let usuarioAutenticado = await returnsOneUser(req.user.id);
    let configurationOfPluginThatWillBeManipulated = await returnPluginConfigurationAsManipulated(req.params.id);
    let routeIsAllowed = await permissionOfAccessARoute(usuarioAutenticado, 'excluir_plugin');
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

async function permissionOfAccessARoute(usuarioAutenticado, permissaoNecessaria) {
    
    if(usuarioAutenticado){

        let arrayPermissoesDoPapel = await returnsPermissionsOfARole(usuarioAutenticado.papel.id);
        let isRotaPermitida = roleHasPermissionToAccessARoute(permissaoNecessaria, arrayPermissoesDoPapel);
       
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
function permissionToManipulateACompany(idEmpresaParams, usuarioAutenticado) {

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
function permissionToManipulateAUser(usuarioAutenticado, usuarioQueSeraManipulado) {
    
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

function roleHasPermissionToAccessARoute (permissaoNecessariaParaAcessarARotaParaAcessarARota, arrayPermissoesDoPapel){
    return arrayPermissoesDoPapel.includes(permissaoNecessariaParaAcessarARotaParaAcessarARota);
}


const returnsOneUser = async (idUsuario)=>{
    try{
        return await User.findByPk(idUsuario, {include: [{ model: Role, as: 'papel' }, {model: Company, as: 'empresa'}]});
    }catch(e){
        console.log('Erro ao retornar usuário', e);
        return null;
    }
}

const returnsPermissionsOfARole = async (idPapel)=>{
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

export {canCreateACompany, canEditOneCompany, canRemoveACompany,
    cancreateAUser, canEditOneUser, canRemoveAUser, 
    canCreateAConfigurationOfAPlugin, canEditAConfigurationOfAPlugin, canRemoveAConfigurationOfAPlugin,
    permissionToManipulateACompany, permissionToManipulateAUser,
    roleHasPermissionToAccessARoute, permissionToManipulateTheConfigurationOfAPlugin
};