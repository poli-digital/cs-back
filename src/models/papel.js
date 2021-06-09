import database, {Sequelize} from '../lib/database/sequelize.js'

let Papel = database.define(
    "papeis",
    {
      nome: Sequelize.STRING
    },
    {
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
);

export default Papel;