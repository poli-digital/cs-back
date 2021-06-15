import Sequelize from 'sequelize'
import config from '../../config/config.js'

// Option 1: Passing parameters separately
const database = new Sequelize(
  config.DB_DATABASE,
  config.DB_USERNAME,
  config.DB_PASSWORD,
  {
    host: config.DB_HOST,
    dialect: config.DB_CONNECTION,

    logging: false
  },
);

export default database;

export {Sequelize};