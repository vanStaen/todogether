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

exports.UserInputData = `
type UserInputData {
    id: ID
    name: String!
    email: String!
    avatar: String
    categories: String
    emailSettings: String
    displaySettings: String
}`;

exports.UserQueries = `
    user(id: Int): User
`;

exports.UserMutations = `
    addUser(UserInput: UserInputData!): User!
    updateUser(UserInput: UserInputData!): User!
    deleteUser(UserId: ID!): User!
`;
