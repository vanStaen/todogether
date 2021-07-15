exports.User = `
type User {
    _id: ID! 
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
    getUser(_id: Int): User
`;

exports.UserMutations = `
    addUser(userInput: UserInputData!): User!
    updateUser(_id: ID!, userInput: UserInputData!): User!
    deleteUser(_id: ID!): Boolean!
`;
