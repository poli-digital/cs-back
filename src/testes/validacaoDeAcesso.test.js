import {
    permissaoParaManipularUmaEmpresa, 
    permissaoParaManipularUmUsuario, 
    papelTemPermissaoParaAcessarARota,
    permissionToManipulateTheConfigurationOfAPlugin } from '../controllers/validacaoController.js'


// ------------------------------------ VALIDATE ACCESS ROUTES ------------------------------------

test('Super user tem acesso a rota para adicionar uma nova empresa?', () => {
    let isRotaPermitida = papelTemPermissaoParaAcessarARota('criar_empresa', permissoesDoSuperUser)
    expect(isRotaPermitida).toBeTruthy();
    expect(isRotaPermitida).not.toBeFalsy();
});

test('Super user tem acesso a rota para editar uma empresa?', () => {
    let isRotaPermitida = papelTemPermissaoParaAcessarARota('editar_empresa', permissoesDoSuperUser)
    expect(isRotaPermitida).toBeTruthy();
    expect(isRotaPermitida).not.toBeFalsy();
});

test('Super user tem acesso a rota para excluir uma empresa?', () => {
    let isRotaPermitida = papelTemPermissaoParaAcessarARota('excluir_empresa', permissoesDoSuperUser)
    expect(isRotaPermitida).toBeTruthy();
    expect(isRotaPermitida).not.toBeFalsy();
});

test('Super user tem acesso a rota para criar um usuário?', () => {
    let isRotaPermitida = papelTemPermissaoParaAcessarARota('criar_usuario', permissoesDoSuperUser)
    expect(isRotaPermitida).toBeTruthy();
    expect(isRotaPermitida).not.toBeFalsy();
});

test('Super user tem acesso a rota para editar um usuário?', () => {
    let isRotaPermitida = papelTemPermissaoParaAcessarARota('editar_usuario', permissoesDoSuperUser)
    expect(isRotaPermitida).toBeTruthy();
    expect(isRotaPermitida).not.toBeFalsy();
});

test('Super user tem acesso a rota para remover um usuário?', () => {
    let isRotaPermitida = papelTemPermissaoParaAcessarARota('excluir_usuario', permissoesDoSuperUser)
    expect(isRotaPermitida).toBeTruthy();
    expect(isRotaPermitida).not.toBeFalsy();
});

test('Super user tem acesso a rota para criar um plugin?', () => {
    let isRotaPermitida = papelTemPermissaoParaAcessarARota('criar_plugin', permissoesDoSuperUser)
    expect(isRotaPermitida).toBeTruthy();
    expect(isRotaPermitida).not.toBeFalsy();
});

test('Super user tem acesso a rota para editar um plugin?', () => {
    let isRotaPermitida = papelTemPermissaoParaAcessarARota('editar_plugin', permissoesDoSuperUser)
    expect(isRotaPermitida).toBeTruthy();
    expect(isRotaPermitida).not.toBeFalsy();
});

test('Super user tem acesso a rota para remover um plugin?', () => {
    let isRotaPermitida = papelTemPermissaoParaAcessarARota('excluir_plugin', permissoesDoSuperUser)
    expect(isRotaPermitida).toBeTruthy();
    expect(isRotaPermitida).not.toBeFalsy();
});

test('Owner tem acesso a rota para adicionar uma nova empresa?', () => {
    let isRotaPermitida = papelTemPermissaoParaAcessarARota('criar_empresa', permissoesDoOwner)
    expect(isRotaPermitida).toBeFalsy();
    expect(isRotaPermitida).not.toBeTruthy();
});

test('Owner tem acesso a rota para editar uma empresa?', () => {
    let isRotaPermitida = papelTemPermissaoParaAcessarARota('editar_empresa', permissoesDoOwner)
    expect(isRotaPermitida).toBeTruthy();
    expect(isRotaPermitida).not.toBeFalsy();
});

test('Owner tem acesso a rota para remover uma empresa?', () => {
    let isRotaPermitida = papelTemPermissaoParaAcessarARota('excluir_empresa', permissoesDoOwner)
    expect(isRotaPermitida).toBeTruthy();
    expect(isRotaPermitida).not.toBeFalsy();
});

