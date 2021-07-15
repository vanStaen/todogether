exports.User = `
type User {
    id: ID! 
    name: String!
    email: String!
    password: String!
    avatar: String
    categories: String
    emailSettings: String!
    displaySettings: String!
    createdAt: String!
    udpatedAt: String!
}`;

exports.UserInputData = `
input UserInputData {
    name: String!
    email: String!
    password: String
    avatar: String
    categories: String
    emailSettings: String
    displaySettings: String
}`;

exports.UserQueries = `
    user(id: Int): User
`;

exports.UserMutations = `
    addUser(userInput: UserInputData!): User!
    updateUser(id: ID!, userInput: UserInputData!): User!
    deleteUser(id: ID!): Boolean!
`;
