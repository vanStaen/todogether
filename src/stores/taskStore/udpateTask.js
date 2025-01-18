import axios from "axios";

export const updateTask = async (id, taskInput) => {
  const requestBody = {
    query: `
          mutation ($id: ID!, $taskInput: TaskInputData!) {
            updateTask (
              id: $id,
              taskInput: $taskInput,
            ) {
              id
              }
          }
          `,
    variables: {
      id,
      taskInput
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

  return response.data.data.updateTask;

};
