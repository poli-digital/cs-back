import papeisPermissoes from "../models/papeisPermissoes.js";

const validacoes = {


    criarEmpresa(req, res, next){

    },

    editarEmpresa(req, res, next){

    },

    removerEmpresa(req, res, next){

    },

    crarUsuario(req, res, next){

    }, 

    editarUsuario(req, res, next){
        
    }, 

    removerUsuario(req, res, next){
        
    },

    criarPlugin(req, res, next){

    },

    editarPlugin(req, res, next){
        
    },

    removerPlugin(req, res, next){
        
    }
}

async function buscaPemissoes  (req, res, next){
    //let buscaPemissoes = await papeisPermissoes.findAll({ include: [{model: Papel }] });
    let buscaPemissoes = await papeisPermissoes.findAll();
    if(buscaPemissoes){
        res.json({papeis:buscaPemissoes});
    }else{
        res.json({message:"Falhou"});
    }
}

export default buscaPemissoes;