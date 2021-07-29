const router = require("express").Router();
const jsonwebtoken = require("jsonwebtoken");
const authService = require("../service/authService");

// Login
router.post("/login", async (req, res) => {
  try {
    if (!req.body.email && !req.body.username) {
      throw new Error("Please provide at least an 'Email' or a 'Username'");
    }
    if (!req.body.remind) {
      throw new Error("The 'remind me'-flag shoud not be missing!");
    }
    const authData = await authService.login(req.body.username, req.body.email, req.body.password, req.body.remind);
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

// Logout
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

module.exports = router;