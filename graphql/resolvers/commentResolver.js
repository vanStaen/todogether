const Comment = require("../../models/Comment");

exports.Comment = {

  //commnent
  comment: (args, req)=> {
    const comments = await Comment.findAll();
    return comments
  },

  //addComment(commentInput: CommentInputData!): Comment!
  addComment: (args, req) => {
    const comment = new Comment({
      userId: "1",
      comment: args.commentInput.comment,
    });
    return comment.save();
  },

  //  deleteComment(id: ID!): Boolean!
  deleteComment: (args, req) => {
    await Comment.destroy({
      where: {
        id: args.id,
      },
    });
    return true;
  },
  
};
