import database, {Sequelize} from '../lib/database/sequelize.js'

let Empresa = database.define(
    "empresas",
    {
      nome: Sequelize.STRING,
      cnpj: Sequelize.STRING,
    },
    {
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
);

export default Empresa;