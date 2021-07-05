exports.User = `
type User {
    id: ID! 
    name: String!
    email: String!
    avatar: String
    categories: String
    emailSettings: String!
    displaySettings: String!
    createdAt: String!
    udpatedAt: String!
}`;

exports.UserQueries = `
    user: User
`;
