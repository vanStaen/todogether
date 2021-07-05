const userResolver = require("./resolvers/user");
const listResolver = require("./resolvers/list");
const taskResolver = require("./resolvers/task");
const commentResolver = require("./resolvers/comment");

module.exports = {
  ...userResolver.User,
  ...listResolver.List,
  ...taskResolver.Task,
  ...commentResolver.Comment,
};
