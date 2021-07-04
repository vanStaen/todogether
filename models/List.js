const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class List extends Model {
    static associate(models){}
  }
  List.init({
    id: {
      type: DataTypes.NUMBER,
      allowNull: false,
      primaryKey: true,
    },
    ownerId: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    shareWith: {
      type: [DataTypes.STRING],
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
  },
  {
    sequelize,
    modelName: 'List'
  });
  return List;
}
