import axios from "axios";

export const postLogin = async (email, username, password, remind) => {

    const requestBody = {
        "email": email,
        "username": username,
        "password": password,
        "remind": remind,
    };

    const response = await axios({
        url: process.env.REACT_APP_API_URL + `/auth/login/`,
        method: "POST",
        data: requestBody,
    });

    if ((response.status !== 200) & (response.status !== 201)) {
        if (response.status === 401) {
            throw new Error(`Error! Unauthorized(401)`);
        } else {
            throw new Error(`Error! Status ${response.status}`);
        }
    }

    return response;
};