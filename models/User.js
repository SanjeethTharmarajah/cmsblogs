const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
class Users extends Model {}

Users.init(
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'users',
  }
);



module.exports = Users;

