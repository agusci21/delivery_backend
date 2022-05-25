"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const User = connection_1.default.define('User', {
    name: {
        type: sequelize_1.DataTypes.STRING
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
    },
    lastname: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    password: {
        type: sequelize_1.DataTypes.STRING
    },
    phone: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    /* created_at: {
         type: DataTypes.DATE,
         defaultValue: new Date()
     },
     updated_at: {
         type: DataTypes.DATE,
         defaultValue: new Date()
     },*/
});
exports.default = User;
//# sourceMappingURL=user.js.map