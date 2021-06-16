import database, {Sequelize} from '../lib/database/sequelize.js'

let Company = database.define(
    "companies",
    {
      name: Sequelize.STRING,
      cnpj: Sequelize.STRING,
    },
    {
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
);

export default Company;