import axios from "axios";

export const archiveCategorie = async (id, archived) => {
  const requestBody = {
    query: `
          mutation ($id: ID!, $archived: Boolean!) {
            archiveCategorie (
              id: $id,
              archived: $archived,
            ) 
          }
          `,
    variables: {
      id,
      archived,
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

  return response.data.data.archiveCategorie;

};