test('Owner tem acesso a rota para adicionar um novo usuário?', () => {
    let isRotaPermitida = papelTemPermissaoParaAcessarARota('criar_usuario', permissoesDoOwner)
    expect(isRotaPermitida).toBeTruthy();
    expect(isRotaPermitida).not.toBeFalsy();
});

test('Owner tem acesso a rota para editar um usuário?', () => {
    let isRotaPermitida = papelTemPermissaoParaAcessarARota('editar_usuario', permissoesDoOwner)
    expect(isRotaPermitida).toBeTruthy();
    expect(isRotaPermitida).not.toBeFalsy();
});

test('Owner tem acesso a rota para remover um usuário?', () => {
    let isRotaPermitida = papelTemPermissaoParaAcessarARota('excluir_usuario', permissoesDoOwner)
    expect(isRotaPermitida).toBeTruthy();
    expect(isRotaPermitida).not.toBeFalsy();
});

test('Owner tem acesso a rota para adicionar um novo plugin?', () => {
    let isRotaPermitida = papelTemPermissaoParaAcessarARota('criar_plugin', permissoesDoOwner)
    expect(isRotaPermitida).toBeTruthy();
    expect(isRotaPermitida).not.toBeFalsy();
});

test('Owner tem acesso a rota para editar um plugin?', () => {
    let isRotaPermitida = papelTemPermissaoParaAcessarARota('editar_plugin', permissoesDoOwner)
    expect(isRotaPermitida).toBeTruthy();
    expect(isRotaPermitida).not.toBeFalsy();
});

test('Owner tem acesso a rota para remover um plugin?', () => {
    let isRotaPermitida = papelTemPermissaoParaAcessarARota('excluir_plugin', permissoesDoOwner)
    expect(isRotaPermitida).toBeTruthy();
    expect(isRotaPermitida).not.toBeFalsy();
});

test('Manager tem acesso a rota para adicionar uma nova empresa?', () => {
    let isRotaPermitida = papelTemPermissaoParaAcessarARota('criar_empresa', permissoesDoManager)
    expect(isRotaPermitida).toBeFalsy();
    expect(isRotaPermitida).not.toBeTruthy();
});

test('Manager tem acesso a rota para editar uma empresa?', () => {
    let isRotaPermitida = papelTemPermissaoParaAcessarARota('editar_empresa', permissoesDoManager)
    expect(isRotaPermitida).toBeTruthy();
    expect(isRotaPermitida).not.toBeFalsy();
});

test('Manager tem acesso a rota para remover uma empresa?', () => {
    let isRotaPermitida = papelTemPermissaoParaAcessarARota('excluir_empresa', permissoesDoManager)
    expect(isRotaPermitida).toBeFalsy();
    expect(isRotaPermitida).not.toBeTruthy();
});

test('Manager tem acesso a rota para adicionar um novo usuário?', () => {
    let isRotaPermitida = papelTemPermissaoParaAcessarARota('criar_usuario', permissoesDoManager)
    expect(isRotaPermitida).toBeTruthy();
    expect(isRotaPermitida).not.toBeFalsy();
});

test('Manager tem acesso a rota para editar um usuário?', () => {
    let isRotaPermitida = papelTemPermissaoParaAcessarARota('editar_usuario', permissoesDoManager)
    expect(isRotaPermitida).toBeTruthy();
    expect(isRotaPermitida).not.toBeFalsy();
});

test('Manager tem acesso a rota para remover um usuário?', () => {
    let isRotaPermitida = papelTemPermissaoParaAcessarARota('excluir_usuario', permissoesDoManager)
    expect(isRotaPermitida).toBeTruthy();
    expect(isRotaPermitida).not.toBeFalsy();
});

test('Manager tem acesso a rota para adicionar um novo plugin?', () => {
    let isRotaPermitida = papelTemPermissaoParaAcessarARota('criar_plugin', permissoesDoManager)
    expect(isRotaPermitida).toBeTruthy();
    expect(isRotaPermitida).not.toBeFalsy();
});

test('Manager tem acesso a rota para editar um plugin?', () => {
    let isRotaPermitida = papelTemPermissaoParaAcessarARota('editar_plugin', permissoesDoManager)
    expect(isRotaPermitida).toBeTruthy();
    expect(isRotaPermitida).not.toBeFalsy();
});

test('Manager tem acesso a rota para remover um plugin?', () => {
    let isRotaPermitida = papelTemPermissaoParaAcessarARota('excluir_plugin', permissoesDoManager)
    expect(isRotaPermitida).toBeTruthy();
    expect(isRotaPermitida).not.toBeFalsy();
});

