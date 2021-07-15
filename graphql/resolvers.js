const userResolver = require("./resolvers/userResolver");
const listResolver = require("./resolvers/listResolver");
const taskResolver = require("./resolvers/taskResolver");
const commentResolver = require("./resolvers/commentResolver");

module.exports = {
  ...userResolver.UserResolver,
  ...listResolver.ListResolver,
  ...taskResolver.TaskResolver,
  ...commentResolver.CommentResolver,
};
