import express from "express";
import CategoryController from "../controllers/category.controller.js";

const router = express.Router();

router.get("/products", CategoryController.getAllWithProducts);
router.get("/", CategoryController.getAll);
router.get("/:id", CategoryController.getById);
router.post("/", CategoryController.create);
router.put("/:id", CategoryController.update);
router.delete("/:id", CategoryController.delete);

export default router;
