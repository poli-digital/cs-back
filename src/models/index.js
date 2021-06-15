import Empresa from './empresa.js'
import User from './user.js';
import Papel from './papel.js';
import Permissao from './permissao.js';
import PapeisPermissoes from './papeisPermissoes.js'
import Plugin from './plugin.js'
import ConfigPluginPipe from './configPluginPipe.js'
import ConfigPluginPoli from './configPluginPoli.js'

Papel.hasMany(User, {foreignKey: 'papel_id', as: 'papel'});
User.belongsTo(Papel, {foreignKey: 'papel_id', as: 'papel'})

Empresa.hasMany(User, {foreignKey: 'empresa_id', as: 'empresa'}); // no caso do hasMany é o (user)
User.belongsTo(Empresa, {foreignKey: 'empresa_id', as: 'empresa'}); // belongsTo é a chave estrangeira;

Papel.belongsToMany(Permissao, {foreignKey: 'papel_id', through: PapeisPermissoes});
Permissao.belongsToMany(Papel, {foreignKey: 'permissao_id', through: PapeisPermissoes});

Empresa.hasMany(ConfigPluginPipe, {foreignKey: 'company_id', as: 'config_plugin_pipe_company'});
ConfigPluginPipe.belongsTo(Empresa, {foreignKey: 'company_id', as: 'config_plugin_pipe_company'});

Plugin.hasMany(ConfigPluginPipe, {foreignKey: 'plugin_id', as: 'config_plugin_pipe_plugin'});
ConfigPluginPipe.belongsTo(Plugin, {foreignKey: 'plugin_id', as: 'config_plugin_pipe_plugin'});

Empresa.hasMany(ConfigPluginPoli, {foreignKey: 'company_id', as: 'config_plugin_poli_company'});
ConfigPluginPoli.belongsTo(Empresa, {foreignKey: 'company_id', as: 'config_plugin_poli_company'});

Plugin.hasMany(ConfigPluginPoli, {foreignKey: 'plugin_id', as: 'config_plugin_poli_plugin'});
ConfigPluginPoli.belongsTo(Plugin, {foreignKey: 'plugin_id', as: 'config_plugin_poli_plugin'});

export {Empresa, User, Papel, Permissao, PapeisPermissoes, Plugin, ConfigPluginPipe, ConfigPluginPoli}