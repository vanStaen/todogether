exports.Task = `
type Task {
    id: ID! 
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
type TaskInputData {
    id: ID
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
    task: Task
`;

exports.TaskMutations = `
    addTask(TaskInput: TaskInputData!): Task!
    updateTask(TaskInput: TaskInputData!): Task!
    deleteTask(TaskId: ID!): Task!
`;