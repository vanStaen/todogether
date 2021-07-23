exports.User = `
type User {
    _id: ID! 
    name: String!
    email: String!
    avatar: String
    categories: String
    emailSettings: String!
    displaySettings: String!
    createdAt: String!
    updatedAt: String!
    lists: [List]
    tasks: [Task]
}`;

exports.UserInputData = `
input UserInputData {
    name: String
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
