const { buildSchema } = require("graphql");

const userSchemas = require("./schemas/user");
const taskSchemas = require("./schemas/task");
const listSchemas = require("./schemas/list");
const commentSchemas = require("./schemas/comment");

module.exports = buildSchema(`

    ${userSchemas.User}
    ${taskSchemas.Task}
    ${listSchemas.List}
    ${commentSchemas.Comment}

    type RootQuery {
        ${userSchemas.UserQueries}
        ${taskSchemas.TaskQueries}
        ${listSchemas.ListQueries}
        ${commentSchemas.CommentQueries}
    }

    schema {
        query: RootQuery
    }

`);


/* 
type RootMutations {
    // stuff
}

schema {
    query: RootQuery
    mutation: RootMutations
}
*/