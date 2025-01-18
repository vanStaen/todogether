import * as userResolver from "./resolvers/userResolver.js";
import * as taskResolver from "./resolvers/taskResolver.js";
import * as categorieResolver from "./resolvers/categorieResolver.js";

export default {
  ...userResolver.userResolver,
  ...taskResolver.taskResolver,
  ...categorieResolver.categorieResolver,
};
