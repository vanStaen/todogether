const userResolver = require("./resolvers/userResolver");
const listResolver = require("./resolvers/listResolver");
const taskResolver = require("./resolvers/taskResolver");
const commentResolver = require("./resolvers/commentResolver");

module.exports = {
  ...userResolver.userResolver,
  ...listResolver.listResolver,
  ...taskResolver.taskResolver,
  ...commentResolver.commentResolver,
};
