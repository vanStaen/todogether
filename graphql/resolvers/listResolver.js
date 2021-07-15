const List = require("../../models/List");

exports.ListResolver = {

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

  // updateList(id: ID!, listInput: ListInputData!): List!
  // TODO

  // deleteList(id: ID!): Boolean!
  async deleteList (args, req) {
    await List.destroy({
      where: {
        id: args.id,
      },
    });
    return true;
  },
};