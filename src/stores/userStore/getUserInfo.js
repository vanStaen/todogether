import axios from "axios";

export const getUserInfo = async () => {
    const requestBody = {
        query: `
        {
            getUser {
                username,
                email,
                avatar,
                emailSettings,
                profilSettings,
                lastActive,
                createdAt,
                updatedAt,
                categories {
                    id,
                    title,
                    color,
                    archived,
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

    return response.data.data.getUser;
};
