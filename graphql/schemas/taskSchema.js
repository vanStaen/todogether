exports.Task = `
type Task {
    _id: ID! 
    listId: String!
    userId: String!
    title: String!
    desc: String
    positionInList: Int!
    favorited: Boolean
    archived: Boolean
    subTaskIds: [String]
    deadline: String
    categoryId: String
    assignedTo: String
    createdAt: String!
    udpatedAt: String!
    user: User
    list: List
}`;

exports.TaskInputData = `
input TaskInputData {
    listId: String
    userId: String
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
    getTask: [Task]
`;

exports.TaskMutations = `
    addTask(taskInput: TaskInputData!): Task!
    updateTask(_id: ID!, taskInput: TaskInputData!): Task!
    deleteTask(_id: ID!): Boolean!
`;