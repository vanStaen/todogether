exports.Comment = `
type Comment {
    id: ID! 
    userId: String!
    comment: String!
    createdAt: String!
    udpatedAt: String!
}`;

exports.CommentInputData = `
input CommentInputData {
    comment: String!
}`;

exports.CommentQueries = `
    getComment: Comment
`;

exports.CommentMutations = `
    addComment(commentInput: CommentInputData!): Comment!
    deleteComment(id: ID!): Boolean!
`;
