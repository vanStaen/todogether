import axios from "axios";

export const postAddTask = async (taskInputData) => {
  const requestBody = {
    query: `
        mutation ($taskInput: TaskInputData!) {
          addTask (taskInput: $taskInput) {
            _id,
          }
        }
        `,
    variables: {
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

  return response.data.data.addTask._id;
};
