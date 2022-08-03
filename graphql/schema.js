const { buildSchema } = require("graphql");

const userSchemas = require("./schemas/userSchema");
const taskSchemas = require("./schemas/taskSchema");
const listSchemas = require("./schemas/listSchema");
const commentSchemas = require("./schemas/commentSchema");
const pictureSchemas = require("./schemas/pictureSchema");

module.exports = buildSchema(`

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