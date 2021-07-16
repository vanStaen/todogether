exports.Task = `
type Task {
    _id: ID! 
    listId: Int!
    userId: Int!
    positionInList: Int!
    favorited: Boolean
    archived: Boolean
    subTaskIds: [Int]
    recurring: Int
    deadline: String
    categoryId: Int
    assignedTo: Int
    createdAt: String!
    udpatedAt: String!
}`;

exports.TaskInputData = `
input TaskInputData {
    listId: Int
    positionInList: Int
    favorited: Boolean
    archived: Boolean
    subTaskIds: [Int]
    recurring: Int
    deadline: String
    categoryId: Int
    assignedTo: Int
}`;

exports.TaskQueries = `
    getTask: [Task]
`;

exports.TaskMutations = `
    addTask(taskInput: TaskInputData!): Task!
    updateTask(_id: ID!, taskInput: TaskInputData!): Task!
    deleteTask(_id: ID!): Boolean!
`;