const { Picture } = require("../../models/Picture");
const { User } = require("../../models/User");
const { Task } = require("../../models/Task");

exports.pictureResolver = {
  //getPicture
  async getPicture(args, req) {
    return await Picture.findAll({
      where: {
        taskId: args.taskId,
      },
      include: [User, Task]
    });
  },

  //addPicture(pictureInput: PictureInputData!): Picture!
  async addPicture(args, req) {
    if (!req.isAuth) {
      throw new Error("Unauthorized!");
    }
    console.log("args.pictureInput.taskId", args.pictureInput.taskId)
    const picture = new Picture({
      userId: req.userId,
      taskId: args.pictureInput.taskId,
      url: args.pictureInput.url,
      thumbUrl: args.pictureInput.thumbUrl,
    });
    return picture.save();
  },

  //deletePicture(_id: ID!): Boolean!
  async deletePicture(args, req) {
    await Picture.destroy({
      where: {
        _id: args._id,
      },
    });
    return true;
  },
};
