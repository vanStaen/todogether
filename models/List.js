const { sequelize, DataTypes } = require('../lib/sequelizedb');
const { User } = require('./User');

const List = sequelize.define("list", {
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

User.hasMany(List);
List.belongsTo(User);

module.exports = {
  List
};
