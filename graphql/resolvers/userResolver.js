const bcrypt = require("bcryptjs");
const User = require("../../models/User");

exports.User = {
  user: (args, req) => {
    // const users = await User.find({ id: args.id });
    const users = await User.findAll();
    return users
  },

  // addUser(userInput: UserInputData!): User!
  createUser: (args, req) => {
    return User.findOne({ email: args.userInput.email })
      .then((user) => {
        if (user) {
          throw new Error("This email is already associated with an account.");
        }
        return bcrypt.hash(args.userInput.password, 12);
      })
      .then((hashedPassword) => {
        const user = new User({
          name: args.userInput.name,
          email: args.userInput.email,
          password: hashedPassword,
          emailSettings: "[]",
          displaySettings: "[]",
        });
        return user.save();
      })
      .then((result) => {
        return { ...result, password: null };
      })
      .catch((err) => {
        throw err;
      });
  },

  // updateUser(id: ID!, userInput: UserInputData!): User!
  updateUser: async (args, req) => {
    if (!req.isAuth) {
      throw new Error(errorName.UNAUTHORIZED);
    }
    const updateField = {};
    if (args.userInput.name) {
      updateField.name = args.userInput.name;
    }
    if (args.userInput.email) {
      updateField.email = args.userInput.email;
    }
    if (args.userInput.password) {
      updateField.password = await bcrypt.hash(args.userInput.password, 12);
    }
    if (args.userInput.avatar) {
      updateField.avatar = args.userInput.avatar;
    }
    if (args.userInput.categories) {
      updateField.avatar = args.userInput.categories;
    }
    if (args.userInput.emailSettings) {
      updateField.avatar = args.userInput.emailSettings;
    }
    if (args.userInput.displaySettings) {
      updateField.avatar = args.userInput.avatar;
    }
    const updatedUser = await User.updateOne(
      { _id: args.id },
      { $set: updateField }
    );
    return updatedUser;
  },

  //  deleteUser(id: ID!): Boolean!
  deleteUser: (args, req) => {
    await User.destroy({
      where: {
        id: args.id
      }
    });    
    return true
  },
};
