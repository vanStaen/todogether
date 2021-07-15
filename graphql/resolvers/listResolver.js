const List = require("../../models/List");

exports.List = {

  //list
  list: (args, req)=> {
    const lists = await List.findAll();
    return lists
  },

  //addList(listInput: ListInputData!): List!
  addList: (args, req) => {
    const comment = new List({
      // TODO
    });
    return list.save();
  },

  // updateList(id: ID!, listInput: ListInputData!): List!
  // TODO

  // deleteList(id: ID!): Boolean!
  deleteList: (args, req) => {
    await List.destroy({
      where: {
        id: args.id,
      },
    });
    return true;
  },
};