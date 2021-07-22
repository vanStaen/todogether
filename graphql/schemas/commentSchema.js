exports.Comment = `
type Comment {
    _id: ID! 
    userId: String!
    taskId: String!
    comment: String!
    createdAt: String!
    udpatedAt: String!
    user: User
    task: Task
}`;

exports.CommentInputData = `
input CommentInputData {
    taskId: String!
    comment: String!
}`;

exports.CommentQueries = `
    getComment(taskId: String!): [Comment]
`;

exports.CommentMutations = `
    addComment(commentInput: CommentInputData!): Comment!
    deleteComment(_id: ID!): Boolean!
`;
