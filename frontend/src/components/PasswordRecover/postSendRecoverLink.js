import axios from "axios";

export const postSendRecoverLink = async (email) => {

    const requestBody = {
        "sendto": email,
    };

    const response = await axios({
        url: process.env.REACT_APP_API_URL + `/mail/recover`,
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

    return true

};