export const Categorie = `
type Categorie {
    id: ID! 
    userId: Int!
    title: String!
    desc: String
    color: String
    sharedWith: [Int]
    createdAt: String!
    udpatedAt: String!
    user: User
}`;

export const CategorieInputData = `
input CategorieInputData {
    title: String
    desc: String
    color: String
    sharedWith: [Int]
}`;

export const CategorieQueries = `
    getCategorie(categorieId: Int!): Categorie
    getCategories: [Categorie]
`;

export const CategorieMutations = `
    addCaategorie(categorieInput: CategorieInputData!): Categorie!
    updateCategorie(id: ID!, categorieInput: CategorieInputData!): Categorie!
    archiveCategorie(id: ID!, archived: Boolean!): Boolean!
    deleteCategorie(id: ID!): Boolean!
`;