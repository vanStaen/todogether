const Sequelize = require("sequelize");
const sequelizedb = require("../../lib/sequelizedb")
const List = require("../../models/List")(sequelizedb, Sequelize.DataTypes);

exports.listResolver = {

  //list
  async getList (args, req) {
    const lists = await List.findAll();
    return lists
  },

  //addList(listInput: ListInputData!): List!
  async addList (args, req) {
    const comment = new List({
      // TODO
    });
    return list.save();
  },

  // updateList(_id: ID!, listInput: ListInputData!): List!
  // TODO

  // deleteList(id: ID!): Boolean!
  async deleteList (args, req) {
    await List.destroy({
      where: {
        _id: args._id,
      },
    });
    return true;
  },
};