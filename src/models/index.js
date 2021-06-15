import Empresa from './empresa.js'
import User from './user.js';
import Papel from './papel.js';
import Permissao from './permissao.js';
import PapeisPermissoes from './papeisPermissoes.js'
import Plugin from './plugin.js'
import ConfigPlugins from './configPlugin.js'

Papel.hasMany(User, {foreignKey: 'papel_id', as: 'papel'});
User.belongsTo(Papel, {foreignKey: 'papel_id', as: 'papel'})

Empresa.hasMany(User, {foreignKey: 'empresa_id', as: 'empresa'}); // no caso do hasMany é o (user)
User.belongsTo(Empresa, {foreignKey: 'empresa_id', as: 'empresa'}); // belongsTo é a chave estrangeira;

Papel.belongsToMany(Permissao, {foreignKey: 'papel_id', through: PapeisPermissoes});
Permissao.belongsToMany(Papel, {foreignKey: 'permissao_id', through: PapeisPermissoes});

Empresa.hasMany(ConfigPlugins, {foreignKey: 'company_id', as: 'config_plugins_company'});
ConfigPlugins.belongsTo(Empresa, {foreignKey: 'company_id', as: 'config_plugins_company'});

Plugin.hasMany(ConfigPlugins, {foreignKey: 'plugin_id', as: 'config_plugins_plugin'});
ConfigPlugins.belongsTo(Plugin, {foreignKey: 'plugin_id', as: 'config_plugins_plugin'});

export {Empresa, User, Papel, Permissao, PapeisPermissoes, Plugin, ConfigPlugins}