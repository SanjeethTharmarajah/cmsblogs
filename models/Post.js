const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
//const User = require('./User');
class Posts extends Model {}

Posts.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'posts',
  }
);

// Associate post with user
//Posts.belongsTo(User);

module.exports = Posts;
