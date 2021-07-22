const Sequelize = require("sequelize");
const sequelizedb = require("../../lib/sequelizedb");
const Comment = require("../../models/Comment")(
  sequelizedb,
  Sequelize.DataTypes
);
const User = require("../../models/User")(sequelizedb, Sequelize.DataTypes);
const Task = require("../../models/User")(sequelizedb, Sequelize.DataTypes);

exports.commentResolver = {
  //comment
  async getComment(args, req) {
    const result = await Comment.findAll({
      where: {
        taskId: args.taskId,
      },
      include: [Task, User],
    });
    return result;
  },

  //addComment(commentInput: CommentInputData!): Comment!
  async addComment(args, req) {
    if (!req.isAuth) {
      throw new Error("Unauthorized!");
    }
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
