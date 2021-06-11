import {Papel, Permissao} from "../models/index.js";

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

    //let buscaPemissoes = await Papel.findByPk(1, {include: Permissao});
    let buscaPemissoes = await Papel.findByPk(1, {include: Permissao});
    if(buscaPemissoes){
        res.json(buscaPemissoes);
    }else{
        res.json({message:"Falhou"});
    }
}

export default buscaPemissoes;