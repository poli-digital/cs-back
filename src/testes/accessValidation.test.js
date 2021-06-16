import {
    permissionToManipulateACompany, 
    permissionToManipulateAUser, 
    roleHasPermissionToAccessARoute,
    permissionToManipulateTheConfigurationOfAPlugin } from '../controllers/validationController.js'


// ------------------------------------ VALIDATE ACCESS ROUTES ------------------------------------

test('Does super user have access to the route to add a new company?', () => {
    let isRouteAllowed = roleHasPermissionToAccessARoute('criar_empresa', superUserpermissions)
    expect(isRouteAllowed).toBeTruthy();
    expect(isRouteAllowed).not.toBeFalsy();
});

test('Does super user have access to the route to edit a company?', () => {
    let isRouteAllowed = roleHasPermissionToAccessARoute('editar_empresa', superUserpermissions)
    expect(isRouteAllowed).toBeTruthy();
    expect(isRouteAllowed).not.toBeFalsy();
});

test('Does super user have access to the route to delete a company?', () => {
    let isRouteAllowed = roleHasPermissionToAccessARoute('excluir_empresa', superUserpermissions)
    expect(isRouteAllowed).toBeTruthy();
    expect(isRouteAllowed).not.toBeFalsy();
});

test('Does super user have access to the route to create a user?', () => {
    let isRouteAllowed = roleHasPermissionToAccessARoute('criar_usuario', superUserpermissions)
    expect(isRouteAllowed).toBeTruthy();
    expect(isRouteAllowed).not.toBeFalsy();
});

test('Does super user have access to the route to edit a user?', () => {
    let isRouteAllowed = roleHasPermissionToAccessARoute('editar_usuario', superUserpermissions)
    expect(isRouteAllowed).toBeTruthy();
    expect(isRouteAllowed).not.toBeFalsy();
});

test('Does super user have access to the route to remove a user?', () => {
    let isRouteAllowed = roleHasPermissionToAccessARoute('excluir_usuario', superUserpermissions)
    expect(isRouteAllowed).toBeTruthy();
    expect(isRouteAllowed).not.toBeFalsy();
});

test('Does super user have access to the route to create a plugin?', () => {
    let isRouteAllowed = roleHasPermissionToAccessARoute('criar_plugin', superUserpermissions)
    expect(isRouteAllowed).toBeTruthy();
    expect(isRouteAllowed).not.toBeFalsy();
});

test('Does super user have access to the route to edit a plugin?', () => {
    let isRouteAllowed = roleHasPermissionToAccessARoute('editar_plugin', superUserpermissions)
    expect(isRouteAllowed).toBeTruthy();
    expect(isRouteAllowed).not.toBeFalsy();
});

test('Does super user have access to the route to remove a plugin?', () => {
    let isRouteAllowed = roleHasPermissionToAccessARoute('excluir_plugin', superUserpermissions)
    expect(isRouteAllowed).toBeTruthy();
    expect(isRouteAllowed).not.toBeFalsy();
});

test('Owner has access to the route to add a new company?', () => {
    let isRouteAllowed = roleHasPermissionToAccessARoute('criar_empresa', ownerPermissions)
    expect(isRouteAllowed).toBeFalsy();
    expect(isRouteAllowed).not.toBeTruthy();
});

test('Owner has access to the route to edit a company?', () => {
    let isRouteAllowed = roleHasPermissionToAccessARoute('editar_empresa', ownerPermissions)
    expect(isRouteAllowed).toBeTruthy();
    expect(isRouteAllowed).not.toBeFalsy();
});

test('Owner has access to the route to remove a company?', () => {
    let isRouteAllowed = roleHasPermissionToAccessARoute('excluir_empresa', ownerPermissions)
    expect(isRouteAllowed).toBeTruthy();
    expect(isRouteAllowed).not.toBeFalsy();
});

test('Owner has access to the route to add a new user?', () => {
    let isRouteAllowed = roleHasPermissionToAccessARoute('criar_usuario', ownerPermissions)
    expect(isRouteAllowed).toBeTruthy();
    expect(isRouteAllowed).not.toBeFalsy();
});

