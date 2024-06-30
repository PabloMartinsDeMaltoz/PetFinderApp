import "dotenv/config";

import { Sequelize } from "sequelize";

// Option 1: Passing a connection URI
export const sequelize = new Sequelize(process.env.SEQ_USER, {
  host: 'localhost',
  dialect: 'postgres',
}); // Example for postgres

