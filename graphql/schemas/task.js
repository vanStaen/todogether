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

exports.TaskQueries = `
    task: Task
`;