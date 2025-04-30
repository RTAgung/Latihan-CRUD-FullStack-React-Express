import {Request, Response} from "express";
import db from "../models/index.js";

class CategoryController {
    async getAll(req: Request, res: Response): Promise<any> {
        const delay = (ms: number) =>
            new Promise((resolve) => setTimeout(resolve, ms));
        await delay(500);
        try {
            const categories = await db.Category.findAll({
                attributes: {
                    exclude: ['createdAt', 'updatedAt'], // Exclude these fields from Category
                },
                include: [
                    {
                        model: db.Product,
                        as: 'products',
                        attributes: {
                            exclude: ['createdAt', 'updatedAt'], // Exclude from Product too
                        },
                    },
                ],
            });

            res.json({
                status: "success",
                message: "Categories with products fetched successfully",
                data: categories,
            });
        } catch (error: any) {
            res.json({
                status: "error",
                message: error.message,
            });
        }
    }
}

export default new CategoryController();