test('Owner has access to the route to edit a user?', () => {
    let isRouteAllowed = roleHasPermissionToAccessARoute('editar_usuario', ownerPermissions)
    expect(isRouteAllowed).toBeTruthy();
    expect(isRouteAllowed).not.toBeFalsy();
});

test('Owner has access to the route to remove a user?', () => {
    let isRouteAllowed = roleHasPermissionToAccessARoute('excluir_usuario', ownerPermissions)
    expect(isRouteAllowed).toBeTruthy();
    expect(isRouteAllowed).not.toBeFalsy();
});

test('Owner has access to route to add new plugin?', () => {
    let isRouteAllowed = roleHasPermissionToAccessARoute('criar_plugin', ownerPermissions)
    expect(isRouteAllowed).toBeTruthy();
    expect(isRouteAllowed).not.toBeFalsy();
});

test('Owner has access to route to edit a plugin?', () => {
    let isRouteAllowed = roleHasPermissionToAccessARoute('editar_plugin', ownerPermissions)
    expect(isRouteAllowed).toBeTruthy();
    expect(isRouteAllowed).not.toBeFalsy();
});

test('Owner has access to the route to remove a plugin?', () => {
    let isRouteAllowed = roleHasPermissionToAccessARoute('excluir_plugin', ownerPermissions)
    expect(isRouteAllowed).toBeTruthy();
    expect(isRouteAllowed).not.toBeFalsy();
});

test('Manager has access to route to add a new company?', () => {
    let isRouteAllowed = roleHasPermissionToAccessARoute('criar_empresa', managerPermissions)
    expect(isRouteAllowed).toBeFalsy();
    expect(isRouteAllowed).not.toBeTruthy();
});

test('Manager has access to route to edit a company?', () => {
    let isRouteAllowed = roleHasPermissionToAccessARoute('editar_empresa', managerPermissions)
    expect(isRouteAllowed).toBeTruthy();
    expect(isRouteAllowed).not.toBeFalsy();
});

test('Manager has access to route to remove a company?', () => {
    let isRouteAllowed = roleHasPermissionToAccessARoute('excluir_empresa', managerPermissions)
    expect(isRouteAllowed).toBeFalsy();
    expect(isRouteAllowed).not.toBeTruthy();
});

test('Manager has access to route to add a new user?', () => {
    let isRouteAllowed = roleHasPermissionToAccessARoute('criar_usuario', managerPermissions)
    expect(isRouteAllowed).toBeTruthy();
    expect(isRouteAllowed).not.toBeFalsy();
});

test('Manager has access to route to edit a user?', () => {
    let isRouteAllowed = roleHasPermissionToAccessARoute('editar_usuario', managerPermissions)
    expect(isRouteAllowed).toBeTruthy();
    expect(isRouteAllowed).not.toBeFalsy();
});

test('Manager has access to route to remove a user?', () => {
    let isRouteAllowed = roleHasPermissionToAccessARoute('excluir_usuario', managerPermissions)
    expect(isRouteAllowed).toBeTruthy();
    expect(isRouteAllowed).not.toBeFalsy();
});

test('Manager has access to route to add a new plugin?', () => {
    let isRouteAllowed = roleHasPermissionToAccessARoute('criar_plugin', managerPermissions)
    expect(isRouteAllowed).toBeTruthy();
    expect(isRouteAllowed).not.toBeFalsy();
});

test('Manager has access to route to edit a plugin?', () => {
    let isRouteAllowed = roleHasPermissionToAccessARoute('editar_plugin', managerPermissions)
    expect(isRouteAllowed).toBeTruthy();
    expect(isRouteAllowed).not.toBeFalsy();
});

test('Manager has access to route to remove a plugin?', () => {
    let isRouteAllowed = roleHasPermissionToAccessARoute('excluir_plugin', managerPermissions)
    expect(isRouteAllowed).toBeTruthy();
    expect(isRouteAllowed).not.toBeFalsy();
});

