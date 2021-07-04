const { buildSchema } = require("graphql");

const dummySchemas = require("./schemas/dummy");

module.exports = buildSchema(`

    ${dummySchemas.Dummy}

    type RootQuery {
        ${dummySchemas.DummyQueries}
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