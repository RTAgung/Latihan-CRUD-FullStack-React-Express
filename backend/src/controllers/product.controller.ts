import { Request, Response } from "express";
import AbstractModel from "../abstracts/model.abstract.js";
import db from "../models/index.js";
import { v4 as uuidV4 } from "uuid";

class ProductController extends AbstractModel {
    async getById(req: Request, res: Response): Promise<any> {
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
        try {
            const product = await db.Product.create({
                ...req.body,
                id: uuidV4(),
            });

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
        try {
            const { id } = req.params;
            const isSuccess = await db.Product.update(
                { ...req.body },
                { where: { id } }
            ).then((res: number[]) => res[0] > 0);

            if (!isSuccess) {
                throw new Error("Server error");
            }

            const product = await db.Product.findByPk(id);
            res.json({
                status: "success",
                message: "Product updated successfully",
                data: product,
            });
        } catch (error: any) {
            res.json({
                status: "error",
                message: error.message,
            });
        }
    }

    async delete(req: Request, res: Response): Promise<any> {
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
