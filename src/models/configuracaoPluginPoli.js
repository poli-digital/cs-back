import database, {Sequelize} from '../lib/database/sequelize.js'

let ConfiguracaoPluginPoli = database.define(
    "configuracao_plugin_poli",
    {
      token: Sequelize.STRING,
      visivel: Sequelize.BOOLEAN,
      titulo: Sequelize.STRING,
      campo_id: Sequelize.BOOLEAN,
      campo_id_contato: Sequelize.BOOLEAN,
      campo_nome: Sequelize.BOOLEAN,
      campo_numero: Sequelize.BOOLEAN,
      campo_empresa: Sequelize.BOOLEAN,
      campo_conversa: Sequelize.BOOLEAN,
    },
    {
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
);

export default ConfiguracaoPluginPoli;