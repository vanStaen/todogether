import axios from "axios";

export const postAddUser = async (
  firstName,
  lastName,
  userName,
  email,
  password
) => {
  const requestBody = {
    query: `mutation {
                addUser (
                    userInput: { 
                        userName: "${userName}", 
                        email: "${email}", 
                        password: "${password}", 
                        }
                    ) {
                    _id
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
