import axios from "axios";

export const archiveTaskInBulk = async (_ids, archived) => {
  const requestBody = {
    query: `
          mutation ($id: [ID!], $archived: Boolean!) {
            archiveTaskInBulk (
                _id: $id,
                archived: $archived,
                )
          }
          `,
          variables: {
            id: _ids,
            archived: archived,
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
