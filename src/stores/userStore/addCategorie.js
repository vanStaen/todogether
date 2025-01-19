import axios from "axios";

export const addCategorie = async (CategorieInputData) => {
  const requestBody = {
    query: `
        mutation ($categorieInput: CategorieInputData!) {
          addCategorie (categorieInput: $categorieInput) {
            id,
          }
        }
        `,
    variables: {
      categorieInput: CategorieInputData,
    },
  };

  const response = await axios({
    url: process.env.API_URL + `/graphql`,
    method: "POST",
    data: requestBody,
  });

  if ((response.status !== 200) & (response.status !== 201)) {
    throw new Error("Unauthenticated!");
  }

  return response.data.data.addCategorie.id;
};
