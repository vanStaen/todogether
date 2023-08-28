const { sequelize, DataTypes } = require('../lib/sequelizedb');
const { User } = require('./User');

const Comment = sequelize.define("comment", {
  _id: {
    type: DataTypes.INTEGER,
    field: "_id",
    autoIncrement: true,
    primaryKey: true
  },
  comment: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

User.hasMany(Comment);
Comment.belongsTo(User);

module.exports = {
  Comment
};
