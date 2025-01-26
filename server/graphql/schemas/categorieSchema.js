export const Categorie = `
type Categorie {
    id: ID! 
    userId: Int!
    title: String!
    desc: String
    color: String
    sharedWith: [Int]
    createdAt: String!
    updatedAt: String!
    archived: Boolean!
    user: User
}`;

export const CategorieInputData = `
input CategorieInputData {
    title: String
    desc: String
    color: String
    sharedWith: [Int]
}`

export const CategorieQueries = `
    getUserCategories: [Categorie]
`;

export const CategorieMutations = `
    addCategorie(categorieInput: CategorieInputData!): Categorie!
    updateCategorie(id: ID!, categorieInput: CategorieInputData!): Categorie!
    archiveCategorie(id: ID!, archived: Boolean!): Boolean!
`;