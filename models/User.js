module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("user", {
    _id: {
      type: DataTypes.INTEGER,
      field: "_id",
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    categories: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    emailSettings: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    displaySettings: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return User;
}