import * as userResolver from "./resolvers/userResolver.js";
import * as taskResolver from "./resolvers/taskResolver.js";

export default {
  ...userResolver.userResolver,
  ...taskResolver.taskResolver,
};
