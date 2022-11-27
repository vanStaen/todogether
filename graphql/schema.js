import { buildSchema } from "graphql";

import { userSchemas } from "./schemas/userSchema.js";
import { taskSchemas } from "./schemas/taskSchema.js";
import { listSchemas } from "./schemas/listSchema.js";
import { commentSchemas } from "./schemas/commentSchema.js";
import { pictureSchemas } from "./schemas/pictureSchema.js";

export default buildSchema(`

    ${userSchemas.User}
    ${taskSchemas.Task}
    ${listSchemas.List}
    ${commentSchemas.Comment}
    ${pictureSchemas.Picture}

    ${userSchemas.UserInputData}
    ${taskSchemas.TaskInputData}
    ${listSchemas.ListInputData}
    ${commentSchemas.CommentInputData}
    ${pictureSchemas.PictureInputData}

    type RootQuery {
        ${userSchemas.UserQueries}
        ${taskSchemas.TaskQueries}
        ${listSchemas.ListQueries}
        ${commentSchemas.CommentQueries}
        ${pictureSchemas.PictureQueries}
    }

    type RootMutations {
        ${userSchemas.UserMutations}
        ${taskSchemas.TaskMutations}
        ${listSchemas.ListMutations}
        ${commentSchemas.CommentMutations}
        ${pictureSchemas.PictureMutations}
    }

    schema {
        query: RootQuery
        mutation: RootMutations
    }

`);