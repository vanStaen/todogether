exports.Comment = `
type Comment {
    id: ID! 
    userId: String!
    comment: String!
    createdAt: String!
    udpatedAt: String!
}`;

exports.CommentQueries = `
    comment: Comment
`;
