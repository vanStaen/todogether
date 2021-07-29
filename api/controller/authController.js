const express = require("express");
const router = express.Router();
const jsonwebtoken = require("jsonwebtoken");
const authService = require("../service/authService");

// Check if login data sent are correct
router.post("/login", async (req, res) => {
  try {
    if (!req.body.email && !req.body.username) {
      res.status(401).json({
        error: "Please provide at least an 'Email' or a 'Username'",
      });
    }
    const authData = await authService.login(req.body.username, req.body.email, req.body.password);
    const [accessToken, refreshToken, userId] = authData;
    res.status(200).json({
      userId: userId,
      token: accessToken,
      refreshToken: refreshToken,
    });
  } catch (err) {
    res.status(400).json({
      error: `${err})`,
    });
  }
});

// delete on Logout
router.delete("/logout", async (req, res) => {
  try {
    const deleteTokensQuery = `DELETE FROM token WHERE user_id=${req.userId}`;
    await client.query(deleteTokensQuery);
    // Html resp code 204 return no content
    res.status(204).json();
  } catch (err) {
    res.status(400).json({
      error: `${err})`,
    });
  }
});

// POST Get Token from refresh Token
router.post("/token", async (req, res) => {
  try {
    const refreshToken = req.body.refreshToken;
    const isRefreshTokenInDBQuery = `SELECT user_id FROM token WHERE refresh_token='${refreshToken}'`;
    const isRefreshTokenInDBres = await client.query(isRefreshTokenInDBQuery);
    if (isRefreshTokenInDBres.rows.length == 1) {
      const userId = isRefreshTokenInDBres.rows[0].user_id;
      // Check if RefreshToken Is valid
      try {
        decodedToken = jsonwebtoken.verify(
          refreshToken,
          process.env.AUTH_SECRET_KEY_REFRESH
        );
      } catch (err) {
        res.status(401).json({
          error: `Refresh Token not valid!`,
        });
        return next();
      }

      //Update last_login in user table
      const updateLastLoginQuery = `UPDATE users SET last_login=${Date.now()} WHERE id=${userId}`;
      await client.query(updateLastLoginQuery);

      // Generate new token and return it
      const accessToken = await jsonwebtoken.sign(
        { userId: userId },
        process.env.AUTH_SECRET_KEY,
        { expiresIn: "15m" }
      );
      res.status(200).json({
        userId: userId,
        token: accessToken,
      });
    } else {
      res.status(401).json({
        error: `Refresh Token not valid!`,
      });
    }
  } catch (err) {
    res.status(400).json({
      error: `${err})`,
    });
  }
});

module.exports = router;
