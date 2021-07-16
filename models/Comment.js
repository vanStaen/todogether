module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define("Comment", {
    _id: {
      type: DataTypes.INTEGER,
      field: "_id",
      autoIncrement: !0,
      primaryKey: !0
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  Comment.associate = (models) => {
    Comment.belongsTo(models.User, {
      foreignKey: {
        name: 'userId',
        field: 'userId'
      }
    });
    Comment.belongsTo(models.Task, {
      foreignKey: {
        name: 'taskId',
        field: 'taskId'
      }
    });
  }

  return Comment;
}
