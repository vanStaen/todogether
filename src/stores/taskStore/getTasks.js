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
                categorie {
                    title,
                    color,
                    id,
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

  return response.data.data.getTasks;

  /* 
  // TODO: Mock up when no internet 
  return [
    {
        "id": "1",
        "title": "test,
        "desc": "https://www.test.eu/",
        "archived": false,
        "deadline": null,
        "assignedTo": 6
    },
    {
        "id": "2",
        "title": "test",
        "desc": "https://www.test.eu/",
        "archived": true,
        "deadline": null,
        "assignedTo": 6
    },
    {
        "id": "3",
        "title": "test",
        "desc": null,
        "archived": false,
        "deadline": null,
        "assignedTo": 6
    },
  ]
  */
};
