import bcrypt from "bcryptjs";
import { User } from "../../models/User.js";
import { Categorie } from "../../models/Categorie.js";

export const userResolver = {
  async getUser(_, req) {
    if (!req.isAuth) {
      throw new Error("Unauthorized!");
    }
    return await User.findOne({
      where: { id: req.userId },
      include: {
        model: Categorie,
        where: { archived: false },
      },
      order: [[Categorie, "id", "ASC"]],
    });
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
        username: args.userInput.username,
        email: args.userInput.email,
        password: hashedPassword,
        categories: [],
        emailSettings: "[]",
        profilSettings: "[]",
        lastActive: Date.now()
      });
      return await user.save();
    } catch (err) {
      console.log(err);
    }
  },

  // updateUser(id: ID!, userInput: UserInputData!): User!
  async updateUser(args, req) {
    if (!req.isAuth) {
      throw new Error("Unauthorized!");
    }
    const updateFields = [];
    const updatableFields = [
      "username",
      "avatar",
      "categories",
      "emailSettings",
      "profilSettings",
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
      const updatedUser = await User.update(updateFields, {
        where: {
          id: req.userId,
        },
        returning: true,
        plain: true,
      });
      // updatedUser[0]: number or row udpated
      // updatedUser[1]: rows updated
      return updatedUser[1];
    } catch (err) {
      console.log(err);
    }
  },

  // deleteUser: Boolean!
  async deleteUser(args, req) {
    if (!req.isAuth) {
      throw new Error("Unauthorized!");
    }
    await User.destroy({
      where: {
        id: req.userId,
      },
    });
    req.session = null;
    return true;
  },
};
