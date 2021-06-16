import database, {Sequelize} from '../lib/database/sequelize.js'

let RolesPermissions = database.define(
    "roles_permissions",
    {},
    {
      timestamps: false,
    }
);

export default RolesPermissions;