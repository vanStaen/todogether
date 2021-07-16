const bcrypt = require("bcryptjs");
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

const User = require("../../models/User")(sequelize, Sequelize.DataTypes);

exports.userResolver = {
  async getUser(args, req) {
    // const users = await User.find({ _id: args._id });
    const users = await User.findAll();
    console.log(users[0]);
    return users[0];
  },

  // addUser(userInput: UserInputData!): User!
  async addUser(args, req) {
    console.log("args.userInput.email", args.userInput.email);
    const foundUser = await User.findOne({
      where: {
        email: args.userInput.email,
      },
    });
    console.log("foundUser", foundUser);
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
      });
      return await user.save();
    } catch (err) {
      console.log(err);
    }
  },

  // updateUser(_id: ID!, userInput: UserInputData!): User!
  async updateUser(args, req) {
    //if (!req.isAuth) {
    //  throw new Error(errorName.UNAUTHORIZED);
    //}
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
      updateField.password = await bcrypt.hash(args.userInput.password, 12);
    }
    try {
      const updatedUser = await User.updateOne(
        { _id: args._id },
        { $set: updateField }
      );
      return updatedUser;
    } catch (err) {
      console.log(err);
    }
  },

  // deleteUser(_id: ID!): Boolean!
  async deleteUser(rgs, req) {
    await User.destroy({
      where: {
        _id: args._id,
      },
    });
    return true;
  },
};
