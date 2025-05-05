import { v4 as uuidV4 } from "uuid";
import db from "../models/index.js";

class CategoryService {
    async getAllWithProducts(): Promise<any> {
        try {
            const response = await db.Category.findAll({
                attributes: {
                    exclude: ["createdAt", "updatedAt"], // Exclude these fields from Category
                },
                include: [
                    {
                        model: db.Product,
                        as: "products",
                        attributes: {
                            exclude: ["createdAt", "updatedAt"], // Exclude from Product too
                        },
                    },
                ],
                order: [["createdAt", "DESC"]],
            });
            return response;
        } catch (error: any) {
            throw new Error("failed to fetch: " + error.message);
        }
    }

    async getAll(): Promise<any> {
        try {
            const response = await db.Category.findAll({
                order: [["createdAt", "DESC"]],
            });
            return response;
        } catch (error: any) {
            throw new Error("failed to fetch: " + error.message);
        }
    }

    async getById(id: string): Promise<any> {
        try {
            const response = await db.Category.findByPk(id);
            return response;
        } catch (error: any) {
            throw new Error("failed to fetch: " + error.message);
        }
    }

    async create(category: any): Promise<any> {
        try {
            const response = await db.Category.create({
                ...category,
                id: uuidV4(),
            });
            return response;
        } catch (error: any) {
            throw new Error("failed to create: " + error.message);
        }
    }

    async update(id: string, category: any): Promise<any> {
        try {
            const isSuccess = await db.Category.update(
                { ...category },
                { where: { id } }
            ).then((res: number[]) => res[0] > 0);

            if (!isSuccess) {
                throw new Error("Not Found");
            }

            const updatedCategory = await db.Category.findByPk(id);
            return updatedCategory;
        } catch (error: any) {
            throw new Error("failed to update: " + error.message);
        }
    }

    async delete(id: string): Promise<any> {
        try {
            const deletedCategory = await db.Category.findByPk(id);
            const isSuccess = await db.Category.destroy({
                where: { id },
            }).then((res: number) => res > 0);

            if (!isSuccess) {
                throw new Error("Not Found");
            }

            return deletedCategory;
        } catch (error: any) {
            throw new Error("failed to delete: " + error.message);
        }
    }
}

export default new CategoryService();
