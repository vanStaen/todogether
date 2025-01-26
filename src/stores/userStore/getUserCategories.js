import axios from "axios";

export const getUserCategories = async () => {
    const requestBody = {
        query: `
        {
            getUserCategories {
                id,
                title,
                color,
                archived,
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

    return response.data.data.getUserCategories;
};
