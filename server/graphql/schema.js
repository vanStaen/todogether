import { buildSchema } from "graphql";

import * as userSchemas from "./schemas/userSchema.js";
import * as taskSchemas from "./schemas/taskSchema.js";
import * as categorieSchemas from "./schemas/categorieSchema.js";


export default buildSchema(`

    ${userSchemas.User}    
    ${taskSchemas.Task} 
    ${categorieSchemas.Categorie}
    
    ${userSchemas.UserInputData}
    ${taskSchemas.TaskInputData}
    ${categorieSchemas.CategorieInputData}

    type RootQuery {
        ${userSchemas.UserQueries}
        ${taskSchemas.TaskQueries}
        ${categorieSchemas.CategorieQueries}
    }

    type RootMutations {
        ${userSchemas.UserMutations}
        ${taskSchemas.TaskMutations}
        ${categorieSchemas.CategorieMutations}
    }

    schema {
        query: RootQuery
        mutation: RootMutations
    }

`);
