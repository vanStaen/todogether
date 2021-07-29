const cookieSession = require("cookie-session");

module.exports = cookieSession({
  name: "session",
  keys: ["key1"],
});
