import { dbConfig } from '../config/config.js';
import { Sequelize } from 'sequelize';
import { createAction } from './action.model.js';
import 'dotenv/config';

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    // define: {
    //     timestamps: true,
    //     updatedAt: false,
    // },
    dialect: dbConfig.DIALECT,
    host: dbConfig.HOST,
    port: dbConfig.PORT,
});

export const db = {
    Sequelize: Sequelize,
    sequelize: sequelize,
    actions: createAction(sequelize, Sequelize),
};
