import database, {Sequelize} from '../lib/database/sequelize.js'

let Papel = database.define(
    "papeis",
    {
      nome: Sequelize.STRING,
      apelido: Sequelize.STRING,
    },
    {
      timestamps: false,
    }
);

export default Papel;