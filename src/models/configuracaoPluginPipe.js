import database, {Sequelize} from '../lib/database/sequelize.js'

let ConfiguracaoPluginPipe = database.define(
    "configuracao_plugin_pipe",
    {
      token: Sequelize.STRING,
      visivel: Sequelize.BOOLEAN,
      titulo: Sequelize.STRING,
      use_acordeon: Sequelize.BOOLEAN,
      campo_id: Sequelize.BOOLEAN,
      campo_atividade: Sequelize.BOOLEAN,
      campo_titulo: Sequelize.BOOLEAN,
      campo_notas: Sequelize.BOOLEAN,
      campo_criacao: Sequelize.BOOLEAN,
      campo_dono: Sequelize.BOOLEAN,
      campo_etapa: Sequelize.BOOLEAN,
      campo_funil: Sequelize.BOOLEAN,
      campo_status: Sequelize.BOOLEAN,
    },
    {
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
);

export default ConfiguracaoPluginPipe;