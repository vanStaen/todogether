exports.List = `
type List {
    id: ID! 
    userId: Int!
    shareWith: [Int]
    avatar: String
    listType: String
    createdAt: String!
    udpatedAt: String!
}`;

exports.ListInputData = `
type ListInputData {
    shareWith: [Int]
    avatar: String
    listType: String
}`;

exports.ListQueries = `
    list: List
`;

exports.ListMutations = `
    addList(listInput: ListInputData!): List!
    updateList(id: ID!, listInput: ListInputData!): List!
    deleteList(id: ID!): Boolean!
`;
