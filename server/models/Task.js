import { sequelize, DataTypes } from "../lib/sequelizedb.js";
import { User } from "./User.js";

export const Task = sequelize.sequelize.define("task", {
  id: {
    type: DataTypes.INTEGER,
    field: "id",
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  desc: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  positionInList: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  favorited: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  archived: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  subTaskIds: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    allowNull: true,
  },
  deadline: {
    type: DataTypes.STRING,
    allowNull: true,
  },  
  categoryId: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  assignedTo: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
});

User.hasMany(Task);
Task.belongsTo(User);
