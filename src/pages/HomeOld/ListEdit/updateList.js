import axios from "axios";

export const updateList = async (id, listInputData) => {
  const requestBody = {
    query: `
        mutation ($id: ID!, $listInput: ListInputData!) {
          updateList (
            id: $id,
            listInput: $listInput
            ) {
            id,
          }
        }
        `,
    variables: {
      id: id,
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

  return true;
};
