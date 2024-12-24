import axios from "axios";

export const getTasks = async (listId) => {
  const requestBody = {
    query: `
        {
            getTask(listId: ${listId}) {
                id,
                title,
                desc,    
                archived, 
                deadline,
                assignedTo,        
                comments {
                    id,
                },            
                pictures {
                    id,
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