// ------------------------------------ MANIPULATE COMPANY ------------------------------------
test('Can super user modify his own company?', () => {
    let canModifyACompany = permissionToManipulateACompany(1, authenticatedUser_id1_company1_superuser);
    expect(canModifyACompany).toBeTruthy();
    expect(canModifyACompany).not.toBeFalsy();
});

test('Can super user modify another company?', () => {
    let canModifyACompany = permissionToManipulateACompany(2, authenticatedUser_id1_company1_superuser);
    expect(canModifyACompany).toBeTruthy();
    expect(canModifyACompany).not.toBeFalsy();
});

test('Owner can modify their own company?', () => {
    let canModifyACompany = permissionToManipulateACompany(1, authenticatedUser_id1_empresa1_owner);
    expect(canModifyACompany).toBeTruthy();
    expect(canModifyACompany).not.toBeFalsy();
});

test('Owner can modify another company?', () => {
    let canModifyACompany = permissionToManipulateACompany(2, authenticatedUser_id1_empresa1_owner);
    expect(canModifyACompany).toBeFalsy();
    expect(canModifyACompany).not.toBeTruthy();
});

test('Manager can modify his own company?', () => {
    let canModifyACompany = permissionToManipulateACompany(1, authenticatedUser_id1_empresa1_manager);
    expect(canModifyACompany).toBeTruthy();
    expect(canModifyACompany).not.toBeFalsy();
});

test('Manager can modify another company?', () => {
    let canModifyACompany = permissionToManipulateACompany(2, authenticatedUser_id1_empresa1_manager);
    expect(canModifyACompany).toBeFalsy();
    expect(canModifyACompany).not.toBeTruthy();
});

// ------------------------------------ HANDLE USER ------------------------------------

test('Can super user modify a user of your own company?', () => {
    let canModifyACompany = permissionToManipulateAUser(authenticatedUser_id1_company1_superuser, usuarioAserManipulado_id1_empresa1_superuser)
    expect(canModifyACompany).toBeTruthy();
    expect(canModifyACompany).not.toBeFalsy();
});

test('Can super user modify a user from another company?', () => {
    let canModifyACompany = permissionToManipulateAUser(authenticatedUser_id1_company1_superuser, usuarioAserManipulado_id2_empresa2_superuser)
    expect(canModifyACompany).toBeTruthy();
    expect(canModifyACompany).not.toBeFalsy();
});

test('Owner can modify a user of his own company?', () => {
    let canModifyACompany = permissionToManipulateAUser(authenticatedUser_id1_empresa1_owner, usuarioAserManipulado_id1_empresa1_superuser)
    expect(canModifyACompany).toBeTruthy();
    expect(canModifyACompany).not.toBeFalsy();
});

test('Owner can modify a user from another company?', () => {
    let canModifyACompany = permissionToManipulateAUser(authenticatedUser_id1_empresa1_owner, usuarioAserManipulado_id2_empresa2_superuser)
    expect(canModifyACompany).toBeFalsy();
    expect(canModifyACompany).not.toBeTruthy();
});

test('Manager can modify a user of his own company?', () => {
    let canModifyACompany = permissionToManipulateAUser(authenticatedUser_id1_empresa1_manager, usuarioAserManipulado_id1_empresa1_superuser)
    expect(canModifyACompany).toBeTruthy();
    expect(canModifyACompany).not.toBeFalsy();
});

test('Manager can modify a user from another company?', () => {
    let canModifyACompany = permissionToManipulateAUser(authenticatedUser_id1_empresa1_manager, usuarioAserManipulado_id2_empresa2_superuser)
    expect(canModifyACompany).toBeFalsy();
    expect(canModifyACompany).not.toBeTruthy();
});

// ------------------------------------ MANIPULATE CONFIG PLUGIN  ------------------------------------

