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
    categorieId: String
    assignedTo: Int    
    createdAt: String!
    udpatedAt: String!
    user: User
    categorie: Categorie
}`;

export const TaskInputData = `
input TaskInputData {
    title: String
    desc: String
    positionInList: Int
    favorited: Boolean
    archived: Boolean
    subTaskIds: [Int]
    categorieId: Int
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
    archiveTask(id: ID!, archived: Boolean!): Boolean!
    deleteTask(id: ID!): Boolean!
`;