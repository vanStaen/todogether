const { buildSchema } = require("graphql");

const userSchemas = require("./schemas/userSchema");
const taskSchemas = require("./schemas/taskSchema");
const listSchemas = require("./schemas/listSchema");
const commentSchemas = require("./schemas/commentSchema");

module.exports = buildSchema(`

    ${userSchemas.User}
    ${taskSchemas.Task}
    ${listSchemas.List}
    ${commentSchemas.Comment}

    ${userSchemas.UserInputData}
    ${taskSchemas.TaskInputData}
    ${listSchemas.ListInputData}
    ${commentSchemas.CommentInputData}

    type RootQuery {
        ${userSchemas.UserQueries}
        ${taskSchemas.TaskQueries}
        ${listSchemas.ListQueries}
        ${commentSchemas.CommentQueries}
    }

    type RootMutations {
        ${userSchemas.UserMutations}
        ${taskSchemas.TaskMutations}
        ${listSchemas.ListMutations}
        ${commentSchemas.CommentMutations}
    }

    schema {
        query: RootQuery
        mutation: RootMutations
    }

`);