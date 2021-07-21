const bcrypt = require("bcryptjs");
const Sequelize = require("sequelize");
const sequelizedb = require("../../lib/sequelizedb");
const User = require("../../models/User")(sequelizedb, Sequelize.DataTypes);

exports.userResolver = {
  async getUser(args, req) {
    // const user = await User.find({ _id: args._id });
    const users = await User.findAll();
    return users[0];
  },

  // addUser(userInput: UserInputData!): User!
  async addUser(args, req) {
    const foundUser = await User.findOne({
      where: {
        email: args.userInput.email,
      },
    });
    if (foundUser) {
      throw new Error("This email is already associated with an account.");
    }
    try {
      hashedPassword = await bcrypt.hash(args.userInput.password, 12);
      const user = new User({
        name: args.userInput.name,
        email: args.userInput.email,
        password: hashedPassword,
        emailSettings: "[]",
        displaySettings: "[]",
        categories: "[]",
      });
      return await user.save();
    } catch (err) {
      console.log(err);
    }
  },

  // updateUser(_id: ID!, userInput: UserInputData!): User!
  async updateUser(args, req) {
    //if (!req.isAuth) {
    //  throw new Error("Unauthorized!);
    //}
    const updateFields = [];
    const updatableFields = [
      "password",
      "name",
      "avatar",
      "categories",
      "emailSettings",
      "displaySettings",
    ];
    updatableFields.forEach((field) => {
      if (field in args.userInput) {
        updateFields[field] = args.userInput[field];
      }
    });
    if (args.userInput.password) {
      updateFields.password = await bcrypt.hash(args.userInput.password, 12);
    }
    try {
      const updatedUser = await User.update(
        updateFields,
        {
          where: {
            _id: args._id,
          },
          returning: true,
          plain: true,
        }
      );
      // updatedUser[0]: number or row udpated
      // updatedUser[1]: rows updated
      return updatedUser[1];
    } catch (err) {
      console.log(err);
    }
  },

  // deleteUser(_id: ID!): Boolean!
  async deleteUser(args, req) {
    await User.destroy({
      where: {
        _id: args._id,
      },
    });
    return true;
  },
};
