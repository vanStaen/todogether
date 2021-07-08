exports.Comment = `
type Comment {
    id: ID! 
    userId: String!
    comment: String!
    createdAt: String!
    udpatedAt: String!
}`;

exports.CommentInputData = `
type CommentInputData {
    comment: String!
}`;

exports.CommentQueries = `
    comment: Comment
`;

exports.CommentMutations = `
    addComment(CommentInput: CommentInputData!): Comment!
    deleteComment(CommentId: ID!): Comment!
`;