// ------------------------------------ MANIPULAR EMPRESA ------------------------------------
test('Super user pode modificar sua propria empresa?', () => {
    let podeModificarUmaEmpresa = permissaoParaManipularUmaEmpresa(1, usuarioAutenticado_id1_empresa1_superuser);
    expect(podeModificarUmaEmpresa).toBeTruthy();
    expect(podeModificarUmaEmpresa).not.toBeFalsy();
});

test('Super user pode modificar outra empresa?', () => {
    let podeModificarUmaEmpresa = permissaoParaManipularUmaEmpresa(2, usuarioAutenticado_id1_empresa1_superuser);
    expect(podeModificarUmaEmpresa).toBeTruthy();
    expect(podeModificarUmaEmpresa).not.toBeFalsy();
});

test('Owner pode modificar sua propria empresa?', () => {
    let podeModificarUmaEmpresa = permissaoParaManipularUmaEmpresa(1, usuarioAutenticado_id1_empresa1_owner);
    expect(podeModificarUmaEmpresa).toBeTruthy();
    expect(podeModificarUmaEmpresa).not.toBeFalsy();
});

test('Owner pode modificar outra empresa?', () => {
    let podeModificarUmaEmpresa = permissaoParaManipularUmaEmpresa(2, usuarioAutenticado_id1_empresa1_owner);
    expect(podeModificarUmaEmpresa).toBeFalsy();
    expect(podeModificarUmaEmpresa).not.toBeTruthy();
});

test('Manager pode modificar sua propria empresa?', () => {
    let podeModificarUmaEmpresa = permissaoParaManipularUmaEmpresa(1, usuarioAutenticado_id1_empresa1_manager);
    expect(podeModificarUmaEmpresa).toBeTruthy();
    expect(podeModificarUmaEmpresa).not.toBeFalsy();
});

test('Manager pode modificar outra empresa?', () => {
    let podeModificarUmaEmpresa = permissaoParaManipularUmaEmpresa(2, usuarioAutenticado_id1_empresa1_manager);
    expect(podeModificarUmaEmpresa).toBeFalsy();
    expect(podeModificarUmaEmpresa).not.toBeTruthy();
});

// ------------------------------------ MANIPULAR USUÁRIO ------------------------------------

test('Super user pode modificar um usuário de sua propria empresa?', () => {
    let podeModificarUmaEmpresa = permissaoParaManipularUmUsuario(usuarioAutenticado_id1_empresa1_superuser, usuarioAserManipulado_id1_empresa1_superuser)
    expect(podeModificarUmaEmpresa).toBeTruthy();
    expect(podeModificarUmaEmpresa).not.toBeFalsy();
});

test('Super user pode modificar um usuário de uma outra empresa?', () => {
    let podeModificarUmaEmpresa = permissaoParaManipularUmUsuario(usuarioAutenticado_id1_empresa1_superuser, usuarioAserManipulado_id2_empresa2_superuser)
    expect(podeModificarUmaEmpresa).toBeTruthy();
    expect(podeModificarUmaEmpresa).not.toBeFalsy();
});

test('Owner pode modificar um usuário de sua propria empresa?', () => {
    let podeModificarUmaEmpresa = permissaoParaManipularUmUsuario(usuarioAutenticado_id1_empresa1_owner, usuarioAserManipulado_id1_empresa1_superuser)
    expect(podeModificarUmaEmpresa).toBeTruthy();
    expect(podeModificarUmaEmpresa).not.toBeFalsy();
});

test('Owner pode modificar um usuário de uma outra empresa?', () => {
    let podeModificarUmaEmpresa = permissaoParaManipularUmUsuario(usuarioAutenticado_id1_empresa1_owner, usuarioAserManipulado_id2_empresa2_superuser)
    expect(podeModificarUmaEmpresa).toBeFalsy();
    expect(podeModificarUmaEmpresa).not.toBeTruthy();
});

test('Manager pode modificar um usuário de sua propria empresa?', () => {
    let podeModificarUmaEmpresa = permissaoParaManipularUmUsuario(usuarioAutenticado_id1_empresa1_manager, usuarioAserManipulado_id1_empresa1_superuser)
    expect(podeModificarUmaEmpresa).toBeTruthy();
    expect(podeModificarUmaEmpresa).not.toBeFalsy();
});

