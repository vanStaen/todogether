const bcrypt = require("bcryptjs");
const { User } = require("../../models/User");
const { List } = require("../../models/List");
const { Task } = require("../../models/Task");


exports.userResolver = {
  async getUser(args, req) {
    if (!req.isAuth) {
      throw new Error("Unauthorized!");
    }
    return await User.findOne({ _id: req.userId });
  },

  // addUser(userInput: UserInputData!): User!
  async addUser(args, req) {
    const foundUser = await User.findOne({
      where: {
        email: args.userInput.email,
      },
      include: [List, Task],
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
    if (!req.isAuth) {
      throw new Error("Unauthorized!");
    }
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
            _id: req.userId,
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
