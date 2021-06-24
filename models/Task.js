const { Sequelize, DataTypes } = require("sequelize");
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

const Task = sequelize.define(
  "Task",
  {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    listId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ownerId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    positionInList: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    favorited: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    archived: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    comments: {
      type: [DataTypes.STRING],
      allowNull: true,
    },
    subTaskIds: {
      type: [DataTypes.STRING],
      allowNull: true,
    },
    recurring: {
      type: DataTypes.NUMBER,
      allowNull: true,
    },
    deadline: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    categoryId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    // Other model options go here
  }
);

// `sequelize.define` also returns the model
console.log(Task === sequelize.models.Task);
