const { Sequelize, DataTypes } = require('sequelize');
require("dotenv/config");

const sequelize = new Sequelize({
    database: process.env.DATABASE_NAME,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PWD,
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  });

const User = sequelize.define('User', {
  // Model attributes are defined here
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING
  }
}, {
  // Other model options go here
});

// `sequelize.define` also returns the model
console.log(User === sequelize.models.User);