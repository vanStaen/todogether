exports.Task = `
type Task {
    _id: ID! 
    listId: Int!
    userId: Int!
    title: String!
    desc: String
    positionInList: Int!
    favorited: Boolean
    archived: Boolean
    subTaskIds: [Int]
    deadline: String
    categoryId: String
    assignedTo: Int    
    createdAt: String!
    udpatedAt: String!
    list: List
    user: User
    comments: [Comment]
    pictures: [Picture]
}`;

exports.TaskInputData = `
input TaskInputData {
    listId: Int
    userId: Int
    title: String
    desc: String
    positionInList: Int
    favorited: Boolean
    archived: Boolean
    subTaskIds: [String]
    deadline: String    
    categoryId: Int
    assignedTo: Int
}`;

exports.TaskQueries = `
    getTask(listId: Int!): [Task]
`;

exports.TaskMutations = `
    addTask(taskInput: TaskInputData!): Task!
    updateTask(_id: ID!, taskInput: TaskInputData!): Task!
    deleteTask(_id: ID!): Boolean!
`;