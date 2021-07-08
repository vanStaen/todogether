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
    id: ID
    shareWith: [Int]
    avatar: String
    listType: String
}`;

exports.ListQueries = `
    list: List
`;

exports.ListMutations = `
    addList(ListInput: ListInputData!): List!
    updateList(ListInput: ListInputData!): List!
    deleteList(ListId: ID!): List!
`;
