const userResolver = require("./resolvers/userResolver.js");
const listResolver = require("./resolvers/listResolver.js");
const taskResolver = require("./resolvers/taskResolver.js");
const commentResolver = require("./resolvers/commentResolver.js");
const pictureResolver = require("./resolvers/pictureResolver.js");

module.exports = {
  ...userResolver.userResolver,
  ...listResolver.listResolver,
  ...taskResolver.taskResolver,
  ...commentResolver.commentResolver,
  ...pictureResolver.pictureResolver,
};
