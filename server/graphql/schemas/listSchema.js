exports.List = `
type List {
    _id: ID! 
    userId: Int!
    title: String!
    desc: String
    shareWith: [Int]
    avatar: String
    listType: String
    createdAt: String!
    udpatedAt: String!
    tasks: [Task]
}`;

exports.ListInputData = `
input ListInputData {
    shareWith: [Int]
    title: String
    desc: String
    avatar: String
    listType: String
}`;

exports.ListQueries = `
    getList: [List]
`;

exports.ListMutations = `
    addList(listInput: ListInputData!): List!
    updateList(_id: ID!, listInput: ListInputData!): List!
    deleteList(_id: ID!): Boolean!
`;
