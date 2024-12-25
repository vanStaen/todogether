import axios from "axios";

export const deleteList = async (id) => {
  const requestBody = {
    query: `
        mutation ($id: ID!) {
          deleteList (id: $id) 
        }
        `,
    variables: {
      id: id,
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

  return true;
};
