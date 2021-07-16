const Sequelize = require("sequelize");
const sequelizedb = require("../../lib/sequelizedb")
const Comment = require("../../models/Comment")(sequelizedb, Sequelize.DataTypes);

exports.commentResolver = {

  //commnent
  async getComment (args, req) {
    return await Comment.findAll();
  },

  //addComment(commentInput: CommentInputData!): Comment!
  async addComment (args, req) {
    const comment = new Comment({
      userId: "1",
      comment: args.commentInput.comment,
    });
    return comment.save();
  },

  //deleteComment(_id: ID!): Boolean!
  async deleteComment (args, req) {
    await Comment.destroy({
      where: {
        _id: args._id,
      },
    });
    return true;
  },
  
};
