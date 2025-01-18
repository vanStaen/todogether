import axios from "axios";

export const updateCategorie = async (id, categorieInput) => {
  const requestBody = {
    query: `
          mutation ($id: ID!, $categorieInput: CategorieInputData!) {
            updateCategorie (
              id: $id,
              categorieInput: $categorieInput,
            ) {
              id,
              title,
              }
          }
          `,
    variables: {
      id,
      categorieInput,
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

  return response.data.data.updateCategorie;

};
