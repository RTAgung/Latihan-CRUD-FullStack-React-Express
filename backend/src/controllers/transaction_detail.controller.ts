import { Request, Response } from "express";
import TransactionDetailService from "../services/transaction_detail.service.js";

class TransactionDetailController {
    async getAll(req: Request, res: Response): Promise<any> {
        try {
            const response = await TransactionDetailService.getAll();
            res.status(200).json({
                status: "success",
                message: "Transaction details fetched successfully",
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
            const response = await TransactionDetailService.getById(
                req.params.id
            );
            res.status(200).json({
                status: "success",
                message: "Transaction detail fetched successfully",
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

export default new TransactionDetailController();
