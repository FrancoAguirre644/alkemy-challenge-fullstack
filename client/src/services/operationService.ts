import axios from "axios";

export const getOperations = async (token: string) => {
    const res = await axios.get(`/operations`, {
        headers: { Authorization: token }
    });

    return res.data;
}

export const deleteOperation = async (id: number, token: string) => {
    const res = await axios.delete(`/operations/${id}`, {
        headers: { Authorization: token }
    });

    return res.data;
}