import axios from "axios";

export const getAllUsers = async () => {
    const requestBody = {
        query: `
        {
            getAllUsers {
                id,
                username,
                avatar,
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

    return response.data.data.getAllUsers;
};
