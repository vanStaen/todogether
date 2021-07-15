const Sequelize = require("sequelize");

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

const Task = require("../../models/Task")(sequelize, Sequelize.DataTypes);

exports.taskResolver = {
  
  //task
  async getTask (args, req) {
    const tasks = await Task.findAll();
    return tasks;
  },

  //addTask(taskInput: TaskInputData!): Task!
  async addTask (args, req) {
    const task = new Task({
      //TODO
    });
    return task.save();
  },

  //updateTask(_id: ID!, taskInput: TaskInputData!): Task!
  //TODO

  // deleteTask(_id: ID!): Boolean!
  async deleteTask (args, req) {
    await Task.destroy({
      where: {
        _id: args._id,
      },
    });
    return true;
  },
};
