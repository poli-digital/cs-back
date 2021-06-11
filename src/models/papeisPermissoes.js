import database, {Sequelize} from '../lib/database/sequelize.js'

let PapeisPermissoes = database.define(
    "papeis_permissoes",
    {},
    {
      timestamps: false,
    }
);

export default PapeisPermissoes;