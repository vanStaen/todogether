const { sequelize, DataTypes } = require('../lib/sequelizedb');
const { User } = require('./User');

const Picture = sequelize.define("picture", {
  _id: {
    type: DataTypes.INTEGER,
    field: "_id",
    autoIncrement: true,
    primaryKey: true
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
 thumbUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

User.hasMany(Picture);
Picture.belongsTo(User);

module.exports = {
  Picture
};
