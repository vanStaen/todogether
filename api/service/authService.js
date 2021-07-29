const { User } = require("../../models/User");
const cookieSession = require('cookie-session')
const bcrypt = require("bcryptjs");

exports.authService = {
  async login(email, username, password) {
    const findUser = User.findOne({
      where: {
        [Op.or]: [{ email: email }, { username: username }],
      },
    });
    if (!findUser) {
      throw new Error("User does not exist!");
    } else {
      const user = result.rows[0];
      const isValid = await bcrypt.compare(password, user.pwd);
      if (!isValid) {
        throw new Error("Password is incorrect!");
      }
      const accessToken = await jsonwebtoken.sign(
        { userId: findUser._id },
        process.env.AUTH_SECRET_KEY,
        { expiresIn: "15m" }
      );
      const refreshToken = await jsonwebtoken.sign(
        { userId: findUser._id },
        process.env.AUTH_SECRET_KEY_REFRESH,
        { expiresIn: "7d" }
      );
      // Update lastLogin in user table
      await User.update(
        { lastActive: Date.now() },
        { where: { _id: findUser._id } }
      );     
      // Return data to Controller
      return [accessToken, refreshToken, userId];
    }
  },

  async logOut(userId) {
    // TODO: delete token and refreshtoken cookie 
    // Return data to Controller
    return true;
  },

  async token(userId) {
      req.userId;
      // Generate new Token
      const accessToken = await jsonwebtoken.sign(
        { userId: userId },
        process.env.AUTH_SECRET_KEY,
        { expiresIn: "15m" }
      );
      // Update lastLogin in user table
      await User.update({ lastLogin: Date.now() }, { where: { _id: userId } });
      // Return data to Controller
      return [accessToken, userID];
  },
};
