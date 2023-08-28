import axios from "axios";

export const updateTask = async (id, taskInputData) => {
  const requestBody = {
    query: `
        mutation ($id: ID!, $taskInput: TaskInputData!) {
          updateTask (
            _id: $id,
            taskInput: $taskInput
            ) {
            _id,
          }
        }
        `,
    variables: {
      id: id,
      taskInput: taskInputData,
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
