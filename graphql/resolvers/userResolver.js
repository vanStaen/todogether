const bcrypt = require("bcryptjs");
const User = require("../../models/User");

exports.UserResolver = {
  async getUser(args, req) {
    // const users = await User.find({ id: args.id });
    const users = await User.findAll();
    return users;
  },

  // addUser(userInput: UserInputData!): User!
  async createUser(args, req) {
    console.log("createdUser started");
    
    const foundUser = await User.findOne({ email: args.userInput.email });
    if (foundUser) {
      throw new Error("This email is already associated with an account.");
    } 
    hashedPassword = await bcrypt.hash(args.userInput.password, 12);
    const user = new User({
      name: args.userInput.name,
      email: args.userInput.email,
      password: hashedPassword,
      emailSettings: "[]",
      displaySettings: "[]",
    });
    const result = user.save();
    console.log("result", result);
    return { ...result, password: null };
  },

  // updateUser(id: ID!, userInput: UserInputData!): User!
  async updateUser(args, req) {
    //if (!req.isAuth) {
    //  throw new Error(errorName.UNAUTHORIZED);
    //}
    const updatableFields = ['password', 'name', 'avatar', 'categories', 'emailSettings', 'displaySettings'];
    updatableFields.forEach(field => {
      if (field in args.userInput) {
        updateFields[field] = args.userInput[field];
      }
    })
    const updateField = {};
    if (args.userInput.password) {
      updateField.password = await bcrypt.hash(args.userInput.password, 12);
    }
    const updatedUser = await User.updateOne(
      { _id: args.id },
      { $set: updateField }
    );
    return updatedUser;
  },

  // deleteUser(id: ID!): Boolean!
  async deleteUser(rgs, req) {
    await User.destroy({
      where: {
        id: args.id,
      },
    });
    return true;
  },
};
