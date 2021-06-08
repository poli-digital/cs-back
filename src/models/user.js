import database, {Sequelize} from '../lib/database/sequelize.js'

let User = database.define(
    "users",
    {
      nome: Sequelize.STRING,
      email: Sequelize.STRING,
    },
    {
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
);

export default User;