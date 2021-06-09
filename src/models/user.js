import database, {Sequelize} from '../lib/database/sequelize.js'
import Empresa from './empresa.js';
import Papel from './papel.js';

let User = database.define(
    "usuarios",
    {
      nome: Sequelize.STRING,
      email: Sequelize.STRING,
      senha: Sequelize.STRING,
      bloqueado: Sequelize.BOOLEAN,
      papelId: {
        type: Sequelize.INTEGER,
        field: 'papel_id',
        references: {
          model: Papel,
          key: 'id',
        }
      },
      empresaId:{
        type: Sequelize.INTEGER,
        field: 'empresa_id',
        references: {
          model: Empresa,
          key: 'id',
        }
      }
    },
    {
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
);

export default User;