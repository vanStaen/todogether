module.exports = (sequelize, DataTypes) => {
  const List = sequelize.define("List", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
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
