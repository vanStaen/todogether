export const User = `
type User {
    id: ID! 
    username: String!
    email: String!
    avatar: String    
    emailSettings: String!
    profilSettings: String!
    lastActive: String!
    createdAt: String!
    updatedAt: String!
    tasks: [Task]
    categories: [Categorie]
    active: Boolean,
}`;

export const UserInputData = `
input UserInputData {
    username: String
    email: String
    password: String
    avatar: String
    categories: [String]
    emailSettings: String
    profilSettings: String
}`;

export const UserQueries = `
    getUser(id: Int): User
    getAllUsers(): [User]
`;

export const UserMutations = `
    addUser(userInput: UserInputData!): User!
    updateUser(userInput: UserInputData!): User!
    deleteUser: Boolean!
`;
