import { Categorie } from "../../models/Categorie.js";
import { Op } from "sequelize";

export const categorieResolver = {
  //addCategorie(categorieInput: CategorieInputData!): Categorie!
  async addCategorie(args, req) {
    if (!req.isAuth) {
      throw new Error("Unauthorized!");
    }
    try {
      const categorie = new Categorie({
        userId: req.userId,
        title: args.categorieInput.title,
        archived: false,
        color: 'Silver',
      });
      return await categorie.save();
    } catch (err) {
      console.log(err);
    }
  },
  
  //getUserCategories: [Categorie]
  async getUserCategories(_, req) {
    if (!req.isAuth) {
      throw new Error("Unauthorized!");
    }
    return await Categorie.findAll({
      where: {
       [Op.or] : [
        { userId: req.userId },
        {
          sharedWith: { [Op.contains]: [req.userId] },
        },
       ]
      }
    });
  },


  //updateCategorie(id: ID!, categorieInput: CategorieInputData!): Categorie!
  async updateCategorie(args, req) {
    if (!req.isAuth) {
      throw new Error("Unauthorized!");
    }
    const updateFields = [];
    const updatableFields = [
      "title",
      "desc",
      "sharedWith",
      "color",
    ];
    updatableFields.forEach((field) => {
      if (field in args.categorieInput) {
        updateFields[field] = args.categorieInput[field];
      }
    });
    try {
      const updatedCategorie = await Categorie.update(updateFields, {
        where: {
          id: args.id,
        },
        returning: true,
        plain: true,
      });
      // updatedCategorie[0]: number or row updated
      // updatedCategorie[1]: rows updated
      return updatedCategorie[1];
    } catch (err) {
      console.log(err);
    }
  },

  //archiveCategorie(id: ID!, archived: Boolean!): Boolean!
  async archiveCategorie(args, req) {
    if (!req.isAuth) {
      throw new Error("Unauthorized!");
    }
    try {
      await Categorie.update(
        { archived: args.archived },
        {
          where: {
            id: args.id,
          },
          returning: true,
          plain: true,
        }
      );
      return true;
    } catch (err) {
      console.log(err);
    }
  }, 
};