test('Can super user modify a plugin configuration of his own company?', () => {
    let canModifyACompany = permissionToManipulateTheConfigurationOfAPlugin(authenticatedUser_id1_company1_superuser, configurationOfPluginThatWillBeManipulated_id1_company1)
    expect(canModifyACompany).toBeTruthy();
    expect(canModifyACompany).not.toBeFalsy();
});

test('Can the superuser modify the plugin configuration that is from another company?', () => {
    let canModifyACompany = permissionToManipulateTheConfigurationOfAPlugin(authenticatedUser_id1_company1_superuser, configurationOfPluginThatWillBeManipulated_id2_company2)
    expect(canModifyACompany).toBeTruthy();
    expect(canModifyACompany).not.toBeFalsy();
});

test('Owner can modify a plugin configuration of his own company?', () => {
    let canModifyACompany = permissionToManipulateTheConfigurationOfAPlugin(authenticatedUser_id1_empresa1_owner, configurationOfPluginThatWillBeManipulated_id1_company1)
    expect(canModifyACompany).toBeTruthy();
    expect(canModifyACompany).not.toBeFalsy();
});

test('Owner can modify a plugin configuration from another company?', () => {
    let canModifyACompany = permissionToManipulateTheConfigurationOfAPlugin(authenticatedUser_id1_empresa1_owner, configurationOfPluginThatWillBeManipulated_id2_company2)
    expect(canModifyACompany).toBeFalsy();
    expect(canModifyACompany).not.toBeTruthy();
});

test('Manager can modify a plugin configuration of his own company?', () => {
    let canModifyACompany = permissionToManipulateTheConfigurationOfAPlugin(authenticatedUser_id1_empresa1_manager, configurationOfPluginThatWillBeManipulated_id1_company1)
    expect(canModifyACompany).toBeTruthy();
    expect(canModifyACompany).not.toBeFalsy();
});

test('Manager can modify a plugin configuration from another company?', () => {
    let canModifyACompany = permissionToManipulateTheConfigurationOfAPlugin(authenticatedUser_id1_empresa1_manager, configurationOfPluginThatWillBeManipulated_id2_company2)
    expect(canModifyACompany).toBeFalsy();
    expect(canModifyACompany).not.toBeTruthy();
});

// ------------------------------------ AUX FUNCTIONS ------------------------------------

const authenticatedUser_id1_company1_superuser = {
    "id": 1,
    "empresa": {
        "id": 1,
    },
    "papel": {
        "name": "super"
    }
}

const authenticatedUser_id1_empresa1_owner = {
    "id": 1,
    "empresa": {
        "id": 1,
    },
    "papel": {
        "name": "owner"
    }
}

const authenticatedUser_id1_empresa1_manager = {
    "id": 1,
    "empresa": {
        "id": 1,
    },
    "papel": {
        "name": "manager"
    }
}

const usuarioAserManipulado_id1_empresa1_superuser = {
    "id": 1,
    "empresa": {
        "id": 1,
    },
    "papel": {
        "name": "super"
    }
}

const usuarioAserManipulado_id2_empresa2_superuser = {
    "id": 2,
    "empresa": {
        "id": 2,
    },
    "papel": {
        "name": "super"
    }
}


const superUserpermissions = [
    'criar_empresa',
    'editar_empresa',
    'excluir_empresa',
    'criar_usuario',
    'editar_usuario',
    'excluir_usuario',
    'criar_plugin',
    'editar_plugin',
    'excluir_plugin'
];

const ownerPermissions = [
    'editar_empresa',
    'excluir_empresa',
    'criar_usuario',
    'editar_usuario',
    'excluir_usuario',
    'criar_plugin',
    'editar_plugin',
    'excluir_plugin'
];

const managerPermissions = [
    'editar_empresa',
    'criar_usuario',
    'editar_usuario',
    'excluir_usuario',
    'criar_plugin',
    'editar_plugin',
    'excluir_plugin'
];

const permissoesDoUser = [];

const configurationOfPluginThatWillBeManipulated_id1_company1= {
    "id": 1,
    "company_id":1
}

const configurationOfPluginThatWillBeManipulated_id2_company2 = {
    "id": 2,
    "company_id":2
}
