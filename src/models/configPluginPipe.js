import database, {Sequelize} from '../lib/database/sequelize.js'

let ConfigPluginPipe = database.define(
    "config_plugin_pipe",
    {
      token: Sequelize.STRING,
      visible: Sequelize.BOOLEAN,
      title: Sequelize.STRING,
      use_accordion: Sequelize.BOOLEAN,
      field_id: Sequelize.BOOLEAN,
      field_activity: Sequelize.BOOLEAN,
      field_title: Sequelize.BOOLEAN,
      field_notes: Sequelize.BOOLEAN,
      field_creation: Sequelize.BOOLEAN,
      field_owner: Sequelize.BOOLEAN,
      field_stage: Sequelize.BOOLEAN,
      field_funnel: Sequelize.BOOLEAN,
      field_status: Sequelize.BOOLEAN,
    },
    {
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      tableName: 'config_plugin_pipe'
    }
);

export default ConfigPluginPipe;