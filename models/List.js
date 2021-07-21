module.exports = (sequelize, DataTypes) => {
  const List = sequelize.define("List", {
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
  User.hasOne(List, {foreignKey: 'userId'});
  List.belongsTo(User);

  return List;
}
