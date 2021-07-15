module.exports = (sequelize, DataTypes) => {
  const List = sequelize.define("List", {
    _id: {
      type: DataTypes.INTEGER,
      field: "_id",
      autoIncrement: !0,
      primaryKey: true,
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

  List.associate = (models) => {
    List.belongsTo(models.User, {
      foreignKey: {
        name: 'userId',
        field: 'userId'
      }
    })
  }

  return List;
}
