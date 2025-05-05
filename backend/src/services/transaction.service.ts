import { v4 as uuidV4 } from "uuid";
import db from "../models/index.js";
import TransactionDetailService from "./transaction_detail.service.js";

class TransactionService {
    async getAll(): Promise<any> {
        try {
            const response = await db.Transaction.findAll({
                order: [["createdAt", "DESC"]],
            });
            return response;
        } catch (error: any) {
            throw new Error("failed to fetch: " + error.message);
        }
    }

    async getById(id: string): Promise<any> {
        try {
            const response = await db.Transaction.findByPk(id);
            return response;
        } catch (error: any) {
            throw new Error("failed to fetch: " + error.message);
        }
    }

    async create(transaction: any): Promise<any> {
        try {
            if (transaction.products === undefined) {
                throw new Error("Products is required");
            }
            const id = uuidV4();
            await db.Transaction.create({
                ...transaction,
                id,
            });
            await TransactionDetailService.create({
                products: transaction.products,
                transactionId: id,
            });

            const response = await TransactionDetailService.getById(id);
            return response;
        } catch (error: any) {
            throw new Error("failed to create: " + error.message);
        }
    }

    async update(id: string, transaction: any): Promise<any> {
        try {
            const isSuccess = await db.Transaction.update(
                { ...transaction },
                { where: { id } }
            ).then((res: number[]) => res[0] > 0);

            const isSuccessDetail = await db.TransactionDetail.update(
                { products: transaction.products },
                {
                    where: {
                        transactionId: id,
                    },
                }
            ).then((res: number[]) => res[0] > 0);

            if (!isSuccess && !isSuccessDetail) {
                throw new Error("Not Found");
            }

            const updatedTransaction = await TransactionDetailService.getById(
                id
            );
            return updatedTransaction;
        } catch (error: any) {
            throw new Error("failed to update: " + error.message);
        }
    }

    async delete(id: string): Promise<any> {
        try {
            const deletedTransaction = await TransactionDetailService.getById(
                id
            );

            const isSuccess = await db.Transaction.destroy({
                where: { id },
            }).then((res: number) => res > 0);

            if (!isSuccess) {
                throw new Error("Not Found");
            }

            return deletedTransaction;
        } catch (error: any) {
            throw new Error("failed to delete: " + error.message);
        }
    }
}

export default new TransactionService();
