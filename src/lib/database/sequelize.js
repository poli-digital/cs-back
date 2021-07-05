import Sequelize from 'sequelize'

const config = process.env;

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