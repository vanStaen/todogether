import axios from "axios";

export const deleteTask = async (id) => {
  const requestBody = {
    query: `
          mutation ($id: ID!) {
            deleteTask (id: $id)
          }
          `,
    variables: {
      id,
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

  return response.data.data.deleteTask;
};
