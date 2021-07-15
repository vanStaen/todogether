module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define("Task", {
    _id: {
      type: DataTypes.INTEGER,
      field: "_id",
      autoIncrement: !0,
      primaryKey: true,
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
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
    recurring: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    deadline: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    assignedTo: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  });

  Task.associate = (models) => {
    Task.belongsTo(models.List, {
      foreignKey: {
        name: 'listId',
        field: 'listId'
      }
    });
    Task.belongsTo(models.User, {
      foreignKey: {
        name: 'userId',
        field: 'userId'
      }
    });
  }

  return Task;
}