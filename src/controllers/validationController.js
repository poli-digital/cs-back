import {Role, Permission, User, Company, ConfigPlugins} from "../models/index.js";

async function canCreateACompany(req, res, next) {
    let userAuthenticated = await returnsOneUser(req.user.id);
    let isRouteAllowed = await permissionOfAccessARoute(userAuthenticated, 'criar_empresa');
    if(isRouteAllowed){
        next();
    }else{
        res.status(401).json({message:`You are not allowed to access this route with the role of ${userAuthenticated?.role?.name}!`});
    }
}

async function canEditOneCompany(req, res, next) {
    let userAuthenticated = await returnsOneUser(req.user.id);
    let isRouteAllowed = await permissionOfAccessARoute(userAuthenticated, 'editar_empresa');
    if(isRouteAllowed){
        let isPermitidoManipularEmpresa = permissionToManipulateACompany(req.params.id, userAuthenticated);
        if(isPermitidoManipularEmpresa){
            next();
        }else{
            res.status(401).json({message:'You can only edit your companies!'});
        }
    }else{
        res.status(401).json({message:`You are not allowed to access this route with the role of ${userAuthenticated?.role?.name}!`});
    }
}

async function canRemoveACompany(req, res, next) {
    let userAuthenticated = await returnsOneUser(req.user.id);
    let isRouteAllowed = await permissionOfAccessARoute(userAuthenticated, 'excluir_empresa');
    if(isRouteAllowed){
        let isPermitidoManipularEmpresa = permissionToManipulateACompany(req.params.id, userAuthenticated);
        if(isPermitidoManipularEmpresa){
            next();
        }else{
            res.status(401).json({message:'You can only remove your companies!'});
        }
    }else{
        res.status(401).json({message:`You are not allowed to access this route with the role of ${userAuthenticated?.role?.name}!`});
    }
}

async function cancreateAUser(req, res, next) {
    let userAuthenticated = await returnsOneUser(req.user.id);
    let isRouteAllowed = await permissionOfAccessARoute(userAuthenticated, 'criar_usuario');
    if(isRouteAllowed){
        next();
    }else{
        res.status(401).json({message:`You are not allowed to access this route with the role of ${userAuthenticated?.role?.name}!`});
    }
}

async function canEditOneUser(req, res, next) {
    let userAuthenticated = await returnsOneUser(req.user.id);
    let userToBeManipulated = await returnsOneUser(req.params.id);
    let isRouteAllowed = await permissionOfAccessARoute(userAuthenticated, 'editar_usuario');
    if(isRouteAllowed){
        if(userToBeManipulated){
            let isPermitidoManipularUsuario = permissionToManipulateAUser(userAuthenticated, userToBeManipulated);
            if(isPermitidoManipularUsuario){
                next();
            }else{
                res.status(401).json({message:'You can only edit your users!'});
            }
        }else{
            res.status(401).json({message:'User not found!'});
        }
    }else{
        res.status(401).json({message:`You are not allowed to access this route with the role of ${userAuthenticated?.role?.name}!`});
    }
}

async function canRemoveAUser(req, res, next) {
    let userAuthenticated = await returnsOneUser(req.user.id);
    let userToBeManipulated = await returnsOneUser(req.params.id);
    let isRouteAllowed = await permissionOfAccessARoute(userAuthenticated, 'excluir_usuario');
    if(isRouteAllowed){
        if(userToBeManipulated){
            let isPermitidoManipularUsuario = permissionToManipulateAUser(userAuthenticated, userToBeManipulated);
            if(isPermitidoManipularUsuario){
                next();
            }else{
                res.status(401).json({message:'You can only remove your users!'});
            }
        }else{
            res.status(401).json({message:'User not found!'});
        }
    }else{
        res.status(401).json({message:`You are not allowed to access this route with the role of ${userAuthenticated?.role?.name}!`});
    }
}

async function canCreateAConfigurationOfAPlugin(req, res, next) {
    let userAuthenticated = await returnsOneUser(req.user.id);
    let isRouteAllowed = await permissionOfAccessARoute(userAuthenticated, 'criar_plugin');
    if(isRouteAllowed){
        next();
    }else{
        res.status(401).json({message:`You are not allowed to access this route with the role of ${userAuthenticated?.role?.name}!`});
    }
}

async function canEditAConfigurationOfAPlugin(req, res, next) {
    let userAuthenticated = await returnsOneUser(req.user.id);
    let configurationOfPluginThatWillBeManipulated = await returnPluginConfigurationAsManipulated(req.params.id);
    let routeIsAllowed = await permissionOfAccessARoute(userAuthenticated, 'editar_plugin');
    if(routeIsAllowed){
        if(configurationOfPluginThatWillBeManipulated){
            let manipulateConfigPluginIsAllowed = permissionToManipulateTheConfigurationOfAPlugin(userAuthenticated,  configurationOfPluginThatWillBeManipulated);
            if(manipulateConfigPluginIsAllowed){
                next();
            }else{
                res.status(401).json({message:'You can only edit your plugins!'});
            }
        }else{
            res.status(401).json({message:'Config plugin not found!'});
        }
    }else{
        res.status(401).json({message:`You are not allowed to access this route with the role of ${userAuthenticated?.role?.name}!`});
    }
}

