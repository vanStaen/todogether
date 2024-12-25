import axios from "axios";

export const getTasks = async () => {
  const requestBody = {
    query: `
        {
            getTasks {
                id,
                title,
                desc,    
                archived, 
                deadline,
                assignedTo, 
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

  return response.data.data.getTasks;
};
