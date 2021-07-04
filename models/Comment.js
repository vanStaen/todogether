module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define("Comment", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
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
    })
  }

  return Comment;
}
