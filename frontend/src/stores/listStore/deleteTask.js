import axios from "axios";

export const deleleTask = async (_ids) => {
  const requestBody = {
    query: `
          mutation ($id: [ID!]!) {
            deleteTask (_id: $id)
          }
          `,
          variables: {
            id: _ids,
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

  return response.data.data.archiveTaskInBulk;
};
