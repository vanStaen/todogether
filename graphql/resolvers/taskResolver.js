const { Task } = require("../../models/Task");
const { User } = require("../../models/User");
const { List } = require("../../models/List");
const { Comment } = require("../../models/Comment");

exports.taskResolver = {

  //task
  async getTask (args, req) {
    if (!req.isAuth) {
      throw new Error("Unauthorized!");
    }
    return tasks = await Task.findAll({
      where: {
        userId: req.userId,
        listId: args.listId,
      },
      include: [List, User, Comment],
    });
  },

  //addTask(taskInput: TaskInputData!): Task!
  async addTask (args, req) {
    if (!req.isAuth) {
      throw new Error("Unauthorized!");
    }
    try {
      const task = new Task({
        listId: args.taskInput.listId,
        userId: req.userId,
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
  async updateTask(args, req) {
    if (!req.isAuth) {
      throw new Error("Unauthorized!");
    }
    const updateFields = [];
    const updatableFields = [
      "listId",
      "title",
      "desc",
      "avatar",
      "positionInList",
      "favorited",
      "archived",
      "subTaskIds",
      "deadline",
      "categoryId",
      "assignedTo",
    ];
    updatableFields.forEach((field) => {
      if (field in args.taskInput) {
        updateFields[field] = args.taskInput[field];
      }
    });
    try {
      const updatedTask = await Task.update(
        updateFields,
        {
          where: {
            _id: args._id,
          },
          returning: true,
          plain: true,
        }
      );
      // updatedTask[0]: number or row udpated
      // updatedTask[1]: rows updated
      return updatedTask[1];
    } catch (err) {
      console.log(err);
    }
  },

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
