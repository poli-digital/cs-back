import {Role, Permission, User, Company, ConfigPlugins} from "../models/index.js";

async function canAccessRouteToCreateACompany(req, res, next) {
    canAccessRoute(req, res, next, 'criar_empresa', false)
}

async function canAccessRouteToEditACompany(req, res, next) {
    canAccessRoute(req, res, next, 'editar_empresa', true)
}

async function canAccessRouteToRemoveACompany(req, res, next) {
    canAccessRoute(req, res, next, 'excluir_empresa', true)
}

async function canAccessRouteToCreateAUser(req, res, next) {
    canAccessRoute(req, res, next, 'criar_usuario', false)
}

async function canAccessRouteToEditAUser(req, res, next) {
    canAccessRoute(req, res, next, 'editar_usuario', true)
}

async function canAccessRouteToRemoveAUser(req, res, next) {
    canAccessRoute(req, res, next, 'excluir_usuario', true)
}

async function canAccessRouteToCreateAConfigPlugin(req, res, next) {
    canAccessRoute(req, res, next, 'criar_plugin', false)
}

async function canAccessRouteToEditAConfigPlugin(req, res, next) {
    canAccessRoute(req, res, next, 'editar_plugin', true)
}

async function canAccessRouteToRemoveAConfigPlugin(req, res, next) {
    canAccessRoute(req, res, next, 'excluir_plugin', true)
}

async function validateCompanyManipulation(userAuthenticated, req, res, next) {
    let isPermitidoManipularEmpresa = permissionToManipulateACompany(req.params.id, userAuthenticated);
    if(isPermitidoManipularEmpresa){
        next();
    }else{
        res.status(401).json({message:'You can only manipulate (edit or remove) your own company!'});
    }
}

async function validateUserManipulation(userAuthenticated, req, res, next) {
    //let userAuthenticated = await returnsOneUser(req.user.id);
    let userToBeManipulated = await returnsOneUser(req.params.id);
    if(userToBeManipulated){
        let isPermitidoManipularUsuario = permissionToManipulateAUser(userAuthenticated, userToBeManipulated);
        if(isPermitidoManipularUsuario){
            next();
        }else{
            res.status(401).json({message:'You can only manipulate (add, edit or remove) users in your own company'});
        }
    }else{
        res.status(401).json({message:'User not found!'});
    }
}

async function validateConfigPluginManipulation(userAuthenticated, req, res, next) {
    //let userAuthenticated = await returnsOneUser(req.user.id);
    let configurationOfPluginThatWillBeManipulated = await returnPluginConfigurationAsManipulated(req.params.id);
    if(configurationOfPluginThatWillBeManipulated){
        let manipulateConfigPluginIsAllowed = permissionToManipulateTheConfigurationOfAPlugin(userAuthenticated,  configurationOfPluginThatWillBeManipulated);
        if(manipulateConfigPluginIsAllowed){
            next();
        }else{
            res.status(401).json({message:'You can only manipulate (add, edit or remove) Config Plugin in your own company'});
        }
    }else{
        res.status(401).json({message:'Config plugin not found!'});
    }
}

async function canAccessRoute(req, res, next, permissionToAccessRoute, goNextWithUserAuthenticated) {
    let userAuthenticated = await returnsOneUser(req.user.id);
    let isRouteAllowed = await permissionOfAccessARoute(userAuthenticated, permissionToAccessRoute);
    if(isRouteAllowed){
        if(goNextWithUserAuthenticated){
            next(userAuthenticated);  
        }else{
            next();
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

export {
    permissionToManipulateACompany, permissionToManipulateAUser,
    roleHasPermissionToAccessARoute, permissionToManipulateTheConfigurationOfAPlugin,
    canAccessRouteToCreateACompany, canAccessRouteToEditACompany, canAccessRouteToRemoveACompany,
    canAccessRouteToCreateAUser, canAccessRouteToEditAUser, canAccessRouteToRemoveAUser,
    canAccessRouteToCreateAConfigPlugin, canAccessRouteToEditAConfigPlugin, canAccessRouteToRemoveAConfigPlugin,
    validateCompanyManipulation, validateUserManipulation, validateConfigPluginManipulation
};