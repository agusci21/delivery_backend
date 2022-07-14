import { Sequelize, Model, DataTypes } from 'sequelize'
import db from '../db/connection'

class User extends Model {
  declare name: string
  declare email: string
  declare lastname: string | null
  declare password: string
  declare phone: string | null
  declare image: string | null
}

User.init(
  {
    name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: 'users',
    sequelize: db,
  },
)

export default User
