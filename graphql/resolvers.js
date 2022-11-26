import userResolver from "./resolvers/userResolver.js";
import listResolver from "./resolvers/listResolver.js";
import taskResolver from "./resolvers/taskResolver.js";
import commentResolver from "./resolvers/commentResolver.js";
import pictureResolver from "./resolvers/pictureResolver.js";

export default {
  ...userResolver.userResolver,
  ...listResolver.listResolver,
  ...taskResolver.taskResolver,
  ...commentResolver.commentResolver,
  ...pictureResolver.pictureResolver,
};
