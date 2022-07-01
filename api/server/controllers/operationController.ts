import { Request, Response } from "express";
import Operations, { IOperation } from "../models/operationModel";

export const getOperations = async (req: Request, res: Response) => {
    try {

        const operations: IOperation[] | null = await Operations.findAll({
            limit: 10
        });

        return res.status(200).json({ operations });

    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
};

export const createOperation = async (req: Request, res: Response) => {
    try {

        const { description, amount, type } = req.body;

        const newOperation = await Operations.create({ description, amount, type });

        return res.status(201).json({ msg: 'Operation created successfully.', newOperation });

    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
};

export const updateOperation = async (req: Request, res: Response) => {
    try {

        const { description, amount } = req.body;

        const movie: IOperation | null = await Operations.findByPk(req.params.id);

        if (!movie) return res.status(400).json({ error: 'Operation not found.' });

        await Operations.update(
            { description, amount }, {
            where: { id: req.params.id }
        });

        return res.status(200).json({ msg: 'Operation updated successfully.' });

    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
};

export const deleteOperation = async (req: Request, res: Response) => {
    try {

        await Operations.destroy({
            where: {
                id: req.params.id
            }
        });

        return res.status(200).json({ msg: 'Operation removed successfully.' });

    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
};