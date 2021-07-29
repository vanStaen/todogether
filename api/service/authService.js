const { User } = require("../../models/User");
const { Token } = require("../../models/Token");
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
        { lastLogin: Date.now() },
        { where: { _id: findUser._id } }
      );
      await client.query(updateLastLoginQuery);
      // Add refresh token to db
      await Token.create({
        refreshToken: refreshToken,
        userId: findUser._id,
      });
      // Return data to Controller
      return [accessToken, refreshToken, userId];
    }
  },

  async logOut(userId) {
    await User.destroy({ where: { _id: userId } });
    // Return data to Controller
    return true;
  },

  async token(refreshToken) {
    const findRefreshToken = Token.findOne({
      where: { refreshToken: refreshToken },
    });
    if (!findRefreshToken) {
      throw new Error("Refresh token could not be found!");
    } else {
      const userId = accessToken.userId;
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
    }
  },
};
