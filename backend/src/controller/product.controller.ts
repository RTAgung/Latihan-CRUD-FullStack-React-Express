import { Request, Response } from "express";
import AbstractModel from "../abstracts/model.abstract.js";
import db from "../models/index.js";
import { v4 as uuidV4 } from "uuid";
import { log } from "console";

class ProductController extends AbstractModel {
    async getById(req: Request, res: Response): Promise<any> {
        const delay = (ms: number) =>
            new Promise((resolve) => setTimeout(resolve, ms));
        await delay(500);
        try {
            const id = req.params.id;
            const product = await db.Product.findByPk(id, {
                include: [
                    {
                        model: db.Category,
                        as: "category",
                    },
                ],
            });

            if (product != null) {
                res.json({
                    status: "success",
                    message: "Product fetched successfully",
                    data: product,
                });
            } else {
                res.json({
                    status: "error",
                    message: "Product not found",
                });
            }
        } catch (error: any) {
            res.json({
                status: "error",
                message: error.message,
            });
        }
    }

    async getAll(req: Request, res: Response): Promise<any> {
        const delay = (ms: number) =>
            new Promise((resolve) => setTimeout(resolve, ms));
        await delay(500);
        try {
            const products = await db.Product.findAll({
                include: [
                    {
                        model: db.Category,
                        as: "category",
                    },
                ],
                order: [["createdAt", "DESC"]],
            });

            res.json({
                status: "success",
                message: "Products fetched successfully",
                data: products,
            });
        } catch (error: any) {
            res.json({
                status: "error",
                message: error.message,
            });
        }
    }

    async create(req: Request, res: Response): Promise<any> {
        const delay = (ms: number) =>
            new Promise((resolve) => setTimeout(resolve, ms));
        await delay(500);
        try {
            console.log("req.body", { ...req.body });

            const product = { ...req.body };
            await db.Product.create({ ...product, id: uuidV4() });

            res.json({
                status: "success",
                message: "Product created successfully",
                data: product,
            });
        } catch (error: any) {
            res.json({
                status: "error",
                message: error.message,
            });
        }
    }

    async update(req: Request, res: Response): Promise<any> {
        const delay = (ms: number) =>
            new Promise((resolve) => setTimeout(resolve, ms));
        await delay(500);

        try {
            const { id } = req.params;
            const isSuccess = await db.Product.update(
                { ...req.body },
                { where: { id } }
            )[0];

            if (isSuccess) {
                const product = await db.Product.findByPk(id);
                res.json({
                    status: "success",
                    message: "Product updated successfully",
                    data: product,
                });
            } else {
                res.json({
                    status: "error",
                    message: "Server error",
                });
            }
        } catch (error: any) {
            res.json({
                status: "error",
                message: error.message,
            });
        }
    }

    async delete(req: Request, res: Response): Promise<any> {
        const delay = (ms: number) =>
            new Promise((resolve) => setTimeout(resolve, ms));
        await delay(500);
        try {
            const { id } = req.params;
            const product = await db.Product.findByPk(id);
            const isSuccess = await db.Product.destroy({
                where: { id },
            });

            if (isSuccess) {
                res.json({
                    status: "success",
                    message: "Product deleted successfully",
                    data: product,
                });
            } else {
                res.json({
                    status: "error",
                    message: "Server error",
                });
            }
        } catch (error: any) {
            res.json({
                status: "error",
                message: error.message,
            });
        }
    }
}

export default new ProductController();
