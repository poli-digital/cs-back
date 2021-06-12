import { permissaoParaEditarUmaEmpresa } from "../controllers/validacaoController.js";

function retornaUsuarioAutenticado_id1_empresa1() {
    return {
        "id": 1,
        "empresa": {
            "id": 1,
        }
    }
}

test('usuario autenticado tenta modificar uma empresa que não é sua', async () => {
    let podeEditarUmaEmpresa = await permissaoParaEditarUmaEmpresa(2, retornaUsuarioAutenticado_id1_empresa1)
    expect(podeEditarUmaEmpresa).toBeFalsy();
    expect(podeEditarUmaEmpresa).not.toBeTruthy();
});

test('usuario autenticado tenta modificar uma empresa que é sua', async () => {
    let podeEditarUmaEmpresa = await permissaoParaEditarUmaEmpresa(1, retornaUsuarioAutenticado_id1_empresa1)
    expect(podeEditarUmaEmpresa).toBeTruthy();
    expect(podeEditarUmaEmpresa).not.toBeFalsy();
});

