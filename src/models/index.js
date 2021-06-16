import Company from './company.js'
import User from './user.js';
import Role from './role.js';
import Permission from './permission.js';
import RolesPermissions from './rolesPermissions.js'
import Plugin from './plugin.js'
import ConfigPlugins from './configPlugin.js'

Role.hasMany(User, {foreignKey: 'role_id', as: 'role'});
User.belongsTo(Role, {foreignKey: 'role_id', as: 'role'})

Company.hasMany(User, {foreignKey: 'company_id', as: 'company'}); // no caso do hasMany é o (user)
User.belongsTo(Company, {foreignKey: 'company_id', as: 'company'}); // belongsTo é a chave estrangeira;

Role.belongsToMany(Permission, {foreignKey: 'role_id', through: RolesPermissions});
Permission.belongsToMany(Role, {foreignKey: 'permission_id', through: RolesPermissions});

Company.hasMany(ConfigPlugins, {foreignKey: 'company_id', as: 'config_plugins_company'});
ConfigPlugins.belongsTo(Company, {foreignKey: 'company_id', as: 'config_plugins_company'});

Plugin.hasMany(ConfigPlugins, {foreignKey: 'plugin_id', as: 'config_plugins_plugin'});
ConfigPlugins.belongsTo(Plugin, {foreignKey: 'plugin_id', as: 'config_plugins_plugin'});

export {Company, User, Role, Permission, RolesPermissions, Plugin, ConfigPlugins}