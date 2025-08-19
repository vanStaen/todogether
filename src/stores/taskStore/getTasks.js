import axios from "axios";

export const getTasks = async (categoriesId) => {
  const requestBody = {
    query: `
          query ($categoriesId: [Int]) {
            getTasks (categoriesId: $categoriesId){
                id,
                title,
                desc,    
                archived, 
                deadline,
                assignedTo, 
                categorie {
                    title,
                    color,
                    id,
                }
              }
          }
          `,
    variables: {
      categoriesId,
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

  return response.data.data.getTasks;
};
