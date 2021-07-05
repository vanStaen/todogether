const { buildSchema } = require("graphql");

const userSchemas = require("./schemas/user");

module.exports = buildSchema(`

    ${userSchemas.User}

    type RootQuery {
        ${userSchemas.UserQueries}
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