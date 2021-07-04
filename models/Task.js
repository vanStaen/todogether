const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    static associate(models){}
  };
  Task.init({
    id: {
      type: DataTypes.NUMBER,
      allowNull: false,
      primaryKey: true,
    },
    listId: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    ownerId: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    positionInList: {
      type: DataTypes.NUMBER,
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
      type: [DataTypes.STRING],
      allowNull: true,
    },
    recurring: {
      type: DataTypes.NUMBER,
      allowNull: true,
    },
    deadline: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    categoryId: {
      type: DataTypes.NUMBER,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Task'
  });
  return Task;
}