import { buildSchema } from "graphql";

import * as userSchemas from "./schemas/userSchema.js";
import * as taskSchemas from "./schemas/taskSchema.js";

export default buildSchema(`

    ${userSchemas.User}    
    ${taskSchemas.Task}
    
    ${userSchemas.UserInputData}
    ${taskSchemas.TaskInputData}

    type RootQuery {
        ${userSchemas.UserQueries}
        ${taskSchemas.TaskQueries}
    }

    type RootMutations {
        ${userSchemas.UserMutations}
        ${taskSchemas.TaskMutations}
    }

    schema {
        query: RootQuery
        mutation: RootMutations
    }

`);
