const jsonwebtoken = require("jsonwebtoken");
const { User } = require("../models/User");
require("dotenv/config");

const devMode = true;

module.exports = async (req, res, next) => {
  // if in development mode
  if (devMode) {
    if (req.get("host") === "localhost:5012") {
      console.log(">>>> Developement Mode <<<<<");
      req.isAuth = true;
      req.userId = "6";
      req.email = "clement.vanstaen@gmail.com";
      return next();
    }
  }

  // Authorization: Bearer <token>
  const token = req.session.token;
  const refreshToken = req.session.refreshToken;

  //console.log("token", token)
  //console.log("refreshToken", refreshToken)

  // Check tokens are valid:
  if (!token || token === "undefined" || token === "") {
    req.isAuth = false;
    return next();
  }
  let decodedToken;
  try {
    decodedToken = jsonwebtoken.verify(token, process.env.AUTH_SECRET_KEY);
  } catch (err) {
    try {
      // if refreshToken exist = user checked remind me
      decodedToken = jsonwebtoken.verify(
        refreshToken,
        process.env.AUTH_SECRET_KEY_REFRESH
      );
    } catch (err) {
      req.isAuth = false;
      return next();
    }
  }

  // Set Auth variable
  req.isAuth = true;
  req.userId = decodedToken.userId;

  // Update token in session cookie
  const accessToken = await jsonwebtoken.sign(
    { userId: decodedToken.userId },
    process.env.AUTH_SECRET_KEY,
    { expiresIn: "15m" }
  );
  //console.log("accessToken updated!");
  req.session.token = accessToken;

  // Update refrehstoken in session cookie
  if (refreshToken) {
    const refreshToken = await jsonwebtoken.sign(
      { userId: decodedToken.userId },
      process.env.AUTH_SECRET_KEY_REFRESH,
      { expiresIn: "7d" }
    );
    //console.log("refreshToken updated!");
    req.session.refreshToken = refreshToken;
  }

  // Update lastLogin in user table
  await User.update(
    { lastActive: Date.now() },
    { where: { _id: decodedToken.userId } }
  );

  next();
};
