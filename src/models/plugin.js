import database, {Sequelize} from '../lib/database/sequelize.js'

let Plugin = database.define(
    "plugins",
    {
      name: Sequelize.STRING,
      nickname: Sequelize.STRING,
      title: Sequelize.STRING,
      description: Sequelize.STRING,
    },
    {
      timestamps: false,
    }
);

export default Plugin;