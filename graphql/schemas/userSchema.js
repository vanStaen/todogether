exports.User = `
type User {
    _id: ID! 
    username: String!
    email: String!
    avatar: String
    categories: String
    emailSettings: String!
    displaySettings: String!
    lastActive: String!
    createdAt: String!
    updatedAt: String!
    lists: [List]
    tasks: [Task]
}`;

exports.UserInputData = `
input UserInputData {
    username: String
    email: String
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
    updateUser(userInput: UserInputData!): User!
    deleteUser(_id: ID!): Boolean!
`;
