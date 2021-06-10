import database, {Sequelize} from '../lib/database/sequelize.js'
import Papel from './papel.js';
import Permissao from './permissao.js'

let PapeisPermissoes = database.define(
    "papeis_permissoes",
    {
      papelId: {
        type: Sequelize.INTEGER,
        field: 'papel_id',
        references: {
          model: Papel,
          key: 'id',
        }
      },
      permissaoId: {
        type: Sequelize.INTEGER,
        field: 'permissao_id',
        references: {
          model: Permissao,
          key: 'id',
        }
      }
    },
    {
      timestamps: false,
    }
);

export default PapeisPermissoes;