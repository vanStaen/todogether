const Sequelize = require("sequelize");
const sequelizedb = require("../../lib/sequelizedb")
const Task = require("../../models/Task")(sequelizedb, Sequelize.DataTypes);

exports.taskResolver = {
  
  //task
  async getTask (args, req) {
    if (!req.isAuth) {
      throw new Error("Unauthorized!");
    }
    return tasks = await Task.findAll({
      where: {
        UserId: req.userId,
      },
    });
  },

  //addTask(taskInput: TaskInputData!): Task!
  async addTask (args, req) {
    if (!req.isAuth) {
      throw new Error("Unauthorized!");
    }
    try {
      const task = new Task({
        ListId: args.taskInput.ListId,
        UserId: req.userId,
        title: args.taskInput.title,
        desc: args.taskInput.desc,
        positionInList: 0,
        favorited: false,
        archived: false,
        subTaskIds: [],
        assignedTo: req.userId,
      });
      return await task.save();
    } catch (err) {
      console.log(err);
    }
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
