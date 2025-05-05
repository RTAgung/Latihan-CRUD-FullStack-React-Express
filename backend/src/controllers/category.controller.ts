import { Request, Response } from "express";
import AbstractModel from "../abstracts/model.abstract.js";
import CategoryService from "../services/category.service.js";

class CategoryController extends AbstractModel {
    async getAllWithProducts(req: Request, res: Response): Promise<any> {
        try {
            const categories = await CategoryService.getAllWithProducts();

            res.status(200).json({
                status: "success",
                message: "Categories with products fetched successfully",
                data: categories,
            });
        } catch (error: any) {
            res.status(500).json({
                status: "error",
                message: error.message,
            });
        }
    }

    async getAll(req: Request, res: Response): Promise<any> {
        try {
            const response = await CategoryService.getAll();
            res.status(200).json({
                status: "success",
                message: "Categories fetched successfully",
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
            const response = await CategoryService.getById(req.params.id);
            res.status(200).json({
                status: "success",
                message: "Category fetched successfully",
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
            const response = await CategoryService.create({ ...req.body });
            res.status(201).json({
                status: "success",
                message: "Category created successfully",
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
            const response = await CategoryService.update(req.params.id, {
                ...req.body,
            });
            res.status(200).json({
                status: "success",
                message: "Category updated successfully",
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
            const response = await CategoryService.delete(req.params.id);
            res.status(200).json({
                status: "success",
                message: "Category deleted successfully",
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

export default new CategoryController();