async function canRemoveAConfigurationOfAPlugin(req, res, next) {
    let userAuthenticated = await returnsOneUser(req.user.id);
    let configurationOfPluginThatWillBeManipulated = await returnPluginConfigurationAsManipulated(req.params.id);
    let routeIsAllowed = await permissionOfAccessARoute(userAuthenticated, 'excluir_plugin');
    if(routeIsAllowed){
        if(configurationOfPluginThatWillBeManipulated){
            let manipulateConfigPluginIsAllowed = permissionToManipulateTheConfigurationOfAPlugin(userAuthenticated,  configurationOfPluginThatWillBeManipulated);
            if(manipulateConfigPluginIsAllowed){
                next();
            }else{
                res.status(401).json({message:'You can only edit your plugins!'});
            }
        }else{
            res.status(401).json({message:'Config plugin not found!'});
        } 
    }else{
        res.status(401).json({message:`You are not allowed to access this route with the role of ${userAuthenticated?.role?.name}!`});
    }
}

async function permissionOfAccessARoute(userAuthenticated, permissionRequired) {
    
    if(userAuthenticated){

        let arrayRolesPermissions = await returnsPermissionsOfARole(userAuthenticated.role.id);
        let isRouteAllowed = roleHasPermissionToAccessARoute(permissionRequired, arrayRolesPermissions);
       
        if(isRouteAllowed){
            return true;
        }else{
            return false;
        }

    }else{
        return false;
    }  
}

// O usuário só pode manipular a sua própria empresa.
function permissionToManipulateACompany(idCompanyParams, userAuthenticated) {

    if(userAuthenticated){

        if(userAuthenticated.role.name == 'super'){
            return true;
        }
        
        const companyIdOfUserAutenticated = userAuthenticated.company.id;
        const idOfCompanyYouWantToManipulate = idCompanyParams;
        return (companyIdOfUserAutenticated == idOfCompanyYouWantToManipulate);
        
    }else{
        return false;
    }
}

// O usuário só pode manipular um usuário que pertence a sua própria empresa.
function permissionToManipulateAUser(userAuthenticated, userWhoWillBeManipulated) {
    
    if(userAuthenticated && userWhoWillBeManipulated){

        if(userAuthenticated.role.name == 'super'){
            return true;
        }

        const companyIdOfUserAutenticated = userAuthenticated.company.id;
        const companyIdOfUserWhoWillBeManipulated = userWhoWillBeManipulated.company.id;
        return (companyIdOfUserAutenticated == companyIdOfUserWhoWillBeManipulated);

    }else{
        return false;
    }
}

// O usuário só pode manipular uma configuração de plugin que pertence a sua própria empresa.
function permissionToManipulateTheConfigurationOfAPlugin(userAuthenticated, configurationOfPluginThatWillBeManipulated) {

    if(userAuthenticated && configurationOfPluginThatWillBeManipulated){
        
        if(userAuthenticated.role.name == 'super'){
            return true;
        }

        const companyIdOfUserAutenticated = userAuthenticated.company.id;
        const companyIdOfUserWhoWillBeManipulated = configurationOfPluginThatWillBeManipulated.company_id;
        return (companyIdOfUserAutenticated == companyIdOfUserWhoWillBeManipulated);

    }else{
        return false;
    }
}

function roleHasPermissionToAccessARoute (permissionNeededToAccessARouteToAccessARoute, arrayRolesPermissions){
    return arrayRolesPermissions.includes(permissionNeededToAccessARouteToAccessARoute);
}


const returnsOneUser = async (idUser)=>{
    try{
        return await User.findByPk(idUser, {include: [{ model: Role, as: 'role' }, {model: Company, as: 'company'}]});
    }catch(e){
        console.log('Error returning user', e);
        return null;
    }
}

const returnsPermissionsOfARole = async (idRole)=>{
    try{
        let paperWithpermissions = await Role.findByPk(idRole, {include: Permission});
        if(paperWithpermissions){
            let arrayPermissions = [];
            paperWithpermissions.permissions.forEach(permission => {
                arrayPermissions.push(permission.name);
            });
            return arrayPermissions;
        }else{
            return [];
        }
    }catch(e){
        console.log('Error returning permissions', e);
        return [];
    }
}

const returnPluginConfigurationAsManipulated = async (idConfigPlugin) => {
    try{
        return await ConfigPlugins.findByPk(idConfigPlugin);
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