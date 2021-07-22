module.exports = (sequelize, DataTypes) => {
  const List = sequelize.define("list", {
    _id: {
      type: DataTypes.INTEGER,
      field: "_id",
      autoIncrement: !0,
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
    shareWith: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      allowNull: true,
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    listType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  const User = require("./User")(sequelize, DataTypes);
  User.hasMany(List);
  List.belongsTo(User);

  return List;
}
