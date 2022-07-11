import axios from "axios";
import { IOperation } from "../models";

export const getOperations = async (token: string) => {
    const res = await axios.get(`/operations`, {
        headers: { Authorization: token }
    });

    return res.data;
}

export const createOperation = async (operation: IOperation, token: string) => {
    const res = await axios.post(`/operations`, operation, {
        headers: { Authorization: token }
    });

    return res.data;
}

export const updateOperation = async (operation: IOperation, token: string) => {
    const res = await axios.put(`/operations/${operation.id}`, operation, {
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