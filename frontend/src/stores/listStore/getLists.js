import axios from "axios";

export const getLists = async () => {
  const requestBody = {
    query: `
        {
          getList {
            title,
            desc,
            listType,
            _id,
            tasks {
                _id,
                title
                comments {
                    _id,
                    comment,
                    }
                }
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

  return response.data.data.getList;
};
