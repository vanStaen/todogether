import { Task } from "../../models/Task.js";
import { User } from "../../models/User.js";

export const taskResolver = {
  // getTask(taskId: Int!): Task
  async getTask(args, req) {
    if (!req.isAuth) {
      throw new Error("Unauthorized!");
    }
    return await Task.findOne({
      where: { id: args.taskId },
      order: [["id", "DESC"]],
      include: [User],
    });
  },

  // getTasks(): [Task]
  async getTasks(_, req) {
    if (!req.isAuth) {
      throw new Error("Unauthorized!");
    }
    return await Task.findAll({
      order: [["id", "DESC"]],
      include: [User],
    });
  },

  //addTask(taskInput: TaskInputData!): Task!
  async addTask(args, req) {
    if (!req.isAuth) {
      throw new Error("Unauthorized!");
    }
    try {
      const task = new Task({
        userId: req.userId,
        title: args.taskInput.title,
        desc: args.taskInput.desc,
        categoryIds: args.taskInput.categoryIds,
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

  //updateTask(id: ID!, taskInput: TaskInputData!): Task!
  async updateTask(args, req) {
    if (!req.isAuth) {
      throw new Error("Unauthorized!");
    }
    const updateFields = [];
    const updatableFields = [
      "title",
      "desc",
      "avatar",
      "positionInList",
      "favorited",
      "archived",
      "categoryIds",
      "subTaskIds",
      "deadline",
      "assignedTo",
    ];
    updatableFields.forEach((field) => {
      if (field in args.taskInput) {
        updateFields[field] = args.taskInput[field];
      }
    });
    try {
      const updatedTask = await Task.update(updateFields, {
        where: {
          id: args.id,
        },
        returning: true,
        plain: true,
      });
      // updatedTask[0]: number or row udpated
      // updatedTask[1]: rows updated
      return updatedTask[1];
    } catch (err) {
      console.log(err);
    }
  },

  // archiveTaskInBulk(id: [ID!], archived: Boolean!): Boolean!
  async archiveTaskInBulk(args, req) {
    if (!req.isAuth) {
      throw new Error("Unauthorized!");
    }
    try {
      await Task.update(
        { archived: args.archived },
        {
          where: {
            id: args.id,
          },
          returning: true,
          plain: true,
        }
      );
      return true;
    } catch (err) {
      console.log(err);
    }
  },

  // deleteTask(id: ID!): Boolean!
  async deleteTask(args, req) {
    await Task.destroy({
      where: {
        id: args.id,
      },
    });
    return true;
  },
};
