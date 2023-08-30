const { List } = require("../../models/List");
const { User } = require("../../models/User");
const { Task } = require("../../models/Task");
const { Comment } = require("../../models/Comment");
const { Picture } = require("../../models/Picture");

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

exports.listResolver = {
  //list
  async getList(args, req) {
    if (!req.isAuth) {
      throw new Error("Unauthorized!");
    }    
    return await List.findAll({
      where: {
        [Op.or]: [{ userId: req.userId }, { shareWith: { [Op.contains]: [req.userId] } }],
      },
      order: [["_id", "ASC"]],
      include: [
        //{ model: User, include: { model: List, include: Task } }, //This reduce loading time from 12s to >1sec
        { model: Task, include: Comment, Picture },
      ],
    });
  },

  //addList(listInput: ListInputData!): List!
  async addList(args, req) {
    if (!req.isAuth) {
      throw new Error("Unauthorized!");
    }
    const foundList = await List.findOne({
      where: {
        title: args.listInput.title,
        userId: req.userId,
      },
    });
    console.log("foundList", foundList);
    if (foundList) {
      throw new Error("A list with this title already exist.");
    }
    try {
      const list = new List({
        title: args.listInput.title,
        desc: args.listInput.desc,
        listType: "todolist",
        sharedWith: [],
        userId: req.userId,
      });
      return await list.save();
    } catch (err) {
      console.log(err);
    }
  },

  // updateList(listInput: ListInputData!): List!
  async updateList(args, req) {
    if (!req.isAuth) {
      throw new Error("Unauthorized!");
    }
    const updateFields = [];
    const updatableFields = [
      "shareWith",
      "title",
      "avatar",
      "desc",
      "listType",
    ];
    updatableFields.forEach((field) => {
      if (field in args.listInput) {
        updateFields[field] = args.listInput[field];
      }
    });
    try {
      const updatedList = await List.update(updateFields, {
        where: {
          _id: args._id,
        },
        returning: true,
        plain: true,
      });
      // updatedList[0]: number or row udpated
      // updatedList[1]: rows updated
      return updatedList[1];
    } catch (err) {
      console.log(err);
    }
  },

  // deleteList(id: ID!): Boolean!
  async deleteList(args, req) {
    if (!req.isAuth) {
      throw new Error("Unauthorized!");
    }
    await List.destroy({
      where: {
        _id: args._id,
        userId: req.userId,
      },
    });
    return true;
  },
};
