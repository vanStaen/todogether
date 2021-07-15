const Comment = require("../../models/Comment");

exports.commentResolver = {

  //commnent
  async getComment (args, req) {
    const comments = await Comment.findAll();
    return comments
  },

  //addComment(commentInput: CommentInputData!): Comment!
  async addComment (args, req) {
    const comment = new Comment({
      userId: "1",
      comment: args.commentInput.comment,
    });
    return comment.save();
  },

  //deleteComment(id: ID!): Boolean!
  async deleteComment (args, req) {
    await Comment.destroy({
      where: {
        id: args.id,
      },
    });
    return true;
  },
  
};
