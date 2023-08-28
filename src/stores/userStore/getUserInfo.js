import axios from "axios";

export const getUserInfo = async () => {
    const requestBody = {
        query: `
        {
            getUser {
                username,
                email,
                avatar,
                categories,
                emailSettings,
                profilSettings,
                lastActive,
                createdAt,
                updatedAt,
                lists {
                    _id,
                    title,
                    desc,
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
