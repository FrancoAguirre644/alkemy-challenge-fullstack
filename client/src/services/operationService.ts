import axios from "axios";

export const getOperations = async (token: string) => {
    const res = await axios.get(`/operations`, {
        headers: { Authorization: token }
    });

    return res.data;
}