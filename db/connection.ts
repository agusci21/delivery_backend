import { Sequelize } from "sequelize";

const db = new Sequelize('delivery', 'root', '19FACI02bauti', {
    host: 'localhost',
    dialect: 'mysql',
})

export default db