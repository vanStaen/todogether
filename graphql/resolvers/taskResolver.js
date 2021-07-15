const TAsk = require("../../models/Task");

exports.Task = {
  //task
  task: (args, req) => {
    const tasks = await Task.findAll();
    return tasks;
  },

  //addTask(taskInput: TaskInputData!): Task!
  addTask: (args, req) => {
    const task = new Task({
      //TODO
    });
    return task.save();
  },

  //updateTask(id: ID!, taskInput: TaskInputData!): Task!
  //TODO

  // deleteTask(id: ID!): Boolean!
  deleteTask: (args, req) => {
    await Task.destroy({
      where: {
        id: args.id,
      },
    });
    return true;
  },
};
