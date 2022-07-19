import axios from "axios";

export const getUserInfo = async () => {
    const requestBody = {
        query: `
        {
            getUser {
              firstName,
              lastName,
              username,
              email,
              avatar,
              emailSettings,
              profilSettings,
              friends,
              lastActive
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

    return response.data.data.getUser;
};
