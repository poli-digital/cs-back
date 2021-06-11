import Empresa from './empresa.js'
import User from './user.js';
import Papel from './papel.js';
import Permissao from './permissao.js';
import PapeisPermissoes from './papeisPermissoes.js'

// A forma de ler e compreender é bem confusa
Papel.hasMany(User, {foreignKey: 'papel_id', as: 'papel'});
User.belongsTo(Papel, {foreignKey: 'papel_id', as: 'papel'})

Empresa.hasMany(User, {foreignKey: 'empresa_id', as: 'empresa'}); // no caso do hasMany é o (user)
User.belongsTo(Empresa, {foreignKey: 'empresa_id', as: 'empresa'}); // belongsTo é a chave estrangeira;

Papel.belongsToMany(Permissao, {foreignKey: 'papel_id', through: PapeisPermissoes});
Permissao.belongsToMany(Papel, {foreignKey: 'permissao_id', through: PapeisPermissoes});

export {Empresa, User, Papel, Permissao, PapeisPermissoes}