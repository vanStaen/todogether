const Sequelize = require("sequelize");

const sequelize = new Sequelize({
  database: process.env.DATABASE_NAME,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PWD,
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

const Comment = require("../../models/Comment")(sequelize, Sequelize.DataTypes);

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
