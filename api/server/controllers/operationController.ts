import { Response } from "express";
import { IReqAuth } from "../utils/types";
import Operations, { IOperation } from "../models/operationModel";

export const getOperations = async (req: IReqAuth, res: Response) => {
    try {

        if (!req.user) return res.status(400).json({ msg: 'Invalid authentication.' });

        const operations: IOperation[] | null = await Operations.findAll({
            limit: 10,
            where: {
                userId: req.user.id
            },
            order: [
                ['createdAt', 'DESC'],
            ],
        });

        return res.status(200).json({ operations });

    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
};

export const createOperation = async (req: IReqAuth, res: Response) => {

    if (!req.user) return res.status(400).json({ msg: 'Invalid authentication.' });

    try {

        const { description, amount, type } = req.body;

        const newOperation = await Operations.create({ description, amount, type, userId: req.user.id });

        return res.status(201).json({ msg: 'Operation created successfully.', newOperation });

    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
};

export const updateOperation = async (req: IReqAuth, res: Response) => {

    if (!req.user) return res.status(400).json({ msg: 'Invalid authentication.' });

    try {

        const { description, amount } = req.body;

        const operation: IOperation | null = await Operations.findByPk(req.params.id);

        if (!operation) return res.status(400).json({ error: 'Operation not found.' });

        const operationUpdated = await operation.update(
            { description, amount }, {
            where: { id: req.params.id, userId: req.user.id }
        });

        return res.status(200).json({ msg: 'Operation updated successfully.', operationUpdated });

    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
};

export const deleteOperation = async (req: IReqAuth, res: Response) => {

    if (!req.user) return res.status(400).json({ msg: 'Invalid authentication.' });

    try {

        await Operations.destroy({
            where: {
                id: req.params.id,
                userId: req.user.id
            }
        });

        return res.status(200).json({ msg: 'Operation removed successfully.' });

    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
};