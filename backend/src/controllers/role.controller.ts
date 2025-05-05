import { Request, Response } from "express";
import AbstractModel from "../abstracts/model.abstract.js";
import RoleService from "../services/role.service.js";

class RoleController extends AbstractModel {
    async getAll(req: Request, res: Response): Promise<any> {
        try {
            const response = await RoleService.getAll();
            res.status(200).json({
                status: "success",
                message: "Roles fetched successfully",
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
            const response = await RoleService.getById(req.params.id);
            res.status(200).json({
                status: "success",
                message: "Role fetched successfully",
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
            const response = await RoleService.create({ ...req.body });
            res.status(201).json({
                status: "success",
                message: "Role created successfully",
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
            const response = await RoleService.update(req.params.id, {
                ...req.body,
            });
            res.status(200).json({
                status: "success",
                message: "Role updated successfully",
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
            const response = await RoleService.delete(req.params.id);
            res.status(200).json({
                status: "success",
                message: "Role deleted successfully",
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

export default new RoleController();
