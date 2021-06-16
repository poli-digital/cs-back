import database, {Sequelize} from '../lib/database/sequelize.js'

let Permission = database.define(
    "permissions",
    {
      name: Sequelize.STRING,
      nickname: Sequelize.STRING,
    },
    {
      timestamps: false,
    }
);

export default Permission;