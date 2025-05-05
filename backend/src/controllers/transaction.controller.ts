import { Request, Response } from "express";
import AbstractModel from "../abstracts/model.abstract.js";
import TransactionService from "../services/transaction.service.js";
import ProductService from "../services/product.service.js";

class TransactionController extends AbstractModel {
    async getAll(req: Request, res: Response): Promise<any> {
        try {
            const response = await TransactionService.getAll();
            res.status(200).json({
                status: "success",
                message: "Transactions fetched successfully",
                data: response,
            });
        } catch (error: any) {
            res.status(500).json({
                status: "error",
                message: error.message,
            });
        }
    }

    async getById(req: Request, res: Response): Promise<any> {
        try {
            const response = await TransactionService.getById(req.params.id);
            res.status(200).json({
                status: "success",
                message: "Transaction fetched successfully",
                data: response,
            });
        } catch (error: any) {
            res.status(500).json({
                status: "error",
                message: error.message,
            });
        }
    }

    async create(req: Request, res: Response): Promise<any> {
        try {
            const response = await TransactionService.create({ ...req.body });

            await ProductService.updateStock(req.body.products);

            res.status(201).json({
                status: "success",
                message: "Transaction created successfully",
                data: response,
            });
        } catch (error: any) {
            res.status(500).json({
                status: "error",
                message: error.message,
            });
        }
    }

    async update(req: Request, res: Response): Promise<any> {
        try {
            const response = await TransactionService.update(req.params.id, {
                ...req.body,
            });
            res.status(200).json({
                status: "success",
                message: "Transaction updated successfully",
                data: response,
            });
        } catch (error: any) {
            res.status(500).json({
                status: "error",
                message: error.message,
            });
        }
    }

    async delete(req: Request, res: Response): Promise<any> {
        try {
            const response = await TransactionService.delete(req.params.id);
            res.status(200).json({
                status: "success",
                message: "Transaction deleted successfully",
                data: response,
            });
        } catch (error: any) {
            res.status(500).json({
                status: "error",
                message: error.message,
            });
        }
    }
}

export default new TransactionController();
