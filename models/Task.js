module.exports = (sequelize, DataTypes) => {
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
      type: DataTypes.ARRAY(DataTypes.STRING),
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
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  const User = require("./User")(sequelize, DataTypes);
  User.hasMany(Task);
  Task.belongsTo(User);

  const List = require("./List")(sequelize, DataTypes);
  List.hasMany(Task);
  Task.belongsTo(List);

  return Task;
}