const { Comment } = require("../../models/Comment");
const { User } = require("../../models/User");
const { Task } = require("../../models/Task");

exports.commentResolver = {
  //comment
  async getComment(args, req) {
    const result = await Comment.findAll({
      where: {
        taskId: args.taskId,
      },
      include: [User, Task]
    });
    return result;
  },

  //addComment(commentInput: CommentInputData!): Comment!
  async addComment(args, req) {
    if (!req.isAuth) {
      throw new Error("Unauthorized!");
    }
    console.log("args.commentInput.taskId", args.commentInput.taskId)
    const comment = new Comment({
      userId: req.userId,
      taskId: args.commentInput.taskId,
      comment: args.commentInput.comment,
    });
    return comment.save();
  },

  //deleteComment(_id: ID!): Boolean!
  async deleteComment(args, req) {
    await Comment.destroy({
      where: {
        _id: args._id,
      },
    });
    return true;
  },
};
