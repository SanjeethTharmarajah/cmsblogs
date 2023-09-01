const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Post = require('./Post');

class Comments extends Model {}

Comments.init(
  {
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'comments',
  }
);


// Associate comment with user and post
Comments.belongsTo(User);
Comments.belongsTo(Post);

module.exports = Comments;
