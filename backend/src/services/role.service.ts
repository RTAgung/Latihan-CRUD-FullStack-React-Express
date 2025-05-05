import { v4 as uuidV4 } from "uuid";
import db from "../models/index.js";

class RoleService {
    async getAll(): Promise<any> {
        try {
            const response = await db.Role.findAll({
                order: [["createdAt", "DESC"]],
            });
            return response;
        } catch (error: any) {
            throw new Error("failed to fetch: " + error.message);
        }
    }

    async getById(id: string): Promise<any> {
        try {
            const response = await db.Role.findByPk(id);
            return response;
        } catch (error: any) {
            throw new Error("failed to fetch: " + error.message);
        }
    }

    async create(role: any): Promise<any> {
        try {
            const response = await db.Role.create({
                ...role,
                id: uuidV4(),
            });
            return response;
        } catch (error: any) {
            throw new Error("failed to create: " + error.message);
        }
    }

    async update(id: string, role: any): Promise<any> {
        try {
            const isSuccess = await db.Role.update(
                { ...role },
                { where: { id } }
            ).then((res: number[]) => res[0] > 0);

            if (!isSuccess) {
                throw new Error("Not Found");
            }

            const updatedRole = await db.Role.findByPk(id);
            return updatedRole;
        } catch (error: any) {
            throw new Error("failed to update: " + error.message);
        }
    }

    async delete(id: string): Promise<any> {
        try {
            const deletedRole = await db.Role.findByPk(id);
            const isSuccess = await db.Role.destroy({
                where: { id },
            }).then((res: number) => res > 0);

            if (!isSuccess) {
                throw new Error("Not Found");
            }

            return deletedRole;
        } catch (error: any) {
            throw new Error("failed to delete: " + error.message);
        }
    }
}

export default new RoleService();
