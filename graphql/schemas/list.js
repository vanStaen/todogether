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

exports.ListQueries = `
    list: List
`;