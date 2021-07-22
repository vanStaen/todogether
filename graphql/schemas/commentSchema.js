exports.Comment = `
type Comment {
    _id: ID! 
    userId: Int!
    taskId: Int!
    comment: String!
    createdAt: String!
    udpatedAt: String!
    user: User
}`;

exports.CommentInputData = `
input CommentInputData {
    userId: Int
    taskId: Int
    comment: String!
}`;

exports.CommentQueries = `
    getComment(taskId: Int!): [Comment]
`;

exports.CommentMutations = `
    addComment(commentInput: CommentInputData!): Comment!
    deleteComment(_id: ID!): Boolean!
`;
