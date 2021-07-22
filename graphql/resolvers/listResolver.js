const Sequelize = require("sequelize");
const sequelizedb = require("../../lib/sequelizedb")
const List = require("../../models/List")(sequelizedb, Sequelize.DataTypes);

exports.listResolver = {

  //list
  async getList (args, req) {
    if (!req.isAuth) {
      throw new Error("Unauthorized!");
    }
    return lists = await List.findAll({
      where: {
        UserId: req.userId,
      },
    });
  },

  //addList(listInput: ListInputData!): List!
  async addList (args, req) {
    if (!req.isAuth) {
      throw new Error("Unauthorized!");
    }
    const foundList = await List.findOne({
      where: {
        title: args.listInput.title,
        UserId: req.userId,
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
        UserId: req.userId,
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
    console.log("_id", args._id)
    try {
      const updatedList = await List.update(
        updateFields,
        {
          where: {
            _id: args._id,
          },
          returning: true,
          plain: true,
        }
      );
      // updatedList[0]: number or row udpated
      // updatedList[1]: rows updated
      return updatedList[1];
    } catch (err) {
      console.log(err);
    }
  },

  // deleteList(id: ID!): Boolean!
  async deleteList (args, req) {
    if (!req.isAuth) {
      throw new Error("Unauthorized!");
    }
    await List.destroy({
      where: {
        _id: args._id,
        UserId: req.userId,
      },
    });
    return true;
  },
};