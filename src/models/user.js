import database, {Sequelize} from '../lib/database/sequelize.js'

let User = database.define(
    "user",
    {
      name: Sequelize.STRING,
      email: Sequelize.STRING,
      password: Sequelize.STRING,
      blocked: Sequelize.BOOLEAN,
    },
    {
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
);

export default User;