import { Sequelize } from "sequelize";
import dbConfig from './db.config.js';
export const sequelize = new Sequelize(dbConfig.NAME,
    dbConfig.USER,
    dbConfig.PASSWORD,

    {
        host: dbConfig.HOST,
        port: dbConfig.PORT,
        dialect: dbConfig.dialect,
        dialectOptions: dbConfig.dialectOptions,
        logging: false
    }
);