test('Manager pode modificar um usuário de uma outra empresa?', () => {
    let podeModificarUmaEmpresa = permissaoParaManipularUmUsuario(usuarioAutenticado_id1_empresa1_manager, usuarioAserManipulado_id2_empresa2_superuser)
    expect(podeModificarUmaEmpresa).toBeFalsy();
    expect(podeModificarUmaEmpresa).not.toBeTruthy();
});

// ------------------------------------ MANIPULATE CONFIG PLUGIN  ------------------------------------

test('Super user pode modificar uma configuração de plugin de sua propria empresa?', () => {
    let canModifyACompany = permissionToManipulateTheConfigurationOfAPlugin(usuarioAutenticado_id1_empresa1_superuser, configurationOfPluginThatWillBeManipulated_id1_company1)
    expect(canModifyACompany).toBeTruthy();
    expect(canModifyACompany).not.toBeFalsy();
});

test('Super user pode modificar uma configuração de plugin de uma outra empresa?', () => {
    let canModifyACompany = permissionToManipulateTheConfigurationOfAPlugin(usuarioAutenticado_id1_empresa1_superuser, configurationOfPluginThatWillBeManipulated_id2_company2)
    expect(canModifyACompany).toBeTruthy();
    expect(canModifyACompany).not.toBeFalsy();
});

test('Owner pode modificar uma configuração de plugin de sua propria empresa?', () => {
    let canModifyACompany = permissionToManipulateTheConfigurationOfAPlugin(usuarioAutenticado_id1_empresa1_owner, configurationOfPluginThatWillBeManipulated_id1_company1)
    expect(canModifyACompany).toBeTruthy();
    expect(canModifyACompany).not.toBeFalsy();
});

test('Owner pode modificar uma configuração de plugin de uma outra empresa?', () => {
    let canModifyACompany = permissionToManipulateTheConfigurationOfAPlugin(usuarioAutenticado_id1_empresa1_owner, configurationOfPluginThatWillBeManipulated_id2_company2)
    expect(canModifyACompany).toBeFalsy();
    expect(canModifyACompany).not.toBeTruthy();
});

test('Manager pode modificar uma configuração de plugin de sua propria empresa?', () => {
    let canModifyACompany = permissionToManipulateTheConfigurationOfAPlugin(usuarioAutenticado_id1_empresa1_manager, configurationOfPluginThatWillBeManipulated_id1_company1)
    expect(canModifyACompany).toBeTruthy();
    expect(canModifyACompany).not.toBeFalsy();
});

test('Manager pode modificar uma configuração de plugin de uma outra empresa?', () => {
    let canModifyACompany = permissionToManipulateTheConfigurationOfAPlugin(usuarioAutenticado_id1_empresa1_manager, configurationOfPluginThatWillBeManipulated_id2_company2)
    expect(canModifyACompany).toBeFalsy();
    expect(canModifyACompany).not.toBeTruthy();
});

// ------------------------------------ FUNÇÕES DE AUXILIO ------------------------------------

const usuarioAutenticado_id1_empresa1_superuser = {
    "id": 1,
    "empresa": {
        "id": 1,
    },
    "papel": {
        "nome": "super"
    }
}

const usuarioAutenticado_id1_empresa1_owner = {
    "id": 1,
    "empresa": {
        "id": 1,
    },
    "papel": {
        "nome": "owner"
    }
}

const usuarioAutenticado_id1_empresa1_manager = {
    "id": 1,
    "empresa": {
        "id": 1,
    },
    "papel": {
        "nome": "manager"
    }
}

const usuarioAserManipulado_id1_empresa1_superuser = {
    "id": 1,
    "empresa": {
        "id": 1,
    },
    "papel": {
        "nome": "super"
    }
}

const usuarioAserManipulado_id2_empresa2_superuser = {
    "id": 2,
    "empresa": {
        "id": 2,
    },
    "papel": {
        "nome": "super"
    }
}


const permissoesDoSuperUser = [
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

const permissoesDoOwner = [
    'editar_empresa',
    'excluir_empresa',
    'criar_usuario',
    'editar_usuario',
    'excluir_usuario',
    'criar_plugin',
    'editar_plugin',
    'excluir_plugin'
];

const permissoesDoManager = [
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
