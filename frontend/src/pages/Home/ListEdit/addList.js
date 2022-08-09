import axios from "axios";

export const addList = async (listInputData) => {
  const requestBody = {
    query: `
        mutation ($listInput: ListInputData!) {
          addList (listInput: $listInput) {
            _id,
          }
        }
        `,
    variables: {
      listInput: listInputData,
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

  return response.data.data.addList._id;
};
