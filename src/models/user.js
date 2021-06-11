import database, {Sequelize} from '../lib/database/sequelize.js'

let User = database.define(
    "usuarios",
    {
      nome: Sequelize.STRING,
      email: Sequelize.STRING,
      senha: Sequelize.STRING,
      bloqueado: Sequelize.BOOLEAN,
    },
    {
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
);

export default User;