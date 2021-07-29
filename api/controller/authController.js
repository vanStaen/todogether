const express = require("express");
const router = express.Router();
const jsonwebtoken = require("jsonwebtoken");
const authService = require("../service/authService");

//[POST] /login : Check if login data sent are correct
router.post("/login", async (req, res) => {
  try {
    if (!req.body.email && !req.body.username) {
      throw new Error("Please provide at least an 'Email' or a 'Username'");
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

//[DEL] /logout : delete on Logout
router.delete("/logout", async (req, res) => {
  try {
    if (!req.body.userId) {
      throw new Error("Please provide at least an 'Email' or a 'Username'");
    }
    const logout = await authService.logout(req.body.userId);
    if (logout) {
      // Html resp code 204 return no content
      res.status(204).json();
    } else {
      throw new Error("Error during Logout!");
    }
  } catch (err) {
    res.status(400).json({
      error: `${err})`,
    });
  }4
});

//[POST] /token : Get Token from refresh Token
router.post("/token", async (req, res) => {
  try {
    if (!req.body.refreshToken) {
      throw new Error("You did not provide a refresh token!");
    }
    try {
      decodedToken = jsonwebtoken.verify(
        req.body.refreshToken,
        process.env.AUTH_SECRET_KEY_REFRESH
      );
    } catch (err) {
      throw new Error("The refresh token you provided is not valid!");
    }
    const token = await authService.token(req.body.refreshToken);
    const [accessToken, userId] = token;
    res.status(200).json({
      userId: userId,
      token: accessToken,
    });    
  } catch (err) {
    res.status(400).json({
      error: `${err})`,
    });
  }
});

module.exports = router;