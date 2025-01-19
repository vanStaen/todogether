import { sequelize, DataTypes } from "../lib/sequelizedb.js";
import { User } from "./User.js";

export const Categorie = sequelize.sequelize.define("categorie", {
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
  color: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  sharedWith: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    allowNull: true,
  },
  archived: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

User.hasMany(Categorie);
Categorie.belongsTo(User);
