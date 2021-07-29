const { sequelize, DataTypes } = require('../lib/sequelizedb');
const { User } = require('./User');

const Token = sequelize.define("token", {
  _id: {
    type: DataTypes.INTEGER,
    field: "_id",
    autoIncrement: true,
    primaryKey: true
  },
  refreshToken: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

User.hasMany(Token);
Token.belongsTo(User);

module.exports = {
  Token
};
