import database, {Sequelize} from '../lib/database/sequelize.js'

let Permissao = database.define(
    "permissoes",
    {
      nome: Sequelize.STRING,
      apelido: Sequelize.STRING,
    },
    {
      timestamps: false,
    }
);

export default Permissao;