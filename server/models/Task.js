const { sequelize, DataTypes } = require('../lib/sequelizedb');
const { Comment } = require('./Comment');
const { User } = require('./User');
const { List } = require('./List');
const { Picture } = require('./Picture');

const Task = sequelize.define("task", {
  _id: {
    type: DataTypes.INTEGER,
    field: "_id",
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  desc: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  positionInList: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  favorited: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  archived: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  subTaskIds: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    allowNull: true,
  },
  deadline: {
    type: DataTypes.STRING,
    allowNull: true,
  },  
  categoryId: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  assignedTo: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
});

User.hasMany(Task);
Task.belongsTo(User);

List.hasMany(Task);
Task.belongsTo(List);

Task.hasMany(Comment);
Comment.belongsTo(Task);

Task.hasMany(Picture);
Picture.belongsTo(Task);

module.exports = {
  Task
}
