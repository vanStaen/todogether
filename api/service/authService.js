const { User } = require("../../models/User");
const { Token } = require("../../models/Token");
const bcrypt = require("bcryptjs");

exports.commentResolver = {
  async login(email, username, password) {

    const result = await client.query(`SELECT id, pwd FROM users ${filter}`);

    if (result.rows < 1) {
      return res.status(400).json({ error: `User does not exist!` });
    } else {
      const user = result.rows[0];
      const isValid = await bcrypt.compare(password, user.pwd);

      if (!isValid) {
        return res.status(400).json({ error: `Password is incorrect!` });
      }

      const accessToken = await jsonwebtoken.sign(
        { userId: user.id },
        process.env.AUTH_SECRET_KEY,
        { expiresIn: "15m" }
      );

      const refreshToken = await jsonwebtoken.sign(
        { userId: user.id },
        process.env.AUTH_SECRET_KEY_REFRESH,
        { expiresIn: "7d" }
      );

      //Update last_login in user table
      const updateLastLoginQuery = `UPDATE users SET lastLogin=${Date.now()} WHERE id=${
        user.id
      }`;
      await client.query(updateLastLoginQuery);

      //Add refresh token to db
      const addRefreshTokenQuery = `INSERT INTO token(refreshToken, userId) VALUES ('${refreshToken}', ${user.id});`;
      await client.query(addRefreshTokenQuery);

      return [accessToken, refreshToken, userId];
    }
  },
};
