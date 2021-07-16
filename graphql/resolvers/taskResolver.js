const Sequelize = require("sequelize");
const sequelizedb = require("../../lib/sequelizedb")
const Task = require("../../models/Task")(sequelizedb, Sequelize.DataTypes);

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
