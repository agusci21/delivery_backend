"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dbName = process.env.DB_DATABASE_NAME || '';
const dbUser = process.env.DB_DATABASE_USER || '';
const dbPassword = process.env.DB_DATABASE_PASSWORD || '';
const db = new sequelize_1.Sequelize(dbName, dbUser, dbPassword, {
    host: 'localhost',
    dialect: 'mysql',
});
exports.default = db;
//# sourceMappingURL=connection.js.map