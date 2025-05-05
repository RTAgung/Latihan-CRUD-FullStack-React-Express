import { v4 as uuidV4 } from "uuid";
import db from "../models/index.js";

class TransactionDetailService {
    async getAll(): Promise<any> {
        try {
            const response = await db.Transaction.findAll({
                include: [
                    {
                        model: db.TransactionDetail,
                        as: "transactionDetail",
                    },
                ],
                raw: false,
                order: [["createdAt", "DESC"]],
            });

            const mappedResponse = response.map((transaction: any) => {
                const plainTransaction = transaction.get({ plain: true });
                return {
                    ...plainTransaction,
                    transactionDetail: {
                        ...plainTransaction.transactionDetail,
                        products: JSON.parse(
                            plainTransaction.transactionDetail.products
                        ),
                    },
                };
            });
            return mappedResponse;
        } catch (error: any) {
            throw new Error("failed to fetch: " + error.message);
        }
    }

    async getById(id: string): Promise<any> {
        try {
            const response = await db.Transaction.findByPk(id, {
                include: [
                    {
                        model: db.TransactionDetail,
                        as: "transactionDetail",
                    },
                ],
                raw: false,
            });
            if (response == null) return null;

            const plainTransaction = response.get({ plain: true });
            const mappedResponse = {
                ...plainTransaction,
                transactionDetail: {
                    ...plainTransaction.transactionDetail,
                    products: JSON.parse(
                        plainTransaction.transactionDetail.products
                    ),
                },
            };
            return mappedResponse;
        } catch (error: any) {
            throw new Error("failed to fetch: " + error.message);
        }
    }

    async create(transactionDetail: any): Promise<any> {
        try {
            const id = uuidV4();
            const response = await db.TransactionDetail.create({
                ...transactionDetail,
                id,
            });
            return response;
        } catch (error: any) {
            throw new Error("failed to create: " + error.message);
        }
    }
}

export default new TransactionDetailService();
