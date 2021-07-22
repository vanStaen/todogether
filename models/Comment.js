module.exports = (sequelize, DataTypes) => {
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

  const User = require("./User")(sequelize, DataTypes);
  User.hasMany(Comment);
  Comment.belongsTo(User);

  return Comment;
}
