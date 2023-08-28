exports.Picture = `
type Picture {
    _id: ID! 
    userId: Int!
    taskId: Int!
    url: String!
    thumbUrl: String!
    createdAt: String!
    udpatedAt: String!
    user: User
    task: Task
}`;

exports.PictureInputData = `
input PictureInputData {
    taskId: Int!
    url: String!
    thumbUrl: String!
}`;

exports.PictureQueries = `
    getPicture(taskId: Int!): [Picture]
`;

exports.PictureMutations = `
    addPicture(pictureInput: PictureInputData!): Picture!
    deletePicture(_id: ID!): Boolean!
`;
