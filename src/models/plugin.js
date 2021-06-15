import database, {Sequelize} from '../lib/database/sequelize.js'

let Plugin = database.define(
    "plugins",
    {
      nome: Sequelize.STRING,
      apelido: Sequelize.STRING,
      titulo: Sequelize.STRING,
      descricao: Sequelize.STRING,
    },
    {
      timestamps: false,
    }
);

export default Plugin;