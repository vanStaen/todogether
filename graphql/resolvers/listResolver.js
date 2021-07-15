const Sequelize = require("sequelize");

const sequelize = new Sequelize({
  database: process.env.DATABASE_NAME,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PWD,
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

const List = require("../../models/List")(sequelize, Sequelize.DataTypes);

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