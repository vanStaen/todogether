import { Task } from "../../models/Task.js";
import { Categorie } from "../../models/Categorie.js";
import { getTitleFromUrl } from "../../lib/getTitleFromUrl.js";

export const taskResolver = {
  // getTask(taskId: Int!): Task
  async getTask(args, req) {
    if (!req.isAuth) {
      throw new Error("Unauthorized!");
    }
    return await Task.findOne({
      where: { id: args.taskId },
      order: [["id", "DESC"]],
    });
  },

  // getTasks(): [Task]
  async getTasks(_, req) {
    if (!req.isAuth) {
      throw new Error("Unauthorized!");
    }
    return await Task.findAll({
      where: { userId: req.userId },
      include: [Categorie],
      order: [["id", "DESC"]],
      //order: [["archived", "ASC"], ["id", "DESC"]],
    });
  },

  //addTask(taskInput: TaskInputData!): Task!
  async addTask(args, req) {
    if (!req.isAuth) {
      throw new Error("Unauthorized!");
    }
    try {
      let title = args.taskInput.title;
      let desc = null;
      if (args.taskInput.title.includes('http')) {
        title = await getTitleFromUrl(args.taskInput.title);
        desc = args.taskInput.title;
      }
      const task = new Task({
        userId: req.userId,
        title: title,
        desc: desc,
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

  // archiveTask(id: ID!, archived: Boolean!): Boolean!
  async archiveTask(args, req) {
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
