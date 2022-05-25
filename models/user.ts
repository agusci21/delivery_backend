import { DataTypes } from "sequelize";
import db from "../db/connection";

const User = db.define('User',{
    name: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING,
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: true
    },
    password: {
        type: DataTypes.STRING
    },
    phone: {
        type: DataTypes.STRING,
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
    
})

export default User
