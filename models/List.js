module.exports = (sequelize, DataTypes) => {
  const List = sequelize.define("List", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    shareWith: {
      type: DataTypes.ARRAY(DataTypes.STRING),
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
  return List;
}
