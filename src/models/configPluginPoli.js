import database, {Sequelize} from '../lib/database/sequelize.js'

let ConfigPluginPoli = database.define(
    "config_plugin_poli",
    {
      token: Sequelize.STRING,
      visible: Sequelize.BOOLEAN,
      title: Sequelize.STRING,
      field_id: Sequelize.BOOLEAN,
      field_id_contact: Sequelize.BOOLEAN,
      field_name: Sequelize.BOOLEAN,
      field_number: Sequelize.BOOLEAN,
      field_company: Sequelize.BOOLEAN,
      field_talk: Sequelize.BOOLEAN,
    },
    {
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      tableName: 'config_plugin_poli'
    }
);

export default ConfigPluginPoli;