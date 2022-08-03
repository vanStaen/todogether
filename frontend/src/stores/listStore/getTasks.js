import axios from "axios";

export const getTasks = async () => {
  const requestBody = {
    query: `
        {
            getTask(listId: 1) {
                _id,
                title,
                desc,
                list {
                    _id,
                },
                user {
                    _id,
                    username,
                },
                comments {
                    _id,
                    comment,
                },
              }
          }
          `,
  };

  const response = await axios({
    url: process.env.API_URL + `/graphql`,
    method: "POST",
    data: requestBody,
  });

  if ((response.status !== 200) & (response.status !== 201)) {
    throw new Error("Unauthenticated!");
  }

  return response.data.data.getTask;
};
