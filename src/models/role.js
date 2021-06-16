import database, {Sequelize} from '../lib/database/sequelize.js'

let Role = database.define(
    "roles",
    {
      name: Sequelize.STRING,
      nickname: Sequelize.STRING,
    },
    {
      timestamps: false,
    }
);

export default Role;