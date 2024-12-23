import axios from "axios";

export const postAddUser = async (
  firstName,
  lastName,
  username,
  email,
  password
) => {
  const requestBody = {
    query: `mutation {
                addUser (
                    userInput: { 
                        username: "${username}", 
                        email: "${email}", 
                        password: "${password}", 
                        }
                    ) {
                    id
                    }
                }`,
            };

  const headers = {
    "Content-Type": "application/json",
  };

  try {
    const response = await axios(
      {
        url: process.env.API_URL + `/graphql`,
        method: "POST",
        data: requestBody,
      },
      {
        headers: headers,
      }
    );
    return response.data;
  } catch(err) {
    if (err.response.status === 401) {
      throw new Error(`Error! Unauthorized(401)`);
    } 
    return err.response.data;
  }
  
};
