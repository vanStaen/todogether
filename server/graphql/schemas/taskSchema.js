export const Task = `
type Task {
    id: ID! 
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
    user: User
}`;

export const TaskInputData = `
input TaskInputData {
    title: String
    desc: String
    positionInList: Int
    favorited: Boolean
    archived: Boolean
    subTaskIds: [Int]
    categoryIds: [Int]
    deadline: String    
    assignedTo: Int
}`;

export const TaskQueries = `
    getTask(taskId: Int!): Task
    getTasks: [Task]
`;

export const TaskMutations = `
    addTask(taskInput: TaskInputData!): Task!
    updateTask(id: ID!, taskInput: TaskInputData!): Task!
    archiveTaskInBulk(id: [ID!]!, archived: Boolean!): Boolean!
    deleteTask(id: [ID!]!): Boolean!
`;