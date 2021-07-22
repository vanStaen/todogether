exports.Comment = `
type Comment {
    _id: ID! 
    UserId: String!
    TaskId: String!
    comment: String!
    createdAt: String!
    udpatedAt: String!
}`;

exports.CommentInputData = `
input CommentInputData {
    TaskId: String!
    comment: String!
}`;

exports.CommentQueries = `
    getComment(TaskId: String!): [Comment]
`;

exports.CommentMutations = `
    addComment(commentInput: CommentInputData!): Comment!
    deleteComment(_id: ID!): Boolean!
`;
